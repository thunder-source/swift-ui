const fs = require('fs');
const path = require('path');

console.log('🔍 Checking TypeScript Type Definitions...\n');

// Check if dist exists
const distExists = fs.existsSync(path.join(__dirname, '../dist'));
console.log(`✓ dist/ directory exists: ${distExists}`);

if (!distExists) {
  console.log('❌ dist/ directory not found. Run: npm run build');
  process.exit(1);
}

// Check main index.d.ts
const mainTypes = path.join(__dirname, '../dist/index.d.ts');
const mainTypesExists = fs.existsSync(mainTypes);
console.log(`✓ dist/index.d.ts exists: ${mainTypesExists}`);

if (mainTypesExists) {
  const content = fs.readFileSync(mainTypes, 'utf8');
  console.log(`\nContent of dist/index.d.ts:\n${content}\n`);
}

// Check Button component types
const buttonTypes = path.join(__dirname, '../dist/components/ui/button/button.d.ts');
const buttonTypesExists = fs.existsSync(buttonTypes);
console.log(`✓ dist/components/ui/button/button.d.ts exists: ${buttonTypesExists}`);

if (buttonTypesExists) {
  const content = fs.readFileSync(buttonTypes, 'utf8');
  console.log(`\nButton type definition (first 500 chars):\n${content.substring(0, 500)}...\n`);
  
  // Check for ButtonProps export
  const hasButtonProps = content.includes('ButtonProps');
  const hasButtonExport = content.includes('export') && content.includes('Button');
  
  console.log(`✓ Has ButtonProps type: ${hasButtonProps}`);
  console.log(`✓ Has Button export: ${hasButtonExport}`);
}

// Check package.json exports
const pkg = require('../package.json');
console.log('\npackage.json type exports:');
console.log(`✓ "types" field: ${pkg.types}`);
console.log(`✓ "exports['.'].types": ${pkg.exports?.['.']?.types}`);

console.log('\n✅ Type definition check complete!');
console.log('\n💡 If VS Code still shows no suggestions:');
console.log('   1. Press Ctrl+Shift+P (or Cmd+Shift+P on Mac)');
console.log('   2. Run "TypeScript: Restart TS Server"');
console.log('   3. Or run "Developer: Reload Window"');
console.log('   4. In test-consumer-app, run: npm install (to refresh symlink)');
