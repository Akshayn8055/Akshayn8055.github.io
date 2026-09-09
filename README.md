# Akshay N — Portfolio

Personal portfolio built with [Astro](https://astro.build). Deployed to GitHub Pages via GitHub Actions on every push to `main`.

## Adding a new project

Drop a new file in `src/content/projects/your-slug.md` with this frontmatter:

```md
---
title: "Project Title"
tagline: "One sentence description."
dateRange: "Month Year – Month Year"
order: 7
featured: true
tags: ["Tag1", "Tag2"]
stack: ["Tool1", "Tool2"]
links:
  github: "https://github.com/you/repo"
  report: "/media/reports/your-report.pdf"
  youtube: "https://youtube.com/watch?v=..."
coverImage: "/media/photos/cover-your-slug.webp"
highlightVideo: "/media/highlights/your-slug.mp4"
gallery: []
---

## Overview
Whatever markdown you want here — becomes the project detail page body.
```

That's it — no code changes needed. It automatically appears on the homepage grid (sorted by `order`) and gets its own page at `/projects/your-slug/`.

## Adding a new certification

Same idea, in `src/content/certs/your-cert.md`:

```md
---
title: "Certification Name"
issuer: "Issuing Org"
date: "Month Year"
order: 4
description: "One sentence."
image: "/media/certs/your-cert.webp"
pdf: "/media/certs/your-cert.pdf"
---
```

## Media pipeline

Videos are NOT committed raw — GitHub has a 100MB per-file limit and this repo needs to stay light. The workflow:

1. Full-length raw footage lives outside this repo (originally in `~/Videos/robotics lab media archive`). Upload it to YouTube (unlisted is fine) and put the link in a project's `links.youtube`.
2. Short (10-20s), muted, heavily compressed **highlight loops** are what actually get committed, in `public/media/highlights/`. They autoplay silently on project cards and the project detail page. Generate one from a source file with:

   ```sh
   ffmpeg -ss 00:00:10 -t 16 -i "source-file.mp4" \
     -vf "scale=960:-2" -an -c:v libx264 -crf 30 -preset veryfast -pix_fmt yuv420p -movflags +faststart \
     public/media/highlights/your-slug.mp4
   ```

3. Cover/poster images are a single extracted frame, converted to WebP:

   ```sh
   ffmpeg -ss 00:00:01 -i public/media/highlights/your-slug.mp4 -frames:v 1 /tmp/frame.jpg
   convert /tmp/frame.jpg -resize 960x -quality 85 public/media/photos/cover-your-slug.webp
   ```

4. Photos go straight into `public/media/photos/` as WebP (`convert source.jpg -resize 1400x -quality 85 out.webp`).
5. Certificate PDFs go in `public/media/certs/` alongside a WebP thumbnail of page 1 (`pdftoppm -jpeg -r 150 -f 1 -l 1 file.pdf /tmp/out && convert /tmp/out-1.jpg -resize 900x public/media/certs/thumb.webp`).

## Design system

Neumorphic / soft-UI, defined in `src/styles/global.css`:

- One base hue (`--hue`/`--sat`) drives the whole palette — every surface is the same `--bg` color.
- Depth comes only from two tinted box-shadows per element (`--shadow-dark` / `--shadow-light`), never plain black/white, never a hard border.
- `.neu-raised` / `.neu-raised-sm` — extruded surfaces (cards, nav, buttons default state)
- `.neu-pressed` — inset/pressed look (active states, the hero monogram)
- `.neu-flat` — subtle low-relief chips/stat tiles
- Light/dark theme: follows system `prefers-color-scheme` automatically; the toggle button (bottom-right) overrides it and persists the choice in `localStorage`.

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------- |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build production site to `./dist/`           |
| `npm run preview`   | Preview the production build locally         |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. One-time repo setup: **Settings → Pages → Source → GitHub Actions**.
