# iOS Web App Setup Guide

## Quick Start - Add to Home Screen (Safari)

### On iPhone/iPad:
1. Open the app in Safari: `https://your-deployed-url.com`
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Customize the name (optional)
5. Tap **Add**

The app now appears on your home screen like a native app!

---

## Features

✅ **Fullscreen Mode** - No Safari address bar  
✅ **Offline Support** - Service worker caches content  
✅ **Standalone Display** - Looks like a native app  
✅ **App Icon** - Custom icon on home screen  
✅ **Splash Screen** - Loading screen when launched  
✅ **Status Bar** - Customizable iOS status bar  

---

## Installation Instructions

### 1. Install Dependencies
```bash
npm install
npm install -D @vite-pwa/assets-generator
```

### 2. Update Your Code
Files already configured:
- ✅ `index.html` - iOS meta tags & service worker registration
- ✅ `public/manifest.json` - PWA manifest
- ✅ `public/sw.js` - Service worker for offline support
- ✅ `vite-pwa-config.ts` - PWA plugin configuration

### 3. Update vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pwaConfig } from './vite-pwa-config'

export default defineConfig({
  plugins: [react(), pwaConfig],
})
```

### 4. Generate App Icons
```bash
npx @vite-pwa/assets-generator --preset ios2 --padding "12px" icon.svg
```
- Create an `icon.svg` (your app logo) first
- This generates all required iOS icons automatically

### 5. Build & Deploy
```bash
npm run build
npm run preview
# Deploy to production
```

---

## iOS Specific Requirements

### Required Icons
Place in `public/` folder:
- `icon-180x180.png` - Apple touch icon
- `icon-192x192.png` - Standard icon
- `icon-512x512.png` - Large icon

### Meta Tags (Already Added)
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Network Edu" />
<link rel="apple-touch-icon" href="/icon-180x180.png" />
```

---

## Testing on iOS

### Using Safari DevTools:
1. Connect iPhone to Mac
2. Open Safari > Develop > [Your Device] > [Your App]
3. Use Web Inspector to debug

### Using Xcode Simulator:
1. Open Xcode > Simulator > iPhone
2. Open Safari → type your local/deployed URL
3. Follow "Add to Home Screen" steps

---

## Deployment

### Recommended Platforms
- **Vercel** - Free, instant deploys
- **Netlify** - Great for static sites
- **GitHub Pages** - Free hosting
- **Firebase Hosting** - Google-backed platform

### Deployment Example (Vercel):
```bash
npm install -g vercel
vercel
```

---

## App Store Distribution (Advanced)

For app store distribution, use **Capacitor** or **React Native** instead.

### Option A: Capacitor (Easier)
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap open ios
# Build in Xcode → Submit to App Store
```

### Option B: React Native (More powerful)
Requires significant code refactoring to React Native components.

---

## Troubleshooting

### App won't install on home screen
- ✅ Check manifest.json is valid
- ✅ Ensure icons are accessible
- ✅ Try different Safari settings

### Service worker not caching
- ✅ Clear Safari cache: Settings > Safari > Clear History and Website Data
- ✅ Check browser console for errors
- ✅ Verify sw.js is in public folder

### Offline features not working
- ✅ Check Network tab in DevTools
- ✅ Verify fetch event handler in sw.js
- ✅ Test in airplane mode

---

## Resources

- [Apple PWA Documentation](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/)
- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Capacitor Docs](https://capacitorjs.com/)
- [React Native Docs](https://reactnative.dev/)

---

## Next Steps

1. ✅ Run `npm install` to install dependencies
2. ✅ Generate icons using the commands above
3. ✅ Update `vite.config.ts` with PWA plugin
4. ✅ Deploy to production
5. ✅ Test "Add to Home Screen" on real iOS device