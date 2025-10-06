# Odin Lindal – Portfolio

This is my personal portfolio website, built with **React** and **Vite**, showcasing my projects, experience, and contact info.  

You can view it live here: **[odinlindal.github.io](https://odinlindal.github.io)**  

---

## 🚀 Features
- Responsive, modern UI with a hero section and headshot
- Projects pulled live from my GitHub repositories (non-forks), with stars, topics, and links
- "View more" pagination for projects
- Expandable timeline for professional and academic experience
- Contact section with email, LinkedIn, and GitHub links
- Fast build times and optimized assets with Vite

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite
- **Styling:** CSS
- **Data:** GitHub REST API via `fetch`
- **Deployment:** GitHub Pages (gh-pages branch)

---

## 🔧 Notes
- This repo serves the built site; some content (like the projects list) is fetched at runtime from GitHub.
- If you change assets like the headshot, prefer adding them to `public/` (or importing from `src/assets/`) and rebuilding.
