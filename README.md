# Tienda Camsa

Tienda en línea (React + Vite) para productos de Clínica Camsa.

## Desarrollar en local

```bash
npm install
npm run dev
```

## Desplegar en Railway (plan Hobby)

1. **Conectar el repo**: En [Railway](https://railway.app) crea un proyecto y conecta este repositorio (GitHub/GitLab).

2. **Configuración automática**: El proyecto ya está preparado:
   - **Build**: `npm run build` (genera la carpeta `dist`)
   - **Start**: `npm start` (sirve la app con `serve -s dist`; Railway usa la variable `PORT` automáticamente)
   - **Node**: se usa Node 18+ (definido en `package.json` → `engines` y en `nixpacks.toml`)

3. **Variables de entorno**: No son necesarias para que la tienda funcione; si en el futuro añades API keys u otras env vars, configúralas en el panel de Railway.

4. **Imágenes**: Las imágenes están en `public/imagenes/`. Asegúrate de que esa carpeta esté en el repositorio para que el build en Railway las incluya en `dist`.

Tras el primer deploy, Railway te dará una URL pública. En el plan Hobby la app se duerme tras inactividad; al visitar la URL volverá a despertar.

---

## React + Vite (referencia)

Este proyecto usa React con Vite y ESLint.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
