# Cómo usar Google Drive en tu tienda

### 1. Imágenes (Fácil)
Para las fotos de productos, he creado una función automática llamada `getDriveImage`.

**Pasos:**
1.  Sube la foto a Drive.
2.  Clic derecho > Compartir > **Cualquier persona con el enlace**.
3.  Copia el enlace.
4.  Pégalo en `src/data/products.js` dentro de la función:

```javascript
image: getDriveImage("https://drive.google.com/..."),
```

### 2. Videos (Recomendación Importante)
Google Drive **no sirve** para reproducir videos en una web comercial (es lento, tiene límites de reproducción y a veces falla).

**Mejores opciones:**
*   **Opción A (Recomendada):** Sube el video a **YouTube** (como "No listado") o **Vimeo**. Copia el enlace y úsalo directamente.
*   **Opción B (Local):** Coloca el archivo `.mp4` en la carpeta `public` de tu proyecto y usa el enlace local (ej: `/video.mp4`).

Si intentas usar un enlace de Drive en `video: "..."`, es muy probable que no se reproduzca correctamente.
