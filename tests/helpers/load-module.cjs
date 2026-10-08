const { readFileSync } = require('node:fs')
const path = require('node:path')
const { transformSync } = require('esbuild')

// Los límites externos son explícitos: ninguna prueba debe escribir en MongoDB.
function loadModule(file, dependencies = {}) {
  const source = readFileSync(path.join(__dirname, '..', '..', file), 'utf8')
  const { code } = transformSync(source, {
    loader: file.endsWith('.tsx') ? 'tsx' : 'ts',
    format: 'cjs',
    jsx: 'automatic',
    target: 'es2020',
  })
  const loadedModule = { exports: {} }
  const mockRequire = name => {
    if (Object.hasOwn(dependencies, name)) return dependencies[name]
    if (name === 'react/jsx-runtime') return require(name)
    throw new Error(`Dependencia sin simular: ${name}`)
  }
  new Function('require', 'module', 'exports', code)(mockRequire, loadedModule, loadedModule.exports)
  return loadedModule.exports
}

module.exports = { loadModule }
