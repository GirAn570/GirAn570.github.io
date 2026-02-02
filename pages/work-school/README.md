# Work/School page – How to add / modify entries

This page is currently static HTML (no JS data file yet) and is built from:

- `pages/work-school/index.html`
- `assets/css/bw-yellow.css` (styles for `.ws-*` alternating layout)

## Structure of the page

The page is split into 2 groups:

1. **Education** (chronological)
2. **Work Experience** (chronological)

Each group contains a list of entries using this pattern:

```html
<article class="ws-item">
  <div class="ws-item-text"> ... </div>
  <div class="ws-item-media"> ... </div>
</article>

<article class="ws-item ws-item--flip">
  <div class="ws-item-text"> ... </div>
  <div class="ws-item-media"> ... </div>
</article>
```

- Use `ws-item` for a normal row (text left, image right).
- Add `ws-item--flip` to flip it (text right, image left).

## Editing an entry (text)

Inside `.ws-item-text`, the fields are:

- `<h3>`: title (example: `BTS Cloud Computing`)
- `<h4>`: organization (example: `Lycée Guillaume Kroll`)
- `<p class="timeline-date">`: date range
- `<p>`: description

Most text uses `data-i18n="timeline.xxx"` so it can be translated by `assets/js/language-switcher.js`.

If you add a new entry and want it translated:

- Add new `data-i18n` keys to `language-switcher.js` under `timeline` for each language.

If you don’t need translations for a new entry yet:

- You can temporarily write plain text without `data-i18n`.

## Adding an image

Right now each entry contains a placeholder:

```html
<div class="ws-media" role="img" aria-label="Image placeholder: ..."></div>
```

When you have an image, replace the placeholder with an `<img>`:

```html
<div class="ws-media">
  <img src="../../assets/images/work-school/your-image.jpg" alt="Describe the image" loading="lazy">
</div>
```

CSS already supports images inside `.ws-media` (`object-fit: cover`).

## Images you will need

One image per entry (recommended):

- Lycée Guillaume Kroll
- Université de Luxembourg
- Ecole Internationale de Differdange
- CGPO
- Klepper S.A.

## Keeping it chronological

This page does not auto-sort.

- Keep **Education** entries ordered from newest to oldest.
- Keep **Work Experience** entries ordered from newest to oldest.
