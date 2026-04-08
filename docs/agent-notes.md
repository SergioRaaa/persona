# Agent Notes — Sergey Rakhaimov Documentary Filmmaker Portfolio

> Working notes for codebase changes. Updated after each significant modification.

---

## Codebase Overview

**Last reviewed:** 2026-04-06

### Architecture

- **Type:** Static multi-page site (MPA), no framework, no build step, no bundler
- **Deployment:** GitHub Actions → FTP push to shared hosting (push to `main`)
- **Zero external CDN dependencies** — only embedded video iframes (Kinescope, YouTube)
- **No analytics, no forms, no cookie tracking**

### Main Modules

| File | Purpose |
|------|---------|
| `index.html` | Homepage — bio, role chips, project grid, client logos |
| `theme.css` | Single stylesheet (~550 lines), dark theme, CSS custom properties, responsive grids |
| `theme.js` | Two IIFEs: (1) transforms `.page-link` + `.image-block` into hoverable `.project-card` poster cards; (2) adds `.is-loaded` to `.video-frame` iframes on load (8s fallback) |
| `breadcrumbs.js` | IIFE — dynamic breadcrumb navigation from `trailByFile` map |
| `footer-partial.js` | IIFE — injects copyright/disclaimer footer into `.site-footer` elements |
| `experience-logos.js` | IIFE — random shuffle, hover/focus states, tooltip descriptions for client logos |
| `.github/workflows/deploy.yml` | GitHub Actions deploy workflow |

### Page Structure (13 project pages)

**Content hierarchy:**
```
Homepage (index.html)
  |-- Documentary Films
  |     |-- Без Тормозов
  |     |-- Серия мини-фильмов (Русский музей)
  |     |     |-- Дмитрий Покровский
  |     |     |-- InsideOut 3.0
  |     |     |-- Спланированные случайности
  |     |-- Focus Drive
  |     |-- Театр Одного Анархиста
  |-- Video Production
  |     |-- Мастер-класс Дмитрия Кустановича
  |     |-- Clip Take Me To Church
  |     |-- Teleitems Presentation
  |-- Feature Films
        |-- Чародей
        |-- Деньги
        |-- Домашний Джокер
```

Every page follows identical HTML skeleton: `site-page > article.page > page-header + breadcrumbs + page-content + site-footer`

### CSS Design System

**Key CSS custom properties:**
- `--bg`: `#000000` (pure black)
- `--surface`, `--surface-strong`, `--surface-soft`: dark card surfaces
- `--text-primary`, `--text-secondary`, `--text-tertiary`: text hierarchy
- `--red`: `#ff7a70`, `--purple`: `#b18cff`, `--blue`: `#58a0ff`: accent tones

**Responsive breakpoints:** `1100px` (3/4 → 2 cols), `860px` (single column)

### JS Patterns

- All files are IIFEs — no global scope pollution
- DOM-driven, progressive enhancement — pages work without JS
- Defensive coding — extensive null-checks throughout

---

## Potential Weaknesses

### 1. Redundant Footer Markup
The footer HTML is hardcoded in every page **AND** reinjected by `footer-partial.js`. This means the footer content exists twice in every sub-page. If the inline footer and the JS-injected footer differ, the JS overwrites on load, but it's still duplication.

### 2. No Font Loading
The CSS references `"Sora"` and `"IBM Plex Mono"` but relies on system fallbacks. These fonts are not loaded from any CDN or self-hosted. If not installed on the user's system, fallbacks (`Segoe UI`, `Menlo`, `Consolas`) are used — visual inconsistency.

### 3. Manual Content Management
Every page is hand-authored HTML. No CMS, no templating, no SSG. Adding/editing pages requires manual HTML editing — error-prone and not scalable.

### 4. URL-Encoded Asset Paths
Media folders use URL-encoded Russian names (e.g. `source/%D0%91%D0%B5%D0%B7%20%D0%A2%D0%BE%D1%80%D0%BC%D0%BE%D0%B7%D0%BE%D0%B2_files/`). This is hard to maintain and confusing in file references.

### 5. Hardcoded Breadcrumb Map
`breadcrumbs.js` uses a hardcoded `trailByFile` map. Adding new pages with custom breadcrumb paths requires editing this map manually.

### 6. No Image Optimization Pipeline
All images are `.webp` but served at original resolution. No `srcset`, no responsive image handling beyond CSS `max-width`.

### 7. Script Load Order Sensitivity
Different pages load scripts in different orders. `index.html` loads `experience-logos.js` but not `breadcrumbs.js`. Sub-pages load `footer-partial.js`, `breadcrumbs.js`, `theme.js`. Any dependency between scripts is implicit and fragile.

---

## Change Log

| Date | Change | Notes |
|------|--------|-------|
| 2026-04-06 | Initial review | Created this file. Documented architecture, modules, dependencies, and weaknesses. |
| 2026-04-06 | Theatre video URL extracted | Video on "Театр Одного Анархиста" page is a VK Video embed: `https://vk.com/video_ext.php?oid=-100710895&id=456239365&hash=37dd36664d4abd10`. Saved to `theatrelink.txt`. The iframe src pointed to a local `video_ext.html` wrapper which loads the VK player dynamically. |
| 2026-04-06 | Focus Drive YouTube → Kinescope migration | Replaced two YouTube embeds (`bB7l2tCwB4c`, `JA5Z0eyM9Y0`) with Kinescope equivalents (`spSajqTpUiD3TQoZVB55cV`, `6mWf3xRgm5T5rmkLrgfg8W`). First video was already on Kinescope — left unchanged. |
