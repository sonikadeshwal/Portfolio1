# Sonika Deshwal — Portfolio

Personal portfolio site built with **React 19 + Vite + Tailwind CSS v4 + Framer Motion**.

## Tech Stack

Same stack as the reference repo [leeshark21/video_portfolio](https://github.com/leeshark21/video_portfolio):

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (CSS-first, no config file needed)
- **Framer Motion v12** — scroll reveals, hover effects, page animations
- **AOS** — available as extra scroll library
- Google Fonts: Syne + JetBrains Mono + Playfair Display

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

All content lives in **`src/App.jsx`** — the `ME`, `EXPERIENCE`, `PROJECTS`, `SKILLS`, and `CERTS` objects at the top. No need to dig through components.

### To update your info:
- `ME` — name, roles, bio, links, CGPA, location
- `EXPERIENCE` — internship entries
- `PROJECTS` — project cards (title, desc, tags, link, accent color)
- `SKILLS` — tech categories and items
- `CERTS` — certification list

### To change colors:
Edit CSS custom properties in `src/index.css` under `@theme`.

## Deployment

### GitHub Pages
```bash
npm run build
# Push the /dist folder to your gh-pages branch
```

### Vercel / Netlify
Connect your repo and set build command to `npm run build`, output directory to `dist`.

## Structure

```
sonika_portfolio/
├── public/
├── src/
│   ├── App.jsx       ← All content + components
│   ├── index.css     ← Global styles, Tailwind v4 theme
│   └── main.jsx      ← React entry
├── index.html
├── package.json
└── vite.config.js
```
