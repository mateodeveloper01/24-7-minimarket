const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const ts = require('typescript')

// Ejecutar los módulos reales con límites externos simulados, sin escribir en MongoDB.
function loadModule(file, dependencies) {
  const source = readFileSync(path.join(__dirname, '..', file), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020,
    },
  })
  const loadedModule = { exports: {} }
  const mockRequire = (name) => {
    if (Object.hasOwn(dependencies, name)) return dependencies[name]
    if (name === 'react/jsx-runtime') return require(name)
    throw new Error(`Dependencia sin simular: ${name}`)
  }
  new Function('require', 'module', 'exports', outputText)(mockRequire, loadedModule, loadedModule.exports)
  return loadedModule.exports
}

function settingsHarness({ stored = null, session = { user: { sub: 'admin' } }, fail = false } = {}) {
  const calls = { reads: [], writes: [], invalidations: [], connections: 0 }
  const api = loadModule('src/resources/site-settings/api.ts', {
    'next/cache': { revalidatePath: (...args) => calls.invalidations.push(args) },
    'next/server': { connection: async () => { calls.connections++ } },
    '@/lib/auth0': { auth0: { getSession: async () => session } },
    '@/utils/db': {
      default: { siteSettings: {
        findUnique: async (args) => {
          calls.reads.push(args)
          return stored
        },
        upsert: async (args) => {
          calls.writes.push(args)
          if (fail) throw new Error('Database unavailable')
          stored = { id: 'store', ...args.update }
          return stored
        },
      } },
    },
  })
  return { api, calls }
}

test('una tienda sin configuración sigue abierta y se consulta dinámicamente', async () => {
  const { api, calls } = settingsHarness()
  assert.equal(await api.getMaintenanceMode(), false)
  assert.equal(calls.connections, 1)
  assert.deepEqual(calls.reads, [{ where: { id: 'store' } }])
})

test('activar y desactivar guarda el estado global e invalida las páginas', async () => {
  const { api, calls } = settingsHarness()
  for (const enabled of [true, false]) {
    assert.equal(await api.updateMaintenanceMode(enabled), enabled)
    assert.equal(await api.getMaintenanceMode(), enabled)
    assert.deepEqual(calls.writes.at(-1), {
      where: { id: 'store' },
      create: { id: 'store', maintenanceMode: enabled },
      update: { maintenanceMode: enabled },
    })
  }
  assert.deepEqual(calls.invalidations, [['/', 'layout'], ['/', 'layout']])
})

test('una sesión nueva ve el estado persistido', async () => {
  const { api } = settingsHarness({ stored: { maintenanceMode: true } })
  assert.equal(await api.getMaintenanceMode(), true)
})

test('sin sesión o usuario no se puede cambiar el estado', async () => {
  for (const session of [null, {}]) {
    const { api, calls } = settingsHarness({ session })
    await assert.rejects(api.updateMaintenanceMode(true), /No autorizado/)
    assert.equal(calls.writes.length, 0)
    assert.equal(calls.invalidations.length, 0)
  }
})

test('se rechazan valores que no sean booleanos', async () => {
  const { api, calls } = settingsHarness()
  for (const value of ['true', 1, null, undefined]) {
    await assert.rejects(api.updateMaintenanceMode(value), /inválido/)
  }
  assert.equal(calls.writes.length, 0)
})

test('una falla al guardar no invalida ni cambia el estado anterior', async () => {
  const { api, calls } = settingsHarness({ fail: true })
  await assert.rejects(api.updateMaintenanceMode(true), /Database unavailable/)
  assert.equal(await api.getMaintenanceMode(), false)
  assert.equal(calls.invalidations.length, 0)
})

test('el layout oculta menú, catálogo y pedido únicamente durante el mantenimiento', async () => {
  const MaintenanceScreen = () => null
  const TopMenu = () => null
  const AboutMe = () => null
  for (const enabled of [true, false]) {
    const { default: ShopLayout } = loadModule('src/app/(shop)/layout.tsx', {
      '@/components/aboutMe/AboutMe': { AboutMe },
      '@/components/menu/top-menu/top-menu': { TopMenu },
      '@/components/maintenance/MaintenanceScreen': { MaintenanceScreen },
      '@/resources/site-settings/api': { getMaintenanceMode: async () => enabled },
    })
    const screen = await ShopLayout({ children: 'contenido de la tienda' })
    if (enabled) {
      assert.equal(screen.type, MaintenanceScreen)
      assert.equal(screen.props.children, undefined)
    } else {
      assert.equal(screen.props.children[0].type, TopMenu)
      assert.equal(screen.props.children[1], 'contenido de la tienda')
      assert.equal(screen.props.children[2].type, AboutMe)
    }
  }
})

test('el administrador sigue accesible y muestra el switch con su estado real', async () => {
  const LoginPage = () => null
  const MaintenanceSwitch = () => null
  for (const session of [null, { user: { sub: 'admin' } }]) {
    let settingsReads = 0
    const { default: Dashboard } = loadModule('src/app/gestor/page.tsx', {
      './_components/table/data-table': { DataTable: () => null },
      './_components/table/columns': { columns: [] },
      '@/lib/auth0': { auth0: { getSession: async () => session } },
      '../(shop)/(home)/admin/page': { default: LoginPage },
      './_components/CategoriesAdmin': { CategoriesAdmin: () => null },
      './_components/PromotionForm': { PromotionForm: () => null },
      './_components/PromotionsImagesAdmin': { PromotionsImagesAdmin: () => null },
      '@/components/ui/tabs': { Tabs: () => null, TabsContent: () => null, TabsList: () => null, TabsTrigger: () => null },
      './_components/MaintenanceSwitch': { MaintenanceSwitch },
      '@/resources/site-settings/api': { getMaintenanceMode: async () => { settingsReads++; return true } },
    })
    const screen = await Dashboard()
    if (session) {
      const toggle = screen.props.children[0]
      assert.equal(toggle.type, MaintenanceSwitch)
      assert.equal(toggle.props.initialEnabled, true)
      assert.equal(settingsReads, 1)
    } else {
      assert.equal(screen.type, LoginPage)
      assert.equal(settingsReads, 0)
    }
  }
})
