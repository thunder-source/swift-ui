# Storybook Deployment Guide

This guide explains how to publish your Storybook live using different platforms.

## Option 1: Chromatic (Recommended - Easiest)

Chromatic is Storybook's official hosting service. You already have it installed!

### Steps:

1. **Sign up for Chromatic** (if you haven't already):
   - Go to [https://www.chromatic.com/](https://www.chromatic.com/)
   - Sign up with your GitHub/GitLab account

2. **Get your project token**:
   - After signing up, create a new project
   - Copy your project token from the dashboard

3. **Set up the token**:
   
   **Option A: Environment Variable (Recommended)**
   - Create a `.env` file in your project root:
     ```
     CHROMATIC_PROJECT_TOKEN=your-token-here
     ```
   - Update `package.json` script to:
     ```json
     "chromatic": "chromatic --project-token=$CHROMATIC_PROJECT_TOKEN"
     ```
   - Or on Windows PowerShell:
     ```json
     "chromatic": "chromatic --project-token=$env:CHROMATIC_PROJECT_TOKEN"
     ```

   **Option B: Direct in script (Less secure)**
   - Update the `chromatic` script in `package.json` with your token

4. **Deploy**:
   ```bash
   npm run chromatic
   ```

5. **Access your Storybook**:
   - Chromatic will provide you with a URL like: `https://your-project.chromatic.com`
   - The Storybook will automatically update on every push to your repository

### CI/CD Integration:
Chromatic integrates automatically with GitHub/GitLab. Just push your code and it will deploy!

---

## Option 2: Netlify (Free & Easy)

### Steps:

1. **Build your Storybook**:
   ```bash
   npm run build-storybook
   ```

2. **Sign up for Netlify**:
   - Go to [https://www.netlify.com/](https://www.netlify.com/)
   - Sign up with your GitHub/GitLab account

3. **Deploy**:
   - **Option A: Drag & Drop**
     - Drag the `storybook-static` folder to Netlify's dashboard
     - Your Storybook will be live instantly!
   
   - **Option B: Git Integration**
     - Connect your GitHub repository
     - Set build command: `npm run build-storybook`
     - Set publish directory: `storybook-static`
     - Netlify will auto-deploy on every push

4. **Access your Storybook**:
   - Netlify will provide a URL like: `https://your-project.netlify.app`

The `netlify.toml` file is already configured for you!

---

## Option 3: Vercel (Free & Easy)

### Steps:

1. **Sign up for Vercel**:
   - Go to [https://vercel.com/](https://vercel.com/)
   - Sign up with your GitHub/GitLab account

2. **Deploy**:
   - Import your GitHub repository
   - Vercel will auto-detect the `vercel.json` configuration
   - Click "Deploy"

3. **Access your Storybook**:
   - Vercel will provide a URL like: `https://your-project.vercel.app`
   - Auto-deploys on every push

The `vercel.json` file is already configured for you!

---

## Option 4: GitHub Pages (Free)

### Steps:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages"
   - Select source: "GitHub Actions"

2. **Deploy**:
   - The GitHub Actions workflow (`.github/workflows/deploy-storybook.yml`) is already set up
   - Just push to the `main` branch and it will automatically deploy!

3. **Access your Storybook**:
   - Your Storybook will be available at: `https://your-username.github.io/your-repo-name/`
   - Note: If your repo is private, you need GitHub Pro/Team for private Pages

---

## Quick Comparison

| Platform | Free Tier | Ease of Setup | Auto-deploy | Custom Domain |
|----------|-----------|---------------|-------------|---------------|
| **Chromatic** | ✅ Yes | ⭐⭐⭐⭐⭐ | ✅ Yes | ✅ Yes |
| **Netlify** | ✅ Yes | ⭐⭐⭐⭐ | ✅ Yes | ✅ Yes |
| **Vercel** | ✅ Yes | ⭐⭐⭐⭐ | ✅ Yes | ✅ Yes |
| **GitHub Pages** | ✅ Yes | ⭐⭐⭐ | ✅ Yes | ✅ Yes |

---

## Recommendation

**For Storybook specifically**: Use **Chromatic** - it's built for Storybook and includes visual testing features.

**For general hosting**: Use **Netlify** or **Vercel** - both are excellent and have great free tiers.

---

## Troubleshooting

### Build fails with memory issues:
- The build script already includes `NODE_OPTIONS=--max-old-space-size=4096`
- If issues persist, try: `NODE_OPTIONS=--max-old-space-size=8192`

### Storybook not loading:
- Check that the `storybook-static` folder is being published correctly
- Verify all static assets are included in the build

### Routing issues:
- Make sure SPA routing is configured (all platforms have this set up)
- Check that `index.html` is served for all routes

