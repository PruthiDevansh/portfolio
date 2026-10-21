# Devansh Pruthi · Portfolio

My personal portfolio site. Plain HTML, CSS and JavaScript: no build step, no dependencies.

- `index.html`: the interactive portfolio. A start screen lets visitors pick the interactive view, the resume, or the games.
- `resume.html`: a clean one-page resume with a "Save as PDF" button (uses the browser's print).

## Run it

Open `index.html` in a browser.

## Edit it

- Content is in `index.html` and `resume.html`. Search for `TODO` to find what to fill in (job dates, education).
- The quiz questions and the "spot the bug" code are in `script.js` (`QUESTIONS` and `BUG_LINES`).
- Colors and layout are in `styles.css` (theme tokens at the top).
- Add a project by copying one `<article class="card-work">` block in `index.html`. Its `data-cat` (`web`, `mobile`, `ai`) sets which filter shows it.

## Deploy it (free)

- **GitHub Pages:** push to a repo under github.com/PruthiDevansh, then Settings → Pages → deploy from the `main` branch, root folder.
- **Vercel:** import the repo, framework "Other", no build command.
