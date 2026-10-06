# Web de Restaurante Café Bar El Paso

Guía rápida para ti, sin necesidad de saber programar. Todo se edita abriendo archivos con el **Bloc de notas**.

## 1. Ver la web en tu ordenador

Haz doble clic en `index.html`. Se abre en tu navegador (Chrome, Edge...) y ya puedes verla y navegar por ella, tal cual quedará online.

## 2. Subir la web a Hostinger

1. Entra en Hostinger &rarr; Administrador de archivos (File Manager) de tu hosting.
2. Ve a la carpeta `public_html` (o la carpeta raíz de tu dominio).
3. Arrastra **todo el contenido** de esta carpeta (no la carpeta en sí, lo que hay dentro) a `public_html`: `index.html`, `styles.css`, `main.js`, las carpetas `lib/`, `assets/`, y el archivo `.htaccess`.
4. Espera a que termine de subir y entra en tu dominio. Ya está online.

Importante: el archivo `.htaccess` empieza por un punto y puede que tu ordenador no lo muestre por defecto — asegúrate de que se sube igualmente (en el File Manager de Hostinger sí aparece).

## 3. Cambiar los platos, precios y horarios (lo más habitual)

Abre el archivo `lib/manifest.js` con el Bloc de notas (clic derecho &rarr; Abrir con &rarr; Bloc de notas).

Ahí encontrarás, en español y bien ordenado:

- **`dishes`** &rarr; los 10 platos de la carta. Cada plato tiene `name` (nombre), `subtitle`, `ingredients`, `description`, `price` (precio) y `photo` (la foto que usa). Cambia solo el texto entre comillas `" "`, sin tocar comas ni llaves `{ }`.
- **`services`** &rarr; las 4 filas de "Cómo comer con nosotros" (menú del día, para llevar, barra, grupos).
- **`gallery`** &rarr; la lista de fotos que aparecen en el carrusel de la Galería.

Después de guardar el archivo, sube de nuevo `lib/manifest.js` a Hostinger (no hace falta subir nada más) y recarga la página con `Ctrl+F5`.

## 4. Cambiar fotos

1. Guarda tu foto nueva en la carpeta `assets/img/`, en formato `.webp` si puedes (si no sabes convertirla, un `.jpg` también funciona, pero cambia también la extensión en el archivo donde se referencia).
2. Ve a `lib/manifest.js` y cambia la ruta `photo` del plato correspondiente para que apunte a tu nuevo archivo, por ejemplo: `"assets/img/mi-foto-nueva.webp"`.
3. Sube la foto nueva y el `manifest.js` actualizado a Hostinger.

## 5. Cambiar el número de teléfono / WhatsApp

El número aparece en **dos sitios** que hay que actualizar los dos:

1. En `lib/manifest.js`, los campos `phone`, `phoneHref` y `whatsapp` dentro de `brand`.
2. En `index.html`, busca (con `Ctrl+F` en el Bloc de notas) el número actual `678542278` o `678 542 278` — aparece en el botón de reservar, en el de "Grupos y celebraciones" y en el pie de página. Cámbialo por el nuevo en todos los sitios donde aparezca.

## 6. Cambiar textos de la portada (nombre, eslogan, dirección, horario)

Estos textos están escritos directamente en `index.html` para que la web cargue rápido y nunca se quede en blanco. Ábrelo con el Bloc de notas y busca el texto que quieras cambiar (usa `Ctrl+F`) — por ejemplo "Cocina de siempre, en el corazón de Don Benito." aparece en el titular principal.

## 7. Si algo no se actualiza al subir cambios

Los navegadores guardan una copia de la web en su memoria (caché) para que cargue más rápido, y a veces no se enteran de que has subido algo nuevo. Si ves la versión antigua:

1. Pulsa `Ctrl + F5` (o `Cmd + Shift + R` en Mac) para forzar la recarga.
2. Si sigue sin verse el cambio y has tocado `styles.css` o `main.js`, abre `index.html` con el Bloc de notas y busca `?v=20260705` — cámbialo por la fecha de hoy en todas partes donde aparezca (por ejemplo `?v=20260710`), guarda y vuelve a subir `index.html`.

## 8. Carpetas que puedes ignorar

- `assets/photos/source/` — son las fotos originales tal y como te las mandaron, antes de recortar. Puedes borrar esta carpeta si quieres aligerar la web; no la usa la página.
- `tools/` — un script de uso interno para preparar las fotos. No hace falta subirlo a Hostinger, pero tampoco molesta si lo subes.

## 9. Estructura de la carpeta

```
el-paso/
├── index.html          ← la página (nav, textos fijos, contacto)
├── styles.css           ← todos los estilos visuales
├── main.js               ← animaciones y montaje de carta/galería
├── .htaccess             ← configuración para que Hostinger no sirva versiones viejas
├── lib/
│   ├── gsap.min.js
│   ├── ScrollTrigger.min.js
│   └── manifest.js      ← AQUÍ editas platos, servicios, galería y datos del negocio
├── assets/
│   ├── img/              ← fotos ya listas (.webp) que usa la web
│   └── photos/source/    ← fotos originales sin recortar (no se usan en la web)
└── tools/
    └── process_photos.py ← script interno, no hace falta tocarlo
```

Cualquier duda, guarda una copia de la carpeta antes de tocar nada y así siempre puedes volver atrás.
