const assert = require('node:assert/strict')
const { test } = require('node:test')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const zod = require('zod')
const tableApi = require('@tanstack/react-table')
const { zodResolver } = require('@hookform/resolvers/zod')
const { NextRequest, NextResponse } = require('next/server')
const { loadModule } = require('./helpers/load-module.cjs')

test('Zod 4 y el resolver aceptan productos válidos y rechazan tipos inválidos', async () => {
  const { fileSchema } = loadModule('src/schemas/file.ts', { zod })
  const { ProductSchema } = loadModule('src/schemas/products.ts', { zod, './file': { fileSchema } })
  const product = {
    tipo: 'Arroz', description: 'Largo fino', brand: 'Marca', amount: '1 kg',
    price: '1000', category: 'almacen', stock: true,
  }
  assert.equal(ProductSchema.safeParse(product).success, true)
  assert.equal(fileSchema.safeParse(new File(['image'], 'foto.jpg', { type: 'image/jpeg' })).success, true)
  assert.equal(fileSchema.safeParse(new File(['text'], 'nota.txt', { type: 'text/plain' })).success, false)
  const resolve = zodResolver(ProductSchema)
  const options = { fields: {}, shouldUseNativeValidation: false }
  assert.deepEqual((await resolve(product, {}, options)).errors, {})
  assert.ok((await resolve({ ...product, stock: 'true' }, {}, options)).errors.stock)
})

test('el formulario de pedido conserva las validaciones con Zod 4', () => {
  const { formOrderSchema } = loadModule('src/schemas/order.ts', { zod })
  const order = { name: 'Nombre Apellido', delivery_method: 'envio', pay_method: 'efectivo' }
  assert.equal(formOrderSchema.safeParse(order).success, true)
  assert.equal(formOrderSchema.safeParse({ ...order, name: 'Ab' }).success, false)
})

test('Zustand 5 conserva el carrito persistido, cantidades y totales', () => {
  const values = new Map()
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key),
  }
  const middleware = require('zustand/middleware')
  const dependencies = {
    zustand: require('zustand'),
    'zustand/middleware': {
      persist: (initializer, options) => middleware.persist(initializer, {
        ...options, storage: middleware.createJSONStorage(() => storage),
      }),
    },
  }
  const loadCart = () => loadModule('src/stores/useCartStore.ts', dependencies).useCartStore
  const cart = loadCart()
  const product = { id: 'p1', price: 1000, quantity: 1 }
  cart.getState().addToCart(product)
  cart.getState().addToCart(product)
  assert.equal(cart.getState().cart[0].quantity, 2)
  assert.equal(cart.getState().totalPrice, 2000)
  const restored = loadCart()
  assert.equal(restored.getState().totalItems, 2)
  restored.getState().updateCart('p1', 3)
  assert.equal(restored.getState().totalPrice, 3000)
  restored.getState().removeFromCart(restored.getState().cart[0])
  assert.equal(restored.getState().totalItems, 0)
  assert.equal(restored.getState().totalPrice, 0)
})

test('la tabla v9 conserva orden, filtros, selección, visibilidad y paginación manual', () => {
  const { productTableFeatures } = loadModule('src/app/gestor/_components/table/table-features.ts', {
    '@tanstack/react-table': tableApi,
  })
  const options = {
    features: productTableFeatures,
    columns: [{ accessorKey: 'tipo' }, { accessorKey: 'price' }],
    data: [{ tipo: 'Arroz', price: 100 }, { tipo: 'Fideos', price: 50 }, { tipo: 'Arroz', price: 200 }],
    manualPagination: true,
  }
  let table
  function TableHarness() {
    table = tableApi.useTable(options)
    return null
  }
  renderToStaticMarkup(React.createElement(TableHarness))
  table.setSorting([{ id: 'price', desc: false }])
  assert.deepEqual(table.getRowModel().rows.map(row => row.original.price), [50, 100, 200])
  table.getColumn('tipo').setFilterValue('Arroz')
  assert.equal(table.getRowModel().rows.length, 2)
  table.getRowModel().rows[0].toggleSelected(true)
  assert.equal(table.getIsSomePageRowsSelected(), true)
  assert.equal(table.getIsAllPageRowsSelected(), false)
  table.toggleAllPageRowsSelected(true)
  assert.equal(table.getIsAllPageRowsSelected(), true)
  table.getColumn('price').toggleVisibility(false)
  assert.deepEqual(table.getRowModel().rows[0].getVisibleCells().map(cell => cell.column.id), ['tipo'])
  table.setPageSize(1)
  assert.equal(table.getRowModel().rows.length, 2, 'los datos ya vienen paginados desde el servidor')
})

test('proxy conserva las cookies de Auth0 y dirige el callback al administrador', async () => {
  const response = NextResponse.redirect('https://tienda.example/', 302)
  response.headers.set('set-cookie', '_test_session=stub; HttpOnly; Path=/')
  const { proxy } = loadModule('src/proxy.ts', {
    'next/server': { NextResponse },
    './lib/auth0': { auth0: { middleware: async () => response } },
  })
  const result = await proxy(new NextRequest('https://tienda.example/auth/callback'))
  assert.equal(result.headers.get('location'), 'https://tienda.example/gestor')
  assert.equal(result.headers.get('set-cookie'), response.headers.get('set-cookie'))
})

test('proxy respeta la navegación normal y otros redirects de Auth0', async () => {
  for (const response of [NextResponse.next(), NextResponse.redirect('https://tienda.example/auth/login')]) {
    const { proxy } = loadModule('src/proxy.ts', {
      'next/server': { NextResponse },
      './lib/auth0': { auth0: { middleware: async () => response } },
    })
    assert.equal(await proxy(new NextRequest('https://tienda.example/gestor')), response)
  }
})

test('la hidratación del carrito no expone estado del navegador durante SSR', () => {
  const { default: useFromStore } = loadModule('src/hooks/useFromStore.ts', { react: React })
  function CartPreview() {
    const cart = useFromStore(selector => selector({ totalPrice: 1000 }), state => state.totalPrice)
    return React.createElement('span', null, cart ?? 'cargando')
  }
  assert.equal(renderToStaticMarkup(React.createElement(CartPreview)), '<span>cargando</span>')
})

test('actualizar la promoción expira su caché inmediatamente con updateTag', async () => {
  let promotion = 'Anterior'
  const cache = new Map()
  const expired = []
  const { getPromotion, updatePromotion } = loadModule('src/resources/promotion/api.ts', {
    '@/utils/db': {
      promotion: {
        findFirst: async () => ({ name: promotion }),
        update: async ({ data }) => { promotion = data.name },
      },
    },
    'next/cache': {
      unstable_cache: (callback, keys, options) => {
        assert.deepEqual(options.tags, ['promotion-get'])
        return async () => {
          if (!cache.has(keys[0])) cache.set(keys[0], await callback())
          return cache.get(keys[0])
        }
      },
      updateTag: tag => { expired.push(tag); cache.clear() },
    },
  })
  assert.equal(await getPromotion(), 'Anterior')
  await updatePromotion('Nueva')
  assert.deepEqual(expired, ['promotion-get'])
  assert.equal(await getPromotion(), 'Nueva')
})
