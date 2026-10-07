# Pushpendra Mathur — Digital Marketing & Performance Specialist Portfolio

High-converting, responsive personal portfolio for **Pushpendra Mathur**, Digital Marketing & Performance Specialist based in Dubai, UAE.

Live Showcase:
- **Google Ads & Meta Ads Campaign Architecture**
- **ROAS & Lead Generation Case Studies**
- **Interactive 3D Marketing Orbit Model** (Three.js WebGL & Canvas engine)
- **High-Resolution Campaign Dashboard Lightbox Viewer**
- **Mobile-Responsive Design** optimized across iPhones, Android devices, tablets, laptops, and ultra-wide screens.

---

## 🚀 How to Publish to GitHub Pages (Free & Instant)

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/new) and create a new repository (e.g. `pushpa-portfolio` or `<your-username>.github.io`).
2. **Upload / Push the Code**:
   - Either extract and drag-and-drop the files from the provided ZIP directly into your repository, or push via git CLI:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Responsive Digital Marketing Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - On GitHub, go to your repository **Settings** tab.
   - Click **Pages** in the left sidebar.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
   - Your portfolio will be live at `https://<your-username>.github.io/<your-repo-name>/` in 1–2 minutes!

---

## 💻 Local Development

Run locally with standard static server or Vite:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle (optional)
npm run build
```

---

## 📁 Project Structure

```text
├── index.html           # Main semantic HTML5 portfolio document
├── .nojekyll            # Bypasses Jekyll on GitHub Pages
├── .gitignore           # Git ignore rules for node_modules and builds
├── css/
│   └── style.css        # Responsive dark-theme stylesheet with multi-breakpoint media queries
├── js/
│   ├── main.js          # Navigation drawer, modal lightbox, copy-to-clipboard, toast engine
│   └── marketing-3d.js  # Interactive Three.js WebGL and 2D canvas simulation
├── Image/               # Campaign dashboards, ad screenshots, and media assets
│   ├── google-ads-campaigns.jpg
│   ├── meta-natco-leads.jpeg
│   ├── meta-arn-adsets.jpeg
│   └── meta-starstorm-leadgen.jpeg
└── CV/                  # Curriculum Vitae PDF download
    └── Pushpendra mathur Digital Marketing Specialist-1.pdf
```
