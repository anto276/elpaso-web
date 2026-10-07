# Café Bar Restaurante El Paso · Web

Web del **Café Bar Restaurante El Paso**, un restaurante de cocina casera en Don Benito (Badajoz).

🔗 **Web en vivo:** https://elpaso-donbenito.pages.dev

---

## Qué tiene

- **Menú del día** con tabla de precios (lunes a viernes / sábados, menú y medio menú) y un carrusel de platos de ejemplo, separados en *primer plato* y *segundo plato*.
- **Reserva de mesa por WhatsApp**: el formulario genera el mensaje con nombre, día, hora y personas, y abre WhatsApp listo para enviar.
- **Galería** de platos en movimiento continuo y **reseñas reales** de clientes de Google.
- **Diseño adaptado a móvil**, menú de navegación por secciones y animaciones suaves al hacer scroll (respetando la opción de «reducir movimiento» del sistema).
- **Preparada para Google**: ficha de restaurante con [schema.org](https://schema.org/Restaurant) (dirección, horario, teléfono), `sitemap.xml`, `robots.txt` y vista previa al compartir el enlace (Open Graph).

## Cómo está hecha

| | |
|---|---|
| **Tecnología** | HTML, CSS y JavaScript sin frameworks ni dependencias de compilación |
| **Contenido** | Platos, servicios, galería y reseñas en un único archivo de datos (`lib/manifest.js`), separado del diseño |
| **Imágenes** | Formato WebP, recortadas al mismo formato (4:5) con un script en Python (`tools/process_photos.py`) |
| **Alojamiento** | Cloudflare Pages, conectado a este repositorio: cada cambio en `master` se publica solo |

```
├── index.html          ← estructura de la página
├── styles.css          ← diseño (colores, tipografías, móvil)
├── main.js             ← carrusel, galería, reseñas, formulario de reserva
├── lib/manifest.js     ← DATOS: platos, servicios, galería, reseñas, teléfono
├── assets/img/         ← fotos (.webp) y favicon
├── tools/              ← script para preparar las fotos
├── sitemap.xml · robots.txt
```

### Verla en local

Haz doble clic en `index.html`, o, para que todo funcione igual que online:

```bash
python -m http.server 8000
```

y abre http://localhost:8000

---

## Guía para editar la web (sin saber programar)

Como la web está conectada a GitHub, **se puede cambiar desde el navegador** y se publica sola en un minuto.

### Cambiar platos, reseñas o textos de «Cómo comer»

1. En GitHub, abre `lib/manifest.js` y pulsa el **lápiz ✏️** (Edit).
2. Cambia **solo el texto entre comillas `" "`**. No borres comas `,` ni llaves `{ }`.
   - **`dishes`** → platos de la carta: `name`, `subtitle`, `ingredients`, `description`, `photo` y `type` (`"primer plato"` o `"segundo plato"`; el color de la etiqueta sale solo).
   - **`services`** → las filas de «Cómo comer con nosotros».
   - **`reviews`** → reseñas: `{ name: "Nombre A.", stars: 5, text: "..." }`. Solo reseñas reales.
   - **`gallery`** → fotos de la galería.
3. Pulsa **Commit changes**. En 1 minuto está en la web (si no lo ves, `Ctrl + F5`).

### Cambiar los precios del menú

Están en `index.html`: busca `menu-prices` (con `Ctrl + F`) y cambia los números de la tabla. Revisa también el texto del menú en `lib/manifest.js` → `services`, para que digan lo mismo.

### Cambiar una foto

1. Sube la foto a `assets/img/` (**Add file → Upload files**), mejor en formato `.webp` y vertical (4:5).
2. En `lib/manifest.js`, cambia la ruta `photo` del plato, por ejemplo `"assets/img/mi-foto.webp"`.

### Cambiar teléfono, dirección u horario

Aparecen en varios sitios. Busca el dato antiguo con `Ctrl + F` y cámbialo en todos:
- `index.html` (botones, reserva, pie de página y la ficha para Google del principio).
- `lib/manifest.js` → `brand`.

### Si cambia la dirección de la web (dominio propio)

Cambia `https://elpaso-donbenito.pages.dev` por la nueva en `index.html`, `sitemap.xml` y `robots.txt`.

> No borres la etiqueta `google-site-verification` de `index.html` ni el archivo `googlee…html`: son la verificación de Google Search Console.

---

Hecha por **Antonio Dorado Fernández** · [LinkedIn](https://www.linkedin.com/in/antonio-dorado-fernandez) · [GitHub](https://github.com/anto276)

Fotos, textos y reseñas pertenecen al Café Bar Restaurante El Paso.
