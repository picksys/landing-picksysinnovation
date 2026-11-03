# Picksys Innovation — US landing (EN/ES)

Landing para el mercado de EE. UU. · React 18 + Vite + TypeScript · sin librerías de animación.
Dominio: **picksysinnovation.com** (Netlify).

## Comandos
```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # genera dist/
npm run preview
```

## Qué editar
| Qué | Dónde |
| --- | --- |
| Todos los textos (EN y ES) | `src/i18n/content.ts` |
| Email, Formspree, link de Calendly, LinkedIn | `site` al final de `src/i18n/content.ts` |
| **Fotos de los fundadores** | `public/team/eduardo.webp` y `public/team/luciano.webp` (vertical, ~1280×1600, < 200 KB). Mientras no existan se muestra un monograma. |
| Logos de clientes | `src/assets/clients/` + listas en `src/components/Clients.tsx` |
| Productos | `src/assets/products/` + `work.products` en `content.ts` |
| Colores / tipografía | variables en `:root` de `src/styles/global.css` |

Convertir una foto a WebP optimizado:
```bash
ffmpeg -i foto.jpg -vf "scale=1280:-2" -quality 82 public/team/eduardo.webp
```

## Idioma
Inglés por defecto. El selector EN/ES guarda la preferencia (localStorage) y `?lang=es` abre en español (útil para compartir links).

## Secciones
1. Hero — propuesta de valor + embudo de partículas (Canvas 2D) “Visitors → Leads → Customers”
2. Ticker infinito de servicios
3. Manifiesto — palabras que se iluminan con el scroll
4. Servicios — Software & IA · Marketing digital · Embudos de venta
5. Fundadores — Eduardo (ingeniería/IA) + Luciano (ventas)
6. Proceso — 4 pasos con barra de progreso ligada al scroll
7. Trabajos — productos propios + trabajos para clientes
8. Números
9. Clientes — doble carrusel infinito de logos
10. Contacto — formulario (Formspree) + email

## Performance
- Animaciones con CSS transform/opacity (GPU); un único IntersectionObserver para los “reveal”.
- El canvas se pausa fuera de pantalla o con la pestaña oculta, limita DPR a 1.75 y reduce partículas en móvil.
- `prefers-reduced-motion` desactiva todo el movimiento.
- Logos en WebP (< 17 KB c/u), fuentes self-hosted, `content-visibility: auto` en secciones inferiores.
- JS ≈ 77 KB gzip, CSS ≈ 8 KB gzip.

## Deploy (Netlify)
`netlify.toml` ya incluye build, caché de assets y redirect www → apex.
Opción A: apuntar el sitio actual de Netlify a este repo/carpeta.
Opción B: `npx netlify-cli deploy --prod --dir=dist` desde esta carpeta.
