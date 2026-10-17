# Portfolio — Ridwan Ibrahim

A fast, dependency-free portfolio site. Just HTML, CSS and vanilla JavaScript — no build step, no npm, no frameworks.

## Preview it

Just open `index.html` in a browser. Or serve the folder with anything static, e.g. VS Code Live Server.

## Deploy it

Upload these files to GitHub Pages, Netlify or Vercel as a static site — no build command needed:

```
portfolia/
├── images/        # Project screenshots (hr-webapp.png, order.png, birth.png)
├── index.html     # Markup
├── style.css      # All styles, dark + light themes
├── main.js        # Theme toggle, nav, scroll reveals, contact form
└── README.md      # This file
```

The only external requests are Google Fonts and Font Awesome via CDN.

## Customise it

- **Content**: edit text and project cards in `index.html`
- **Colours**: tweak the CSS variables under `:root[data-theme="dark"]` / `[data-theme="light"]` in `style.css`
- **Contact form**: currently opens the visitor's mail app via `mailto:`. To send in-page instead, hook the `#contact-form` submit handler in `main.js` up to a service like Formspree.

## Contact

- **Email**: ibraheemreedwan100@gmail.com
- **GitHub**: [@reeocity](https://github.com/reeocity)

MIT License — feel free to reuse this as a template.
