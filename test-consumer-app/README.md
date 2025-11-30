# Thunder-UI Test Consumer App

This is a simple test application to verify that the `@thunder-source/thunder-ui` package works correctly when installed.

## Purpose

- Test component imports and rendering
- Verify CSS styles are applied correctly
- Validate TypeScript type definitions
- Ensure "Go to Definition" works with declaration maps

## Setup

1. **Build the Thunder-UI library first:**
   ```bash
   cd ..
   pnpm run build
   ```

2. **Install dependencies:**
   ```bash
   cd test-consumer-app
   npm install
   ```

3. **Run the test app:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000`

## What's Tested

### Components
- ✅ Button (default, secondary, destructive variants)
- ✅ InputField (text, email, password types)
- ✅ Card (layout component)

### Features
- ✅ CSS import from `@thunder-source/thunder-ui/styles`
- ✅ Component import from `@thunder-source/thunder-ui`
- ✅ Tailwind CSS integration
- ✅ TypeScript type checking
- ✅ React 19 compatibility

## Verification Checklist

- [ ] All components render without errors
- [ ] Styles are applied correctly (colors, spacing, etc.)
- [ ] TypeScript shows no errors
- [ ] "Go to Definition" navigates to Thunder-UI source files
- [ ] Hot reload works during development
- [ ] Build completes successfully (`npm run build`)

## Expected Behavior

The app should display:
1. A heading "Thunder-UI Test App"
2. Button component section with interactive buttons
3. Input field section with email and password inputs
4. A green success card indicating everything is working

If you see any errors or missing styles, there may be an issue with the Thunder-UI package configuration.

## Troubleshooting

### Components not rendering
- Ensure you built the Thunder-UI library (`pnpm run build` in parent directory)
- Check that `dist/` folder exists with compiled files

### Styles not applied
- Verify `dist/styles.css` exists and has content (>1KB)
- Check Tailwind config includes Thunder-UI dist folder

### TypeScript errors
- Verify `.d.ts` files exist in `dist/`
- Check `node_modules/@thunder-source/thunder-ui` is linked correctly

### "Go to Definition" not working
- Ensure `.d.ts.map` files are generated in `dist/`
- Check that `declarationMap: true` is set in `tsconfig.build.json`
