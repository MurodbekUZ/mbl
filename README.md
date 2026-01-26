# Mobile Legends Professional Portal

A modern, fast, and professional Hero Database for Mobile Legends: Bang Bang.

## 🌟 Features
- **124+ Heroes**: Complete data fetched from the official MLBB API.
- **Search & Filter**: Instantly find heroes by name or role (Tank, Mage, etc.).
- **Premium UI**: Modern glass-morphism design with professional aesthetics.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Fast Performance**: Static site with localized JSON database.

## 🚀 Deployment on Vercel
This project is pre-configured for **one-click deployment** on Vercel:
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click "Add New" -> "Project".
3. Import this repository.
4. Click **Deploy**. Vercel will automatically host the `index.html` at the root.

## 🛠️ How to update data
If you want to update the hero list in the future (e.g., when a new hero is released):
1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Run the following command:
   ```bash
   node fetch_heroes.js
   ```
3. This will refresh `data/heroes.json` with the latest data.
4. Commit and push the changes to GitHub for auto-deployment.