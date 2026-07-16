# Michelle's 21st — Boarding Pass Invitation

## Pendientes antes de publicar

0. **Fotos del collage**
   Coloca 6 fotos en `assets/images/` con estos nombres exactos: `photo1.jpg` a `photo6.jpg` (3 quedan a la izquierda del boleto, 3 a la derecha).
   No te preocupes si tus fotos tienen luz/color distinto entre sí — el CSS ya les aplica un filtro de blanco y negro + tinte dorado a todas por igual, así se ven parte del mismo diseño en vez de fotos sueltas.
   Puedes cambiar el texto bajo cada foto (el "chapter 21", "legal soon", etc.) directo en `index.html`, dentro de cada `<figcaption>`.
   En pantallas chicas (celular) el collage se convierte en una tira horizontal deslizable debajo del boleto.

1. **Música de fondo**
   Coloca tu canción en `assets/audio/theme.mp3` (mismo nombre, o cambia la ruta en `index.html` línea del `<source>`).

2. **Playlist de Spotify**
   En `js/script.js`, reemplaza la constante `PLAYLIST_URL` con el link de tu playlist colaborativa.

3. **Ubicación**
   El botón de mapa ya abre una búsqueda de "Terraza Cocotero Las Alamedas Zapopan Jalisco" en Google Maps.
   Si tienes el link exacto del lugar en Maps (con pin específico), reemplázalo en `index.html` en el `href` de `.cta-map` — va a ser más preciso que la búsqueda genérica.

4. **Publicar en GitHub Pages**
   ```
   cd C:\Users\Michelle\Birthday21
   git init
   git add .
   git commit -m "invitación 21"
   git branch -M main
   git remote add origin <tu-repo-url>
   git push -u origin main
   ```
   Luego en GitHub: Settings → Pages → Branch: main → carpeta `/root` → Save.
   Tu invitación quedará en `https://<tu-usuario>.github.io/Birthday21/`

## Cómo se ve

- Boleto de avión estilo "boarding pass" en dorado/negro con acentos rosa.
- El invitado escribe su nombre y el "número de vuelo" del talón se actualiza solo, como detalle personalizado.
- El sello del boleto es un mini disco ball animado en CSS (sin imágenes externas).
- Botón de música flotante arriba a la derecha (el navegador no deja autoplay con sonido, por eso es manual).
- Sellos de pasaporte con códigos de país como cierre visual.