# Package Information

## Package Structure

\`\`\`
components-package/
├── src/                    # Source files
│   ├── components/         # All component files
│   │   ├── base/          # Base application components
│   │   ├── ui/            # UI primitives (buttons, cards, etc.)
│   │   ├── custom/        # Custom business components
│   │   ├── layout/        # Layout components
│   │   └── common/        # Common utilities
│   ├── assets/            # Static assets (SVGs)
│   ├── lib/               # Utility functions
│   ├── constants/         # Constants and configuration
│   ├── styles.css         # Global styles
│   └── index.ts           # Main entry point
├── dist/                   # Build output (generated)
├── stories/                # Storybook stories
├── .storybook/             # Storybook configuration
│   ├── main.ts
│   ├── preview.ts
│   ├── manager.ts
│   └── vite.config.ts
├── package.json
├── tsconfig.json
├── rollup.config.js
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── biome.json
├── .npmignore
├── .gitignore
├── README.md
├── USAGE.md
└── PACKAGE_INFO.md
\`\`\`

## Build Process

The package uses Rollup for bundling and supports both ESM and CommonJS formats:

1. **TypeScript Compilation**: Generates `.d.ts` files for type definitions
2. **Bundle Creation**: Rollup creates both ESM (`index.esm.js`) and CommonJS (`index.js`) bundles
3. **CSS Build**: Tailwind CSS compiles to a single `styles.css` file

### Build Commands

- \`npm run build\` - Full build (types + bundle + CSS)
- \`npm run build:types\` - TypeScript declarations only
- \`npm run build:bundle\` - JavaScript bundles only
- \`npm run build:css\` - CSS compilation only

## Publishing

To publish this package to npm:

1. Update version in \`package.json\`
2. Run \`npm run build\` to ensure latest code is built
3. Run \`npm publish\`

## Dependencies

### Peer Dependencies (Required by consuming applications)
- \`react\`: ^18.0.0 || ^19.0.0
- \`react-dom\`: ^18.0.0 || ^19.0.0

### Dependencies (Included in bundle)
- Radix UI primitives
- Tailwind utilities (clsx, tailwind-merge)
- Lucide React icons
- Form libraries (react-hook-form, zod)
- Date utilities (date-fns, react-day-picker)
- Table library (@tanstack/react-table)
- Chart library (recharts)

## Development

### Storybook

Run Storybook for component development and testing:

\`\`\`bash
npm run storybook
\`\`\`

Stories are located in the \`stories/\` directory.

### Linting and Formatting

\`\`\`bash
npm run lint    # Check code quality
npm run format  # Format code
\`\`\`

## Module Exports

The package exports components in the following structure:

\`\`\`tsx
// Main export
import { Button, Card, Input } from '@hrms/components';

// Or from specific categories
import { Button } from '@hrms/components';
import { InputField } from '@hrms/components';
import { AnnouncementCard } from '@hrms/components';

// Import styles
import '@hrms/components/styles';
\`\`\`

## Component Categories

### Base Components (\`src/components/base/\`)
Application-specific components for the HRMS system.

### UI Components (\`src/components/ui/\`)
Reusable UI primitives built on Radix UI.

### Custom Components (\`src/components/custom/\`)
Complex business components combining multiple primitives.

### Layout Components (\`src/components/layout/\`)
Layout and structural components.

## Notes

- All components use TypeScript with strict mode
- Component styles are generated from Tailwind CSS
- The package is tree-shakeable (only imports what you use)
- All components are documented in Storybook
- Path aliases (@/) are configured for clean imports
