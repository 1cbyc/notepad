# cPanel Deployment Guide

Your Notepad app has been built for static hosting and is ready to deploy to cPanel.

## What was built:
- Static HTML files in the `out/` directory
- All assets optimized and bundled
- No server-side dependencies required

## Deployment Steps:

### 1. Access your cPanel
- Log into your hosting provider's cPanel dashboard
- Navigate to the File Manager

### 2. Upload files
- Go to your domain's public_html directory (or subdomain directory)
- Upload ALL contents from the `out/` folder to your public_html directory
- Make sure to maintain the folder structure

### 3. Alternative: Upload via FTP
If you prefer FTP:
- Use an FTP client (FileZilla, WinSCP, etc.)
- Connect to your hosting server
- Upload all files from the `out/` directory to your public_html folder

### 4. Verify deployment
- Visit your domain to ensure the app loads correctly
- Test the notepad functionality

## File Structure to Upload:
```
public_html/
├── index.html
├── 404.html
├── favicon.ico
├── _next/
│   ├── static/
│   └── ...
└── [other assets]
```

## Important Notes:
- The app is now completely static and doesn't require Node.js on your hosting
- All data is stored locally in the browser (localStorage)
- No server-side processing is needed
- The app will work on any standard web hosting

## Troubleshooting:
- If the app doesn't load, check that all files were uploaded correctly
- Ensure your hosting supports HTTPS (recommended for modern web apps)
- Clear browser cache if you see old versions

## Re-deploying Updates:
1. Run `npm run build` locally
2. Upload the new contents of the `out/` directory to replace the old files
3. Clear browser cache to see changes 