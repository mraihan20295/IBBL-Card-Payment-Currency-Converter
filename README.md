# CellFin Virtual Mastercard Currency Converter

A professional currency converter application for IBBL's CellFin Virtual Mastercard. Calculate the exact BDT amount needed for USD loading including bank charges and VAT.

## 🌟 Features

- **Real-time Calculation**: Instant BDT calculation with 3% bank charge and 15% VAT
- **Professional UI**: Modern glassmorphism design with IBBL branding
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **CellFin Integration**: Specifically designed for CellFin Virtual Mastercard
- **Live Exchange Rates**: Direct link to IBBL's official exchange rates
- **Copy Functionality**: One-click copy of calculated amounts

## 🚀 Live Demo

Visit: [https://cellfin-converter.netlify.app](https://cellfin-converter.netlify.app)

## 🏗️ Deployment on Netlify

### Option 1: Drag & Drop Deployment

1. **Prepare Files**: Ensure all files are in the project folder
2. **Create ZIP**: Compress the entire project folder
3. **Deploy**: Go to [Netlify](https://netlify.com) → Drag & drop your ZIP file
4. **Configure**: Your site will be live instantly with a random URL

### Option 2: Git Repository Deployment

1. **Create Repository**: Push your code to GitHub/GitLab
2. **Connect Netlify**: Link your repository to Netlify
3. **Auto-Deploy**: Automatic deployment on every code push

### Option 3: Netlify CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project directory
netlify deploy

# Deploy to production
netlify deploy --prod
```

## 📁 Project Structure

```
CellFin Currency Converter/
├── index.html          # Main application file
├── style.css           # Styling with glassmorphism effects
├── script.js           # Currency calculation logic
├── package.json        # Project configuration
├── netlify.toml        # Netlify deployment settings
├── .gitignore         # Git ignore file
├── README.md          # This documentation
└── images/            # Image assets directory
    └── README.md      # Image setup instructions
```

## 🛠️ Local Development

```bash
# Install dependencies (optional)
npm install

# Start local server
npm run dev
# OR
npm start

# Open browser
# Visit: http://localhost:3000
```

## 💡 Usage

1. **Enter USD Amount**: Input the amount you want to load
2. **Set Exchange Rate**: Enter current BDT per USD rate
3. **View Calculation**: See breakdown of charges and total BDT needed
4. **Check Live Rates**: Click "Today's Rates" for official IBBL rates
5. **Copy Amount**: Use copy buttons for easy sharing

## 🎨 Customization

### Colors & Branding
- IBBL green theme with glassmorphism effects
- Islamic banking inspired background patterns
- Professional typography using Inter font

### Configuration
- Bank charge: 3% (configurable in script.js)
- VAT rate: 15% (configurable in script.js)
- Exchange rate source: IBBL official rates

## 📱 Responsive Design

- **Desktop**: Full featured layout with card showcase
- **Tablet**: Optimized grid layout
- **Mobile**: Stacked layout with touch-friendly controls

## 🔧 Technical Details

- **Framework**: Vanilla HTML5, CSS3, JavaScript
- **Styling**: CSS Grid, Flexbox, Glassmorphism
- **Performance**: Optimized for fast loading
- **SEO**: Meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation

## 📋 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Contact: [your-email@domain.com]

## 🏦 About IBBL CellFin

CellFin is Islami Bank Bangladesh Limited's virtual mastercard solution for digital payments and international transactions.

---

**Made with ❤️ for IBBL CellFin users**
- Use PNG format if transparency is needed
- Ensure good contrast and readability
