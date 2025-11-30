# Thunder-UI Release Notes

## Version 1.0.11 (Unreleased)

### ✨ Features & Improvements

#### Package Infrastructure
- **Source Map Optimization**: Implemented environment-based source maps
  - Development builds use full source maps for debugging
  - Production builds use hidden source maps (smaller bundles, private source code)
  - Reduces production bundle references while maintaining debugging capability

#### Testing & Validation
- **Test Consumer App**: Added complete test application in `test-consumer-app/`
  - Vite + React 19 + TypeScript setup
  - Tests Button, InputField, and Card components
  - Validates CSS imports, TypeScript types, and declaration maps
  - Comprehensive README with setup instructions
  
- **Package Validation Script**: Added `scripts/validate-package.js`
  - Automated pre-publish validation
  - Checks bundle sizes, file existence, and configuration
  - Run with `pnpm run validate`

#### Documentation
- **Enhanced README**: Added comprehensive documentation
  - Bundle size information (ESM: ~2.07 MB, CJS: ~2.08 MB, CSS: ~113 KB)
  - TypeScript type safety features
  - Tailwind CSS configuration notes
  
- **Testing Guides**: Added testing documentation
  - `TESTING.md`: Quick testing reference
  - `PRE_RELEASE_CHECKLIST.md`: Comprehensive pre-release checklist
  - Test consumer app documentation

#### Package Metadata
- Added `bugs` URL: `https://github.com/thunder-source/thunder-ui/issues`
- Added `homepage` URL: `https://github.com/thunder-source/thunder-ui#readme`
- Improved package discoverability on npm

### 🔧 Technical Details

#### Build Configuration
- Updated `rollup.config.js` with environment-based source map configuration
- Modified `package.json` build script to set `NODE_ENV=production`
- Added `.npmignore` entry for test-consumer-app

#### Code Quality
- TypeScript strict mode: ✅ Enabled and verified
- Declaration maps: ✅ 81 files generated for IDE "Go to Definition"
- Form validation: ✅ Comprehensive (7 validation types)

#### NPM Scripts Added
- `validate`: Run package validation checks
- `test:consumer`: Start test consumer app
- `pack:test`: Create test package

### 📦 Bundle Information

| Bundle | Size | Format |
|--------|------|--------|
| ESM | ~2.07 MB | Minified |
| CJS | ~2.08 MB | Minified |
| CSS | ~113 KB | Processed |

> **Note**: Actual bundle size in applications will be smaller due to tree-shaking.

### 🎯 Form Validation

Supports comprehensive validation types:
- ✅ required
- ✅ email
- ✅ phone
- ✅ minLength
- ✅ maxLength
- ✅ pattern (regex)
- ✅ custom (validator function)

### 🔍 Verification

All critical issues resolved:
- ✅ Type declaration maps generated
- ✅ Package metadata complete
- ✅ Documentation comprehensive
- ✅ Form validation verified
- ✅ Source maps optimized
- ✅ Test infrastructure complete
- ✅ Build process validated

### 📚 Migration Guide

No breaking changes in this release. All updates are additive.

**For consumers upgrading from 1.0.10:**
1. Rebuild your project
2. No code changes needed
3. TypeScript "Go to Definition" may now work better with declaration maps

### 🙏 Thanks

Thanks to all contributors and users of Thunder-UI!

---

## Previous Versions

### Version 1.0.10 and earlier
See git history for changes.

---

**Release Date**: TBD  
**Released By**: TBD
