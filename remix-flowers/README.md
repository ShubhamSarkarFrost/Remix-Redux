# Remix Flowers (Bunches-like demo)

A small **Remix** app that mimics the layout in the screenshots you shared: a hero slider with beautiful flower quotes, product sections, a "Why you'll love shopping with us" band, and a reviews strip. **CSS is kept separately** under `public/styles/`.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Structure

```
app/
  entry.client.jsx
  entry.server.jsx
  root.jsx
  routes/
    _index.jsx
  sections/
    Slider.jsx
    SectionGrid.jsx
    WhyShop.jsx
    Reviews.jsx
public/
  styles/
    global.css
    slider.css
    cards.css
    reviews.css
remix.config.js
vite.config.js
```

You can swap the placeholder images with real product images by replacing the CSS backgrounds in `slider.css` and adding `<img>` tags in `SectionGrid.jsx`.
