# Bali Healer

Static frontend prototype for a multi-vendor Balinese healing and spiritual wellness marketplace.

## Stack

- HTML entry point: `index.html`
- Tailwind CSS Play CDN
- JavaScript ES modules
- Hash-based SPA routing through `js/app.js`
- Page modules in `modules/`
- SEO files: `robots.txt`, `sitemap.xml`, `site.webmanifest`

## Project Structure

```text
Bali Healer/
  404.html
  index.html
  README.md
  robots.txt
  sitemap.xml
  site.webmanifest
  assets/
    images/
      logo-bali-healer.png
    videos/
      hero-bali-healer.mp4
  docs/
    SPESIFIKASI-FITUR.md
  js/
    app.js
    data.js
  modules/
    booking-system.js
    home.js
    services.js
    vendor.js
    dashboard.js
    healing-space.js
    spec.js
```

## SEO Notes

- Update the production domain in `index.html`, `robots.txt`, `sitemap.xml`, and `site.webmanifest` if the deployed domain is not `https://balihealer.com/`.
- Keep visible copy in English for consistency.
- Add new public pages to `js/app.js` route metadata and update `sitemap.xml` if the site later moves from hash routing to full static routes.
- Use descriptive `alt` text for every local image.

## Run Locally

Start a static server from the project root:

```powershell
python -m http.server 5173
```

Open:

```text
http://localhost:5173
```
