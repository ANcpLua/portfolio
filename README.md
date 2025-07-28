# Portfolio Website

Interactive portfolio built with .NET, TailwindCSS, and AI features.

**Live Site**: [https://ancplua.github.io/portfolio/](https://ancplua.github.io/portfolio/)

## Setup

### Development
```bash
npm install
cd Portfolio && npx tailwindcss -i ./wwwroot/css/tailwind.css -o ./wwwroot/css/output.css --minify
```

### AI Features
1. Get a [Gemini API key](https://aistudio.google.com/app/apikey)
2. Add to [GitHub Secrets](https://github.com/ANcpLua/portfolio/settings/secrets/actions): `GEMINI_API_KEY`
3. GitHub Actions automatically injects the key during deployment

## Deployment

Automatically deploys to [GitHub Pages](https://ancplua.github.io/portfolio/) via GitHub Actions.

## Structure

- `Portfolio/index.html` - Main portfolio page
- `Portfolio/wwwroot/css/` - Compiled CSS assets
- `Portfolio/wwwroot/js/` - JavaScript libraries
- `.github/workflows/` - Deployment automation

## License

[MIT License](LICENSE)