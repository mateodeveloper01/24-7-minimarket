# Actualización de dependencias — 8 de octubre de 2026

Se actualizaron las dependencias a versiones estables compatibles, con un único
lockfile de pnpm. No se usaron betas ni se forzaron conflictos de peers.

## Versiones principales

| Componente | Versión |
| --- | --- |
| Node.js / pnpm | 24.x / 12.10.1 |
| Next.js / React | 16.4.0 / 19.3.0 |
| Auth0 | 4.31.1 |
| TanStack Query / Table | 5.104.1 / 9.2.6 |
| Tailwind CSS / Zod / Zustand | 4.3.3 / 4.6.5 / 5.0.15 |

Todas las versiones directas están fijadas en `package.json`. Las indirectas
están fijadas en `pnpm-lock.yaml`, incluyendo correcciones para `brace-expansion`,
`defu`, `deepmerge-ts` y `source-map-js`.

### Excepciones deliberadas a `latest`

| Paquete | Selección | Motivo |
| --- | --- | --- |
| Prisma y su cliente | 6.19.3 | Prisma 7 todavía no admite MongoDB. La etiqueta `latest` de la CLI incluso apunta a un release candidate de 8. |
| TypeScript | 6.0.3 | El parser usado por Next/ESLint requiere TypeScript `<6.1`; 7 no es compatible. |
| ESLint | 9.39.5 | Los plugins de React, importaciones y accesibilidad de Next aún no admiten ESLint 10. La versión 9 muestra un aviso de deprecación. |
| Tipos de Node | 24.19.1 | Deben describir Node 24, no APIs de Node 26 que no existen en el runtime. |
| Lucide | 1.52.0 | 1.53.0 tenía menos de 24 horas al resolver el lockfile. Se conserva la política de antigüedad mínima, sin excepciones. |

## Migraciones incluidas

- `middleware.ts` pasa a `proxy.ts`, conservando redirects y cookies de Auth0.
- La caché experimental y los imports internos de Next se reemplazan por APIs
  públicas de caché de datos. Las mutaciones usan `updateTag` para invalidación inmediata.
- TanStack Table usa `useTable` y un conjunto explícito de funcionalidades v9;
  no se usa el adaptador legacy.
- ESLint usa configuración plana. Los hooks conservan el control de reglas y
  se adaptan las sincronizaciones de carrito, búsqueda y mantenimiento.
- Se retiran paquetes sin consumidores, el login incompleto de NextAuth y las
  herramientas de depuración de formularios que arrastraban dependencias vulnerables.
- Las regresiones detectadas corrigen la aceptación de JPEG/PNG y el total de
  unidades al eliminar del carrito un producto con cantidad mayor a uno.

## Verificación observada

| Comando | Resultado |
| --- | --- |
| `pnpm install --frozen-lockfile` | Instalación reproducible; peers y políticas de cadena de suministro aceptados. |
| `pnpm test` | 16 pruebas aprobadas: mantenimiento, formularios, carrito, tabla, caché y proxy. |
| `pnpm lint` | Sin errores ni advertencias. |
| `pnpm typecheck` | Tipos correctos con TypeScript 6. |
| `pnpm build` | Build de producción correcto con Next 16/Turbopack y generación de Prisma. |
| `pnpm smoke` | HTTP 200 en `/`, `/almacen`, `/pedido`, `/buscador?query=arroz` y `/gestor`; login Auth0 HTTP 307 con autorización y cookie de estado. |
| `pnpm audit --prod` | 0 vulnerabilidades conocidas. |
| `pnpm audit` | 1 vulnerabilidad alta pendiente, descrita abajo; el comando devuelve código 1. |

El smoke test no completa el login con credenciales ni prueba cambios reales
de productos, imágenes o mantenimiento. Esas mutaciones se simulan donde hay
pruebas; no se ejecutaron escrituras en producción.

## Riesgos pendientes

**`braces@3.0.3`, solo en herramientas de lint:**
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm),
denegación de servicio con patrones profundamente anidados. La ruta es
`eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`.
No existe parche publicado al momento de esta revisión. No se silenció la alerta
ni se sustituyó la librería por un paquete incompatible para obtener un audit verde.

**Permisos de la aplicación:** las mutaciones antiguas en
`src/api/product/actions/`, `src/resources/category/api.ts`,
`src/resources/promotion/api.ts` y `src/resources/promotion-images/actions.ts`
no tienen comprobación explícita de sesión. Es un hallazgo previo y separado de
la actualización de versiones; requiere endurecimiento antes de considerar
la aplicación auditada integralmente. La acción nueva de mantenimiento sí
valida la sesión. Una auditoría de dependencias limpia no prueba autorización.

## Límite de entrega y rollback

La actualización está aislada en `chore/secure-latest-dependencies`, basada en
`58fb6aa`. Incluye manifiesto/lockfile, configuración de Next/ESLint/Vercel,
migraciones de los módulos listados arriba y sus pruebas/documentación.
El checkout original de `main`, incluidos sus cambios locales previos, no se
modificó. No se ha desplegado esta rama ni alterado el esquema o los datos de MongoDB.

Referencias: [Next 16](https://nextjs.org/docs/app/guides/upgrading/version-16),
[Prisma y MongoDB](https://www.prisma.io/docs/orm/overview/databases/mongodb),
[políticas de pnpm](https://pnpm.io/settings).
