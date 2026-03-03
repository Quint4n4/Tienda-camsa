/**
 * Convierte un enlace de Google Drive en un enlace directo utilizable en etiquetas <img>.
 * Soportado para imágenes. Para videos, se recomienda usar YouTube/Vimeo o alojar el archivo localmente.
 * 
 * @param {string} url - El enlace de compartir de Google Drive
 * @returns {string} - El enlace directo para el src de la imagen
 */
export const getDriveImage = (url) => {
    if (!url) return '';
    if (url.includes('unsplash.com') || url.includes('pexels.com')) return url; // Ignorar si ya es un stock

    // Extraer ID del archivo
    // Soporta formatos:
    // - https://drive.google.com/file/d/FILE_ID/view
    // - https://drive.google.com/open?id=FILE_ID
    const idMatch = url.match(/[-\w]{25,}/);

    if (!idMatch) return url;

    // Retornar enlace de visualización directa
    return `https://drive.google.com/uc?export=view&id=${idMatch[0]}`;
};
