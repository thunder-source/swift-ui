# Thunder-UI Testing Guide

Quick reference for testing Thunder-UI package locally before publishing.

## Quick Start

### 1. Build the Package
```bash
pnpm run build
```

### 2. Validate the Build
```bash
pnpm run validate
```
This runs automated checks on:
- File existence and sizes
- Bundle sizes
- Type declarations
- Source maps
- Package.json metadata

### 3. Test in Consumer App
```bash
pnpm run test:consumer
```
This will:
- Install dependencies in test-consumer-app
- Start the development server
- Open http://localhost:3000 to test components

### 4. Create Test Package
```bash
pnpm run pack:test
```
This creates a `.tgz` file you can install in other projects.

---

## Manual Testing Steps

### Test Package Installation
```bash
# Create package
npm pack

# In another project
npm install /path/to/@thunder-source-thunder-ui-X.X.X.tgz
```

### Test TypeScript Types
```typescript
import { Button, InputField, Card } from '@thunder-source/thunder-ui';
import '@thunder-source/thunder-ui/styles';

// IntelliSense should work
// "Go to Definition" should navigate to source files
```

### Test Component Rendering
```tsx
function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <InputField label="Email" type="email" />
      <Card>Content here</Card>
    </div>
  );
}
```

---

## Common Issues

### Issue: Styles not applied
**Check:**
- CSS file imported: `import '@thunder-source/thunder-ui/styles'`
- Tailwind config includes Thunder-UI dist folder
- `dist/styles.css` exists and has content

### Issue: TypeScript errors
**Check:**
- `.d.ts` files exist in `dist/`
- `types` field in package.json is correct
- Try restarting TypeScript server

### Issue: "Go to Definition" doesn't work
**Check:**
- `.d.ts.map` files exist in `dist/`
- `declarationMap: true` in tsconfig
- Your IDE supports declaration maps

### Issue: Components not found
**Check:**
- Build completed successfully
- `dist/` folder exists with files
- `exports` field in package.json is correct

---

## Validation Checklist

Before publishing, ensure:

- [ ] `pnpm run build` succeeds
- [ ] `pnpm run validate` passes
- [ ] `pnpm run lint` passes
- [ ] Test consumer app works
- [ ] TypeScript types work
- [ ] "Go to Definition" works
- [ ] All components render correctly
- [ ] Styles are applied
- [ ] No console errors

---

## CI/CD Notes

If you have CI/CD set up, ensure:
- All tests pass on CI
- Build succeeds on target Node versions
- Linting passes
- Type checking passes

---

## Release Workflow

1. **Update version**: `npm version patch|minor|major`
2. **Build**: `pnpm run build`
3. **Validate**: `pnpm run validate`
4. **Test**: `pnpm run test:consumer`
5. **Create tag**: `git tag vX.X.X`
6. **Push**: `git push && git push --tags`
7. **Publish**: `npm publish`

---

## Helpful Commands

```bash
# Full pre-publish workflow
pnpm run clean && pnpm run build && pnpm run validate

# Test package locally
pnpm run pack:test

# Build and test consumer app
cd test-consumer-app && npm install && npm run build

# Check package contents before publishing
npm pack --dry-run

# Publish (after all tests pass)
npm publish
```

---

## Need Help?

- Check `PRE_RELEASE_CHECKLIST.md` for detailed steps
- Review `test-consumer-app/README.md` for test app setup
- See `walkthrough.md` for implementation details
