# Certifications page – How to add / modify entries

This page is generated **client-side** by:

- `pages/certifications/index.html` (layout)
- `assets/js/certifications.js` (data + rendering + filtering/sorting/modal)
- `assets/css/bw-yellow.css` (styling)

## Where the data lives

Open:

- `assets/js/certifications.js`

At the top of the file you will find an array named:

- `certifications`

Each object inside that array is one entry (badge).

## Entry schema (fields)

Each entry uses the following fields:

- `id` (string)
  - Unique identifier.
  - Example: `"word-associate"`
- `name` (string)
  - The title shown in grid/list and in the modal.
- `delivered` (string, `YYYY-MM-DD`)
  - Date displayed in the UI and used for date sorting.
  - Example: `"2024-06-01"`
- `category` (string)
  - Must be one of:
    - `Certification`
    - `Courses`
    - `Formation`
    - `Visits`
- `description` (string)
  - Short text displayed in list view and in the modal.
- `tags` (array of strings)
  - Used for tag filtering and shown as badges.
  - Example: `["Microsoft", "Office", "Word"]`
- `pdf` (string or `null`)
  - Relative path to the PDF certificate.
  - If `null`, the “Open PDF” button is hidden.
- `badgeImage` (string)
  - Relative path to the badge image.
  - Leave `""` for now if you don’t have the image yet.

## Example: adding a new certification

Add a new object inside the `certifications` array:

```js
{
  id: 'aws-cloud-practitioner',
  name: 'AWS Certified Cloud Practitioner',
  delivered: '2025-03-10',
  category: 'Certification',
  description: 'Foundational AWS certification covering core cloud concepts.',
  tags: ['AWS', 'Cloud', 'Fundamentals'],
  pdf: '../../context/docs/cerifications/aws/AWS-CCP.pdf',
  badgeImage: ''
}
```

## Adding a PDF

- Put the PDF file somewhere in your repo (for example under `context/docs/cerifications/...`).
- Set the entry `pdf` field to the correct relative path.

Notes:

- Paths are **relative to** `pages/certifications/index.html` because the script runs from that page.
- If the PDF filename contains spaces, it will still work (the script uses `encodeURI`).

## Adding a badge image

When you have badge images:

- Put them in a folder you choose (recommended): `assets/images/certifications/`
- Set `badgeImage` to something like:

```js
badgeImage: '../../assets/images/certifications/aws-cloud-practitioner.png'
```

If `badgeImage` is an empty string, the UI will show a **blank square placeholder**.

## How filters work

- Category filter: computed from `entry.category`.
- Tag filter: computed from `entry.tags` (all unique tags across entries).

If you add a new tag/category in the data, it will appear automatically.

## How views work

- **Grid view**: shows the badge tile. Clicking opens the details modal.
- **List view**: shows more information inline (category/date/description/tags).

## Sorting

The sort dropdown (`#certifications-sort`) supports:

- `date-desc`
- `date-asc`
- `name-asc`
- `category-asc`

Sorting is applied after filtering.
