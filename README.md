# Mobile Legends Professional Portal

A modern, fast, and professional Hero Database for Mobile Legends: Bang Bang.

## 🌟 Features
- **124+ Heroes**: Complete data fetched from the official MLBB API.
- **Search & Filter**: Instantly find heroes by name or role (Tank, Mage, etc.).
- **Premium UI**: Modern glass-morphism design with professional aesthetics.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Fast Performance**: Static site with localized JSON database.

## 🚀 Deployment
### Vercel (Recommended for Static)
1. Push this repository to GitHub.
2. Import to [Vercel](https://vercel.com). It will automatically detect `index.html`.

### Railway (Self-hosted Node)
This project is also compatible with Railway:
1. Push this repository to GitHub.
2. Go to [Railway](https://railway.app), click "New Project" -> "Deploy from GitHub repo".
3. Railway will detect the `package.json`, install dependencies, and run the Express server automatically.

## 🛠️ How to update data
If you want to update the hero list in the future (e.g., when a new hero is released):
1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Run the following command:
   ```bash
   node fetch_heroes.js
   ```
3. This will refresh `data/heroes.json` with the latest data.
4. Commit and push the changes to GitHub for auto-deployment.