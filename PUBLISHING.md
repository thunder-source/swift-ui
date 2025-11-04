# Publishing Guide

## Pre-Publishing Checklist

- [ ] Update version number in package.json
- [ ] Run `npm run build` and verify no errors
- [ ] Run `npm run lint` and fix any issues
- [ ] Test components in Storybook
- [ ] Update CHANGELOG.md (if applicable)
- [ ] Verify all exports work correctly
- [ ] Check that .npmignore is properly configured

## Version Management

Update the version in package.json following semantic versioning:

- Major (1.0.0): Breaking changes
- Minor (0.1.0): New features, backwards compatible
- Patch (0.0.1): Bug fixes, backwards compatible

## Build and Publish Steps

### 1. Install Dependencies

```bash
cd components-package
npm install
```

### 2. Build the Package

```bash
npm run build
```

Verify that the dist/ folder contains:
- index.js (CommonJS bundle)
- index.esm.js (ESM bundle)
- index.d.ts (TypeScript definitions)
- styles.css (Compiled CSS)

### 3. Test Locally (Optional)

Link the package locally to test before publishing:

```bash
npm link
cd ../your-test-app
npm link @hrms/components
```

Unlink when done:

```bash
cd your-test-app
npm unlink @hrms/components
cd ../components-package
npm unlink
```

### 4. Publish to npm

#### First Time Publishing

```bash
npm publish --access public
```

#### Subsequent Publishes

```bash
npm publish
```

### 5. Verify Publication

Visit npm registry to confirm your package:
- https://www.npmjs.com/package/@hrms/components

## Environment Variables

If publishing to a private registry or scoped package, ensure you're logged in:

```bash
npm login
```

## Troubleshooting

### Build Errors

If build fails:
1. Check all dependencies are installed
2. Verify TypeScript configuration
3. Check for circular dependencies
4. Ensure all imports are resolvable

### Publishing Errors

Common issues:
- 403 Forbidden: Not logged in or insufficient permissions
- 404 Not Found: Package name/scope issues
- Version exists: Version already published, bump version

### Dependency Issues

If peer dependencies cause issues:
1. Verify peer dependency versions are compatible
2. Check that consuming apps have required dependencies
3. Consider adjusting peer dependency ranges

## Post-Publish

After successful publish:
1. Tag the git commit with the version
2. Create a GitHub release
3. Update documentation for new features
4. Notify team/stakeholders