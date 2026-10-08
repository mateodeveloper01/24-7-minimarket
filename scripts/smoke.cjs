const assert = require('node:assert/strict')
const { spawn } = require('node:child_process')
const net = require('node:net')

async function availablePort() {
  const listener = net.createServer()
  await new Promise((resolve, reject) => {
    listener.once('error', reject)
    listener.listen(0, '127.0.0.1', resolve)
  })
  const port = listener.address().port
  await new Promise(resolve => listener.close(resolve))
  return port
}

function waitForReady(server) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('El servidor no inició en 30 segundos')), 30000)
    let output = ''
    server.stdout.on('data', chunk => {
      output += chunk.toString()
      if (output.includes('Ready')) {
        clearTimeout(timeout)
        resolve()
      }
    })
    // Drenar sin imprimir logs que puedan contener credenciales del entorno.
    server.stderr.on('data', () => {})
    server.once('error', error => { clearTimeout(timeout); reject(error) })
    server.once('exit', code => {
      clearTimeout(timeout)
      reject(new Error(`El servidor terminó antes de estar listo (código ${code})`))
    })
  })
}

async function main() {
  const port = await availablePort()
  const server = spawn(process.execPath, [
    require.resolve('next/dist/bin/next'), 'start',
    '--hostname', '127.0.0.1', '--port', String(port),
  ], { stdio: ['ignore', 'pipe', 'pipe'] })

  try {
    await waitForReady(server)
    const origin = `http://127.0.0.1:${port}`
    for (const route of ['/', '/almacen', '/pedido', '/buscador?query=arroz', '/gestor']) {
      const response = await fetch(`${origin}${route}`, {
        redirect: 'manual', signal: AbortSignal.timeout(25000),
      })
      const html = await response.text()
      assert.equal(response.status, 200, `${route} debe responder HTTP 200`)
      if (route === '/gestor') {
        assert.ok(html.includes('href="/auth/login"'), 'el admin conserva su entrada a Auth0')
      }
      console.log(`${route}: HTTP 200`)
    }

    const login = await fetch(`${origin}/auth/login`, {
      redirect: 'manual', signal: AbortSignal.timeout(25000),
    })
    assert.ok([302, 307].includes(login.status), 'Auth0 debe iniciar el login con un redirect')
    assert.ok(new URL(login.headers.get('location')).pathname.includes('authorize'))
    assert.ok(login.headers.has('set-cookie'), 'Auth0 debe guardar el estado del login')
    console.log(`/auth/login: HTTP ${login.status}, autorización y cookie de estado OK`)
  } finally {
    server.kill('SIGTERM')
  }
}

main().catch(error => {
  console.error(`Smoke test falló: ${error.message}`)
  process.exitCode = 1
})
