# Shashank Deshpande — Portfolio (Static)

Static HTML/CSS/JS version of my Laravel portfolio — deployable on GitHub Pages.

## Structure

```
├── index.html        # All sections (hero, about, skills, experience, projects, education, contact)
├── css/style.css     # Custom stylesheet (no frameworks)
├── js/script.js      # Typewriter, particles, scroll reveals, counters, tilt, contact form
└── images/
    └── profile.webp  # ← Add your profile photo here
```

## Deploy to GitHub Pages (free live link)

1. Create a new repository on GitHub (e.g. `portfolio`).
2. Push these files to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Static portfolio"
   git branch -M main
   git remote add origin https://github.com/shashankd7/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save**.
4. Your site goes live at: `https://shashankd7.github.io/portfolio/`

> Tip: If you name the repo `shashankd7.github.io`, the site lives at `https://shashankd7.github.io/` directly.

## Contact form (important — one-time setup)

GitHub Pages cannot run PHP, so the Laravel mail controller was replaced with
[FormSubmit.co](https://formsubmit.co) (free, no account needed). It sends form
submissions straight to **dsash223340@gmail.com**.

**One-time activation:** the first time someone submits the form on your live site,
FormSubmit emails you an activation link. Click it once — every submission after
that lands in your inbox automatically.

Want a different service? Swap `FORM_ENDPOINT` in `js/script.js` for a
[Formspree](https://formspree.io) endpoint — the rest of the code works unchanged.

## Add your photo

Drop your photo at `images/profile.webp` (square images look best). If the file
is missing, a fallback avatar shows automatically.
