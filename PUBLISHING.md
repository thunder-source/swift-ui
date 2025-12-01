# Publishing Thunder-UI to NPM

## Version 1.0.12 - TypeScript IntelliSense Fix

### Changes in this version:
- Fixed TypeScript module resolution for consumer apps
- Updated test-consumer-app tsconfig.json
- Created diagnostic tools for type checking

### Publishing Steps:

1. **Build the package:**
   ```bash
   npm run build
   ```

2. **Test the package locally (optional):**
   ```bash
   npm pack
   # This creates thunder-source-thunder-ui-1.0.12.tgz
   ```

3. **Login to NPM (if not already):**
   ```bash
   npm login
   ```

4. **Publish to NPM:**
   ```bash
   npm publish
   ```

### Pre-publish Checklist:
- [x] Version bumped to 1.0.12
- [x] Build scripts fixed (npm instead of pnpm)
- [x] TypeScript types verified
- [x] Test consumer app working

### After Publishing:
Update consumers to use the new version:
```bash
npm install @thunder-source/thunder-ui@1.0.12
```
