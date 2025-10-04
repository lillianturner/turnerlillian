# Portfolio Setup Guide

## Quick Start (HTML Version)

Your portfolio is already working! Open `portfolio-simple.html` in your browser to see it immediately.

## Full React Version Setup

To run the complete React version with advanced features, follow these steps:

### 1. Install Node.js

**Option A: Using Homebrew (Recommended for macOS)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

**Option B: Download from Official Website**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version for macOS
3. Run the installer

**Option C: Using Node Version Manager (nvm)**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.bashrc

# Install latest LTS Node.js
nvm install --lts
nvm use --lts
```

### 2. Install Dependencies

After Node.js is installed, run:

```bash
cd /Users/lillianturner/Desktop/turnerlillian
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Your portfolio will be available at `http://localhost:3000`

## Project Structure

```
turnerlillian/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Hero section
│   │   ├── UXCaseStudies.tsx # Case studies section
│   │   ├── TechnicalWriting.tsx # Tech writing section
│   │   ├── DesignGallery.tsx # Design gallery
│   │   ├── About.tsx        # About section
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Footer.tsx       # Footer
│   │   └── ui/              # Reusable UI components
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── portfolio-simple.html   # Simple HTML version (works immediately)
```

## Features

### Current HTML Version
- ✅ Glass & Nature Fusion theme
- ✅ Responsive design
- ✅ Smooth scrolling navigation
- ✅ Contact form (demo)
- ✅ Professional portfolio sections

### React Version (After Setup)
- ✅ All HTML features
- ✅ Advanced UI components (Radix UI)
- ✅ TypeScript for better development
- ✅ Hot reload development
- ✅ Component-based architecture
- ✅ Advanced animations and interactions
- ✅ Form validation
- ✅ Optimized build process

## Customization

### Colors (CSS Variables in HTML version)
```css
:root {
  --primary: #1a1a1a;
  --accent: #0066cc;
  --accent-green: #22c55e;
  --accent-copper: #b45309;
  /* ... more colors */
}
```

### Content
Update the text content in either:
- `portfolio-simple.html` (HTML version)
- `src/components/*.tsx` files (React version)

## Deployment Options

1. **GitHub Pages** (Free)
   - Push your code to GitHub
   - Enable Pages in repository settings

2. **Netlify** (Free tier available)
   - Drag and drop your files
   - Auto-deploys from Git

3. **Vercel** (Free tier available)
   - Perfect for React apps
   - Connect your GitHub repository

## Troubleshooting

### Node.js Issues
- Make sure Node.js version is 16 or higher: `node --version`
- Clear npm cache if installation fails: `npm cache clean --force`

### Port Already in Use
- Change the port in `vite.config.ts` or `package.json`
- Kill processes using port 3000: `sudo lsof -t -i tcp:3000 | xargs kill -9`

### Dependencies Issues
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Next Steps

1. **Content**: Replace placeholder text with your actual work
2. **Images**: Add your project screenshots and portfolio images
3. **Links**: Update social media and project links
4. **Resume**: Add your actual resume file
5. **Contact**: Set up real form handling (EmailJS, Netlify Forms, etc.)

## Need Help?

- Check the terminal for error messages
- Review the browser console for JavaScript errors
- Ensure all dependencies are installed correctly

Your portfolio is ready to showcase your amazing work! 🚀