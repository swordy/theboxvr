# CLAUDE.md

Guidelines for AI assistants working on the THE BOX VR codebase.

## Project Overview

**THE BOX VR** is a static website for a VR gaming lounge and coffee shop, hosted via GitHub Pages at `www.thebox-vr.com`. The site has two versions: a legacy single-page fullscreen scroller (root) and the current Bootstrap-based scrolling navigation site (`v2/`).

## Repository Structure

```
/
├── CNAME                         # GitHub Pages custom domain (www.thebox-vr.com)
├── index.html                    # Legacy v1 site (fullPage.js single-section page)
├── javascript.fullPage.js        # fullPage.js v0.0.9 Alpha (pure JS, 2180 lines)
├── javascript.fullPage.min.js    # Minified fullPage.js
├── javascript.fullPage.css       # fullPage.js styles
├── Cover Facebook.jpg            # Hero image for v1
├── virtual_reality-512.png       # VR icon asset
│
└── v2/                           # Current version of the site
    ├── index.html                # Main page (Bootstrap 4, scrolling nav)
    ├── gulpfile.js               # Gulp build tasks (copy vendor deps, browserSync dev server)
    ├── .travis.yml               # Travis CI config (Node.js, runs npm test + gulp)
    ├── LICENSE                   # MIT License (Blackrock Digital LLC / Start Bootstrap)
    ├── css/
    │   └── scrolling-nav.css     # Custom styles (header/section spacing)
    ├── js/
    │   └── scrolling-nav.js      # jQuery smooth scrolling + scrollspy activation
    ├── images/
    │   └── coming_Soon.jpg       # Hero/header image
    └── vendor/                   # Third-party libraries (committed, not npm-managed at runtime)
        ├── bootstrap/            # Bootstrap 4 CSS + JS
        ├── jquery/               # jQuery 3.x
        ├── popper/               # Popper.js (Bootstrap dependency)
        └── jquery-easing/        # jQuery Easing plugin
```

## Technology Stack

### V1 (Root - Legacy)
- **fullPage.js** v0.0.9 Alpha (pure JavaScript, no jQuery dependency)
- Inline CSS with CSS reset
- Single full-screen section layout

### V2 (`v2/` - Current)
- **Bootstrap 4** (CSS + JS)
- **jQuery 3.x** + jQuery Easing
- **Popper.js** (tooltip/popover positioning)
- **Gulp** for build tasks (vendor file copying, BrowserSync live reload)
- **Travis CI** for continuous integration
- Based on the **Start Bootstrap - Scrolling Nav** template

## Development Workflow

### Local Development (v2)

1. Install dependencies (if `node_modules` is missing):
   ```bash
   cd v2
   npm install
   ```

2. Copy vendor files from node_modules:
   ```bash
   gulp copy
   ```

3. Run the development server with live reload:
   ```bash
   gulp dev
   ```
   This starts BrowserSync and watches for changes in `css/*.css`, `js/*.js`, and `*.html`.

### Key Gulp Tasks
- `gulp copy` (also `gulp` default) - Copies Bootstrap, jQuery, Popper, and jQuery Easing from `node_modules/` to `vendor/`
- `gulp dev` - Starts BrowserSync dev server with file watching
- `gulp browserSync` - Starts BrowserSync server only

## Deployment

The site is deployed via **GitHub Pages** from the repository. The `CNAME` file maps to `www.thebox-vr.com`. Changes pushed to the default branch are automatically published.

## Key Conventions

### File Organization
- Vendor/third-party libraries are committed directly in `v2/vendor/` (not loaded from CDN)
- Custom CSS goes in `v2/css/`, custom JS goes in `v2/js/`
- Images belong in `v2/images/`

### Coding Style
- JavaScript uses `"use strict"` mode with IIFE pattern (see `v2/js/scrolling-nav.js`)
- CSS uses minimal custom styling, relying on Bootstrap utility classes
- HTML follows Bootstrap 4 grid conventions (`container` > `row` > `col-*`)

### Site Sections (v2)
The v2 site is a single-page scrolling layout with these sections:
1. **Navigation** - Fixed dark navbar with brand and links
2. **Header** - Hero area with "Coming Soon" image
3. **About** (`#about`) - "A propos" section
4. **Services** (`#services`) - Services description
5. **Contact** (`#contact`) - Contact information
6. **Footer** - Copyright notice

### Language
The site content uses **French** for user-facing section headings ("A propos", "Services", "Contact") while code and comments are in English.

## Important Notes

- The root `index.html` (v1) currently only displays a cover image in a single fullPage.js section. It appears to be a placeholder/legacy version.
- The v2 site contains placeholder Lorem Ipsum content in the Services and Contact sections -- these are intended to be replaced with real content.
- The `v2/vendor/` directory contains committed copies of dependencies. If updating these libraries, run `npm install` then `gulp copy` to refresh them.
- File paths with spaces exist in the repo (e.g., `Cover Facebook.jpg`). Use quotes when referencing them in commands.

## Visual Explainer Skill

The **visual-explainer** skill is installed in `.claude/skills/visual-explainer/`. It generates styled HTML pages (diagrams, tables, slides) instead of ASCII art. Read `.claude/skills/visual-explainer/SKILL.md` when any of the following slash commands are invoked:

| Command | Purpose |
|---------|---------|
| `/generate-web-diagram` | Create interactive HTML diagrams (Mermaid, architecture, flowcharts) |
| `/generate-visual-plan` | Visual implementation planning |
| `/generate-slides` | Slide deck generation |
| `/diff-review` | Visual code diff analysis with architecture comparison |
| `/plan-review` | Compare plans against codebase with risk assessment |
| `/project-recap` | Context-switching snapshot of project state |
| `/fact-check` | Verify document accuracy against actual code |
| `/share` | Deploy generated HTML to Vercel for sharing |

Output is saved to `~/.agent/diagrams/` and opened in the default browser.
