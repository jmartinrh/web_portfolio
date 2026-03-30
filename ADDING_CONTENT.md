# Adding Content to the Portfolio

All content on this website lives in three JSON files inside the `data/` folder.
You never need to touch `index.html` or `main.js` to add, remove, or reorder content.

```
data/
├── projects.json     ← portfolio work entries
├── experiences.json  ← production credits
└── pillars.json      ← design philosophy cards
```

---

## How to Add a New Portfolio Project

Open `data/projects.json`. It is an array of objects — one per project.
Copy the template below and paste it as a new entry (add a comma after the previous entry's closing `}`).

```json
{
    "id": "my-new-project",
    "title": "My New Project (2026)",
    "externalLink": "https://example.com",
    "platform": "PC / Unity",
    "roles": "Game Designer",
    "description": "A short description of what the project is.",
    "bullets": [
        "First thing you contributed.",
        "Second thing you contributed."
    ],
    "media": { "type": "video", "src": "video/MyProject.mp4" },
    "challengeParagraphs": [
        "First challenge paragraph.",
        "Second challenge paragraph (optional, delete if not needed)."
    ],
    "carousel": {
        "track": "carousel-track",
        "buttons": true,
        "lightboxGroup": "my-project-set",
        "images": [
            "images/MyProject_01.png",
            "images/MyProject_02.png"
        ]
    }
}
```

**Projects render in the order they appear in the array.** Move entries up or down to reorder them on the page.

---

## Field Reference — Projects

### Required fields

| Field | What it does |
|-------|-------------|
| `id` | A unique lowercase identifier with hyphens. Not shown on screen — used internally. |
| `title` | The project heading. Supports inline HTML (see below). |
| `platform` | Shown under the title, e.g. `"PC / Unity"` or `"Fortnite Creative / UEFN"`. |
| `roles` | Your role(s) on the project, e.g. `"Project Lead, Game Designer"`. |
| `description` | The opening paragraph of the project description. Supports inline HTML. |
| `bullets` | An array of strings. Each becomes a `<li>` in the bullet list. |
| `challengeParagraphs` | An array of strings. Each becomes a paragraph in the Core Challenges box. Use an array with one item if you only have one paragraph. |

### Optional fields

| Field | What it does | Default if omitted |
|-------|-------------|-------------------|
| `externalLink` | A URL. If present, the project title becomes a clickable link. | Title is plain text |
| `peakPlayers` | A number. Renders as **Peak Players: X** below the bullet list. | Not shown |
| `downloadLink` | An object with `href` and `label`. Adds a download button above the bullet list. | Not shown |
| `media` | The video or embed shown on the right side. See media types below. | No media column |
| `carousel` | The image carousel below the project card. See carousel config below. | No carousel |

### Media types

**Local video file:**
```json
"media": { "type": "video", "src": "video/MyVideo.mp4" }
```

**Local video with a poster image (thumbnail before play):**
```json
"media": { "type": "video", "src": "video/MyVideo.mp4", "poster": "images/MyPoster.png" }
```

**YouTube embed:**
```json
"media": { "type": "iframe", "src": "https://www.youtube.com/embed/VIDEO_ID" }
```
To get a YouTube embed URL: on any YouTube video, click Share → Embed, and copy only the `src` value from the iframe code.

**No media (text-only layout):**
```json
"media": null
```

### Carousel config

```json
"carousel": {
    "track": "carousel-track",
    "buttons": true,
    "lightboxGroup": "unique-group-name",
    "images": [
        "images/Image01.png",
        "images/Image02.gif"
    ]
}
```

| Field | What it does |
|-------|-------------|
| `track` | Layout variant. Use `"carousel-track"` for landscape images (250×150px), `"carousel-track-2"` for portrait/card images (170×250px). |
| `buttons` | `true` adds prev/next arrow buttons. `false` hides them (good for small sets that don't need scrolling). |
| `lightboxGroup` | A unique name string. All images in this carousel share this group, so clicking one lets you browse through all of them. Use a different name for each project. |
| `images` | Array of image paths relative to the project root. |

**No carousel:**
```json
"carousel": null
```

---

## How to Add a New Production Experience

Open `data/experiences.json`. Copy and paste this template as a new entry:

```json
{
    "id": "my-new-credit",
    "title": "Game Title (Year)",
    "role": "Your Role",
    "image": "images/work-3.png",
    "imageAlt": "Game Title — descriptive text for accessibility",
    "link": "https://store.steampowered.com/app/...",
    "bullets": [
        "What you did on this project.",
        "Another contribution."
    ]
}
```

Experiences also render in array order. To add a cover image, place a new PNG in the `images/` folder and reference it in the `image` field.

---

## How to Edit the Design Pillars

Open `data/pillars.json`. Each pillar is a simple object:

```json
{
    "icon": "fa-solid fa-star",
    "title": "Pillar Name",
    "description": "One sentence describing this pillar."
}
```

To find icon names, browse the free icons at fontawesome.com and copy the class string (e.g. `fa-solid fa-puzzle-piece`).

---

## Using HTML inside text fields

The `title`, `description`, `bullets`, and `challengeParagraphs` fields all support inline HTML.
This is useful for italics, bold, or links within text:

```json
"description": "A game based on <em>The Walking Dead</em> IP.",
"bullets": [
    "Achieved <strong>7,400 peak players</strong> at launch.",
    "Read the full post-mortem <a href='https://...' target='_blank'>here</a>."
]
```

Keep inline HTML simple. Avoid block-level tags (`<div>`, `<p>`, `<section>`) inside these fields.

---

## Reordering content

To change the order projects or experiences appear on the page, simply move their objects up or down in the array. The page always renders entries from top to bottom in the order they appear in the file.

---

## Quick checklist when adding a new project

- [ ] Add the entry to `data/projects.json`
- [ ] Copy any new images into the `images/` folder
- [ ] Copy any new video into the `video/` folder
- [ ] Give the carousel `lightboxGroup` a name not used by any other project
- [ ] Give the entry a unique `id`
- [ ] Open the site in Live Server and verify it looks correct
