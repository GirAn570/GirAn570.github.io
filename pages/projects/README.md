# Projects page – How to add / modify entries

This page is generated client-side by:

- `pages/projects/index.html` (layout)
- `assets/js/projects.js` (data + rendering + filters + modal)
- `assets/css/bw-yellow.css` (styling)

## Where the project entries live

Open:

- `assets/js/projects.js`

At the top of the file there is an array:

- `projects`

Each object inside that array is one project.

## Ordering (chronological, newest first)

Projects are automatically sorted by `date` descending (newest first).

- Use ISO format: `YYYY-MM-DD`

## Filters (All / School / Personal)

Each project must have:

- `type: "school"` or `type: "personal"`

The 3 buttons at the top filter by this field.

## Project schema

Each project supports:

- `id` (string)
  - Unique identifier.
- `title` (string)
- `date` (string, `YYYY-MM-DD`)
- `type` (string)
  - `"school"` or `"personal"`
- `shortDescription` (string)
  - Shown in the list.
- `longDescription` (string)
  - Shown in the popup modal.
- `pdf` (string or `null`)
  - If `null`, the PDF section is hidden in the modal.
- `video` (object or `null`)
  - If `null`, the video section is hidden.
- `relatedBadges` (array of strings)
  - Labels shown as badges in the modal.

## PDF paths

`pdf` is a relative path (relative to `pages/projects/index.html`).

Example:

```js
pdf: '../../context/projects/work_school/portfolio/Online Portfolio Guide.pdf'
```

## Video demo

You can attach a video in two ways.

### 1) Embed (YouTube, etc.)

```js
video: {
  type: 'embed',
  src: 'https://www.youtube.com/embed/VIDEO_ID'
}
```

### 2) Local file

```js
video: {
  type: 'file',
  src: '../../assets/videos/my-demo.mp4'
}
```

If you don’t want a video, set:

```js
video: null
```

## Example: adding a new project

Add a new object inside the `projects` array:

```js
{
  id: 'my-new-project',
  title: 'My New Project',
  date: '2026-02-01',
  type: 'personal',
  shortDescription: 'Short description here.',
  longDescription: 'Long description here.',
  pdf: null,
  video: null,
  relatedBadges: ['Cloud', 'Python']
}
```
