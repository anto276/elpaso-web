/*
  ================================================================
  DATOS DE EL PASO — edita este archivo con el Bloc de notas
  ================================================================
  Aqui viven los textos, telefonos y platos de la web.
  Cambia solo lo que hay DESPUES de los dos puntos ":", entre comillas "...".
  No borres las comas "," ni las llaves { } — si algo se rompe, la pagina
  puede dejar de funcionar. Si tienes dudas, guarda una copia antes de tocar nada.
  Instrucciones completas en README.md.
*/
(function () {
  "use strict";

  window.__ELPASO__ = {
    brand: {
      name: "Restaurante Café Bar El Paso",
      shortName: "El Paso",
      tagline: "Cocina de siempre, en el corazón de Don Benito.",
      address: "Avenida de Madrid, 1, Bajo, 06400 Don Benito, Badajoz",
      phone: "678 542 278",
      phoneHref: "tel:+34678542278",
      whatsapp: "34678542278",
      instagram: "@elpaso_donbenito",
      instagramUrl: "https://instagram.com/elpaso_donbenito",
      hoursShort: "Lunes a sábado · 7:00 → 17:00",
      hoursDetail: "Lunes a sábado, de 7:00 a 17:00. Domingo cerrado.",
      rating: "4,4",
      ratingLabel: "4,4 ★ en Google · cientos de reseñas",
      mapsEmbedSrc: "https://www.openstreetmap.org/export/embed.html?bbox=-5.8600%2C38.9600%2C-5.8540%2C38.9650&layer=mapnik&marker=38.9625%2C-5.8568",
      mapsLinkUrl: "https://www.google.com/maps/search/?api=1&query=Avenida+de+Madrid+1+06400+Don+Benito+Badajoz",
      year: "2026"
    },

    // Platos de EJEMPLO de lo que puede entrar en el menu del dia (sin precio: el menu tiene precio unico). El orden es el que se ve en la web.
    dishes: [
      {
        id: "costilla-cerdo",
        name: "Costilla de Cerdo de Campo en Salsa Estremeña",
        series: "Casa",
        type: "plato principal",
        subtitle: "El plato que nos representa",
        ingredients: "Costilla de cerdo, pimientos, salsa estremeña",
        description: "Cocinada a fuego lento, con la salsa estremeña de siempre.",
        accent: "oliva",
        photo: "assets/img/costilla-cerdo.webp"
      },
      {
        id: "lomo-iberico",
        name: "Lomo Ibérico de Matanza Casero",
        series: "Casa",
        type: "entrante para compartir",
        subtitle: "Artesano y curado",
        ingredients: "Lomo ibérico curado casero",
        description: "Lomo curado de matanza, cortado fino.",
        accent: "dorado",
        photo: "assets/img/lomo-iberico.webp"
      },
      {
        id: "tortilla-patatas",
        name: "Tortilla de Patatas",
        series: "Casa",
        type: "ración",
        subtitle: "La de toda la vida",
        ingredients: "Huevo, patata, aceite de oliva",
        description: "Jugosa por dentro y dorada por fuera.",
        accent: "terracota",
        photo: "assets/img/tortilla-patatas.webp"
      },
      {
        id: "merluza-escabeche",
        name: "Merluza en Escabeche",
        series: "Casa",
        type: "plato principal",
        subtitle: "Receta de la abuela",
        ingredients: "Merluza, aceite, vinagre, ajo",
        description: "Frita y marinada en escabeche casero.",
        accent: "oliva",
        photo: "assets/img/merluza-escabeche.webp"
      },
      {
        id: "ensalada-campera",
        name: "Ensalada Campera",
        series: "Temporada",
        type: "entrante",
        subtitle: "Fresca y de siempre",
        ingredients: "Patata, tomate, pimiento, atún",
        description: "Patata, tomate, pimiento y atún. Sencilla y fresca.",
        accent: "terracota",
        photo: "assets/img/ensalada-campera.webp"
      },
      {
        id: "gulas-gallega",
        name: "Gulas a la Gallega",
        series: "Temporada",
        type: "entrante",
        subtitle: "Con patatas, ajo y guindilla",
        ingredients: "Gulas, patata, ajo, guindilla",
        description: "Con patatas, ajo y un toque de guindilla.",
        accent: "dorado",
        photo: "assets/img/gulas-gallega.webp"
      },
      {
        id: "calabacin-relleno",
        name: "Calabacín Relleno de Atún y Queso",
        series: "Temporada",
        type: "plato principal",
        subtitle: "Con muselina de alioli",
        ingredients: "Calabacín, atún, queso, alioli",
        description: "Relleno de atún y queso, gratinado al horno.",
        accent: "oliva",
        photo: "assets/img/calabacin-relleno.webp"
      },
      {
        id: "pimientos-rellenos",
        name: "Pimientos Rellenos de Carne",
        series: "Temporada",
        type: "plato principal",
        subtitle: "Gratinados al horno",
        ingredients: "Pimiento, carne picada, tomate",
        description: "Rellenos de carne, con tomate casero.",
        accent: "terracota",
        photo: "assets/img/pimientos-rellenos.webp"
      },
      {
        id: "sardinas-escabeche",
        name: "Sardinas Caseras en Escabeche",
        series: "Temporada",
        type: "entrante",
        subtitle: "De la casa",
        ingredients: "Sardinas, aceite, vinagre, pimentón",
        description: "Sardinas en escabeche hecho en casa.",
        accent: "oliva",
        photo: "assets/img/sardinas-escabeche.webp"
      },
      {
        id: "muslo-pollo",
        name: "Muslo de Pollo al Horno",
        series: "Temporada",
        type: "plato principal",
        subtitle: "En su jugo y orégano",
        ingredients: "Pollo, orégano, jugo de asado",
        description: "Asado al horno con orégano, en su jugo.",
        accent: "dorado",
        photo: "assets/img/muslo-pollo.webp"
      }
    ],

    // "Como comer con nosotros" — 4 filas
    services: [
      {
        title: "Menú del día",
        meta: "L a S, 7:00–17:00",
        description: "Primero, segundo, postre, pan y bebida por 14€. Cambia cada día, aunque algunos platos se repiten.",
        icon: "plato",
        accent: "oliva"
      },
      {
        title: "Para llevar",
        meta: "Pide y recógelo",
        description: "Toda la carta también lista para llevar a casa.",
        icon: "bolsa",
        accent: "terracota"
      },
      {
        title: "Barra de aperitivos",
        meta: "Antes de comer",
        description: "Cañas, vino y aperitivos de siempre en la barra.",
        icon: "copa",
        accent: "dorado"
      },
      {
        title: "Grupos y reservas",
        meta: "Comedor amplio",
        description: "Comidas de familia, de empresa o celebraciones. Llámanos y lo organizamos.",
        icon: "mesa",
        accent: "oliva"
      }
    ],

    // Galeria — fotos reales del negocio (marquee de 3 carriles)
    gallery: [
      "assets/img/costilla-cerdo.webp",
      "assets/img/gal-coliflor.webp",
      "assets/img/lomo-iberico.webp",
      "assets/img/gal-rollito-mar.webp",
      "assets/img/tortilla-patatas.webp",
      "assets/img/gal-crujientes.webp",
      "assets/img/merluza-escabeche.webp",
      "assets/img/gal-atun-tomate.webp",
      "assets/img/ensalada-campera.webp",
      "assets/img/gulas-gallega.webp",
      "assets/img/gal-almeja-hueva.webp",
      "assets/img/calabacin-relleno.webp",
      "assets/img/gal-pisto.webp",
      "assets/img/pimientos-rellenos.webp",
      "assets/img/gal-menestra.webp",
      "assets/img/sardinas-escabeche.webp",
      "assets/img/gal-garbanzos.webp",
      "assets/img/muslo-pollo.webp",
      "assets/img/gal-brocoli.webp",
      "assets/img/gal-ensalada-coliflor.webp",
      "assets/img/gal-caballa.webp",
      "assets/img/gal-tortilla-espinacas.webp",
    ]
  };
})();
