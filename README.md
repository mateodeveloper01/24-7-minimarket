# 24-7-minimarket

Tienda y administrador con Next.js, MongoDB, Auth0 y Cloudinary.

## Desarrollo

Usar **Node.js 24** y **pnpm 12.10.1**, fijados en `package.json`.
Configurar las credenciales en `.env`, que no debe versionarse.

```bash
npx --yes pnpm@12.10.1 install --frozen-lockfile
pnpm dev
```

Abrir [localhost:3000](http://localhost:3000). Si pnpm no está en el PATH,
usar `npx --yes pnpm@12.10.1` en lugar de `pnpm` en los comandos.

## Verificación

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
pnpm smoke
pnpm audit --prod
pnpm audit
```

`pnpm build` genera el cliente de Prisma antes de compilar. Las pruebas usan
límites externos simulados y no escriben en MongoDB ni Cloudinary. `pnpm smoke`
inicia el build de producción en un puerto local libre y consulta rutas públicas
y el inicio de login; requiere `.env` válido y tampoco modifica la base de datos.

## Dependencias y despliegue

- `pnpm-lock.yaml` es el único lockfile. No generar `package-lock.json`.
- Las versiones directas están fijadas; instalar con `--frozen-lockfile` en CI.
- `pnpm-workspace.yaml` exige peers compatibles, una antigüedad mínima de 24 horas
  y aprobación explícita de los scripts de instalación.
- `vercel.json` usa la misma versión de pnpm y los mismos comandos de build.
- Ver [versiones compatibles y riesgos pendientes](docs/dependency-upgrade.md)
  antes de actualizar nuevamente o desplegar.
