#!/usr/bin/env node

/**
 * Package validation script for Thunder-UI
 * Validates the built package before publishing
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PACKAGE_JSON = path.join(__dirname, '..', 'package.json');

console.log('🔍 Thunder-UI Package Validation\n');

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function checkPassed(message) {
  checks.passed.push(message);
  console.log(`✅ ${message}`);
}

function checkFailed(message) {
  checks.failed.push(message);
  console.error(`❌ ${message}`);
}

function checkWarning(message) {
  checks.warnings.push(message);
  console.warn(`⚠️  ${message}`);
}

// Check 1: dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  checkFailed('dist/ directory not found. Run `npm run build` first.');
  process.exit(1);
} else {
  checkPassed('dist/ directory exists');
}

// Check 2: Essential files exist
const essentialFiles = [
  'index.js',
  'index.esm.js',
  'index.d.ts',
  'styles.css'
];

essentialFiles.forEach(file => {
  const filePath = path.join(DIST_DIR, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    checkPassed(`${file} exists (${(stats.size / 1024).toFixed(2)} KB)`);
  } else {
    checkFailed(`${file} is missing`);
  }
});

// Check 3: CSS file has content
const cssPath = path.join(DIST_DIR, 'styles.css');
if (fs.existsSync(cssPath)) {
  const cssSize = fs.statSync(cssPath).size;
  if (cssSize > 1024) { // More than 1KB
    checkPassed(`styles.css has content (${(cssSize / 1024).toFixed(2)} KB)`);
  } else {
    checkFailed('styles.css is too small or empty');
  }
}

// Check 4: Type declaration maps
const dtsMapFiles = fs.readdirSync(DIST_DIR).filter(f => f.endsWith('.d.ts.map'));
if (dtsMapFiles.length > 0) {
  checkPassed(`Found ${dtsMapFiles.length} declaration map files (.d.ts.map)`);
} else {
  checkWarning('No declaration map files found. TypeScript "Go to Definition" may not work.');
}

// Check 5: Source maps exist
const sourceMapFiles = fs.readdirSync(DIST_DIR).filter(f => f.endsWith('.js.map'));
if (sourceMapFiles.length >= 2) {
  checkPassed(`Found ${sourceMapFiles.length} source map files`);
} else {
  checkWarning('Source map files missing or incomplete');
}

// Check 6: Bundle sizes
const bundleSizes = {
  'index.js': { path: path.join(DIST_DIR, 'index.js'), maxSize: 2.5 * 1024 * 1024 }, // 2.5MB
  'index.esm.js': { path: path.join(DIST_DIR, 'index.esm.js'), maxSize: 2.5 * 1024 * 1024 }
};

Object.entries(bundleSizes).forEach(([name, config]) => {
  if (fs.existsSync(config.path)) {
    const size = fs.statSync(config.path).size;
    const sizeMB = (size / 1024 / 1024).toFixed(2);
    
    if (size < config.maxSize) {
      checkPassed(`${name} size is acceptable (${sizeMB} MB)`);
    } else {
      checkWarning(`${name} is larger than expected (${sizeMB} MB)`);
    }
  }
});

// Check 7: No unwanted files in dist
const unwantedFiles = [
  'evisapdf.pdf',
  'iframe.html',
  'vite.svg',
  'vite-inject-mocker-entry.js'
];

unwantedFiles.forEach(file => {
  const filePath = path.join(DIST_DIR, file);
  if (fs.existsSync(filePath)) {
    checkFailed(`Unwanted file found in dist/: ${file}`);
  }
});

checkPassed('No unwanted files in dist/');

// Check 8: Package.json validation
if (fs.existsSync(PACKAGE_JSON)) {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  
  // Check required fields
  const requiredFields = ['name', 'version', 'main', 'module', 'types', 'exports'];
  requiredFields.forEach(field => {
    if (pkg[field]) {
      checkPassed(`package.json has ${field} field`);
    } else {
      checkFailed(`package.json missing ${field} field`);
    }
  });
  
  // Check metadata
  if (pkg.repository && pkg.repository.url) {
    checkPassed('package.json has repository URL');
  } else {
    checkWarning('package.json missing repository URL');
  }
  
  if (pkg.bugs && pkg.bugs.url) {
    checkPassed('package.json has bugs URL');
  } else {
    checkWarning('package.json missing bugs URL');
  }
  
  if (pkg.homepage) {
    checkPassed('package.json has homepage');
  } else {
    checkWarning('package.json missing homepage');
  }
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Validation Summary:');
console.log('='.repeat(50));
console.log(`✅ Passed: ${checks.passed.length}`);
console.log(`⚠️  Warnings: ${checks.warnings.length}`);
console.log(`❌ Failed: ${checks.failed.length}`);

if (checks.failed.length > 0) {
  console.log('\n❌ Package validation FAILED');
  console.log('Please fix the issues above before publishing.');
  process.exit(1);
} else if (checks.warnings.length > 0) {
  console.log('\n⚠️  Package validation passed with WARNINGS');
  console.log('Review the warnings above before publishing.');
  process.exit(0);
} else {
  console.log('\n✅ Package validation PASSED');
  console.log('Package is ready for publishing!');
  process.exit(0);
}
