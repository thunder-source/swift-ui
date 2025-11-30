# Pre-Release Testing Checklist

Complete this checklist before publishing Thunder-UI to npm.

## Build Verification

### Clean Build
- [ ] Run `pnpm run clean`
- [ ] Run `pnpm run build`
- [ ] Verify no build errors in console
- [ ] Check build completed successfully

### Package Validation
- [ ] Run `node scripts/validate-package.js`
- [ ] All validation checks pass ✅
- [ ] Review any warnings and address if needed
- [ ] Verify dist/ folder structure is correct

### File Checks
- [ ] `dist/styles.css` exists and has content (>100KB)
- [ ] `dist/index.js` exists (CJS bundle)
- [ ] `dist/index.esm.js` exists (ESM bundle)
- [ ] `dist/index.d.ts` exists (TypeScript declarations)
- [ ] `.d.ts.map` files generated (for "Go to Definition")
- [ ] `.js.map` source map files generated
- [ ] No unwanted files in dist/ (PDFs, test files, etc.)

### Bundle Size Verification
- [ ] ESM bundle < 2.5 MB _(current: ~2.07 MB)_
- [ ] CJS bundle < 2.5 MB _(current: ~2.08 MB)_
- [ ] CSS bundle ~100-120 KB _(current: ~113 KB)_
- [ ] Source maps are hidden in production build

---

## Package Testing

### Create Test Package
```bash
npm pack
# Creates @thunder-source-thunder-ui-1.0.11.tgz or similar
```

- [ ] `.tgz` file created successfully
- [ ] Review `.tgz` file size (should be reasonable)

### Test in Consumer App
```bash
cd test-consumer-app
npm install
npm install ../@thunder-source-thunder-ui-1.0.11.tgz
npm run dev
```

- [ ] Installation successful (no errors)
- [ ] Dependencies resolved correctly
- [ ] App starts without errors
- [ ] Navigate to http://localhost:3000

### Component Testing
- [ ] **Button components render** correctly
  - [ ] Default variant works
  - [ ] Secondary variant works
  - [ ] Destructive variant works
  - [ ] Disabled state works
  - [ ] Click handlers work
- [ ] **Input components render** correctly
  - [ ] Email input with validation
  - [ ] Password input with toggle
  - [ ] Input values update correctly
- [ ] **Card component** renders correctly
- [ ] All components have proper styles applied
- [ ] No console errors or warnings

### TypeScript Validation
- [ ] Open test-consumer-app in VS Code
- [ ] No TypeScript errors in editor
- [ ] IntelliSense works for Thunder-UI components
- [ ] **"Go to Definition"** navigates to source files (not .d.ts)
- [ ] Type checking passes: `npx tsc --noEmit`

### CSS/Styles Verification
- [ ] Import `@thunder-source/thunder-ui/styles` works
- [ ] Tailwind classes are applied correctly
- [ ] Component styles match expected design
- [ ] No style conflicts or missing styles
- [ ] Responsive design works (test different screen sizes)

### Build Test Consumer App
```bash
cd test-consumer-app
npm run build
npm run preview
```

- [ ] Production build succeeds
- [ ] Preview server runs correctly
- [ ] Components work in production build
- [ ] Styles applied in production build

---

## Code Quality

### Linting
```bash
pnpm run lint
```

- [ ] No linting errors
- [ ] All lint warnings reviewed and acceptable
- [ ] Code style is consistent

### Type Checking
```bash
pnpm run build:types
```

- [ ] TypeScript compilation succeeds
- [ ] No type errors
- [ ] Declaration files generated correctly

---

## Documentation

### Storybook
```bash
pnpm run build-storybook
```

- [ ] Storybook build succeeds
- [ ] No build errors or warnings
- [ ] Check storybook-static/ folder created
- [ ] Preview built Storybook (optional)

### README Review
- [ ] Installation instructions are accurate
- [ ] Usage examples are up-to-date
- [ ] All code examples are correct
- [ ] Links work correctly
- [ ] Bundle size information is current
- [ ] TypeScript features documented

### CHANGELOG (if exists)
- [ ] Create/update CHANGELOG.md
- [ ] Document all changes in this version
- [ ] Include breaking changes (if any)
- [ ] Include migration guide (if needed)

---

## Git Status

### Repository Cleanliness
```bash
git status
```

- [ ] All changes are committed
- [ ] No untracked files (except expected ignores)
- [ ] Working directory is clean
- [ ] No debug or temporary files

### Git Operations
- [ ] Latest changes pushed to remote
- [ ] Branch is up-to-date with main/master
- [ ] All tests pass on CI/CD (if configured)

---

## Final Checks

### Package.json Verification
- [ ] Version number is correct and follows semver
- [ ] All metadata fields are complete:
  - [ ] name
  - [ ] version
  - [ ] description
  - [ ] author
  - [ ] license
  - [ ] repository
  - [ ] bugs
  - [ ] homepage
  - [ ] keywords
- [ ] Dependencies are correct
- [ ] Peer dependencies are appropriate
- [ ] Scripts are functional

### NPM Publishing Preparation
- [ ] Logged into npm: `npm whoami`
- [ ] Have publishing rights to @thunder-source scope
- [ ] 2FA is enabled on npm account (recommended)
- [ ] Ready to publish

### Create Release Tag
```bash
git tag v1.0.11
git push origin v1.0.11
```

- [ ] Git tag created with version number
- [ ] Tag pushed to remote repository
- [ ] Tag follows naming convention (v + version)

---

## Publishing

### Dry Run (Recommended)
```bash
npm publish --dry-run
```

- [ ] Dry run completes successfully
- [ ] Review which files will be published
- [ ] Verify package size is reasonable
- [ ] No sensitive files included

### Publish to NPM
```bash
npm publish
```

- [ ] Package published successfully
- [ ] Verify on npmjs.com: https://www.npmjs.com/package/@thunder-source/thunder-ui
- [ ] Version number is correct on npm
- [ ] Files list is correct
- [ ] Can install from npm: `npm install @thunder-source/thunder-ui`

---

## Post-Publication

### Verification
- [ ] Install from npm in a fresh project
- [ ] Test basic component usage
- [ ] Verify TypeScript types work
- [ ] Check styles import correctly

### Documentation Updates
- [ ] Update GitHub README if needed
- [ ] Create GitHub release with changelog
- [ ] Update project documentation
- [ ] Announce release (if applicable)

### Cleanup
- [ ] Remove local `.tgz` test files
- [ ] Archive or delete test installations
- [ ] Update version number for next release (if starting new work)

---

## Notes

**Current Version:** 1.0.11  
**Release Date:** _____________  
**Released By:** _____________

### Issues Encountered:
_Document any issues found during testing and how they were resolved_

### Next Version Planning:
_Notes for what to include in the next release_

---

**Status:** 
- [ ] ✅ Ready for Publication
- [ ] ⚠️ Ready with Minor Issues
- [ ] ❌ Not Ready - Issues Found

**Final Sign-off:** _____________
