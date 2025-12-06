# @thunder-source/thunder-ui

A comprehensive React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

## Installation

```bash
npm install @thunder-source/thunder-ui
# or
pnpm add @thunder-source/thunder-ui
# or
yarn add @thunder-source/thunder-ui
```

## Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom
npm install react-router-dom react-redux  # Required for Header, RootLayout, and Sidebar components
```

## Usage

### Basic Setup

1. **Import the styles** in your main entry file:

```tsx
import "@thunder-source/thunder-ui/styles";
```

2. **Import and use components**:

```tsx
import { Button, Card, Input } from "@thunder-source/thunder-ui";

function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Card>
        <Input placeholder="Enter text..." />
      </Card>
    </div>
  );
}
```

### Tailwind CSS Setup

This library uses Tailwind CSS. Make sure your project has Tailwind configured. You may need to add the library to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@thunder-source/thunder-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of your config
};
```

> **Note**: This library uses JavaScript format for Tailwind configuration (`tailwind.config.js`) for maximum flexibility and compatibility.

### Router Setup (for Header, RootLayout, Sidebar)

If you're using components that require routing (`Header`, `RootLayout`, `Sidebar`), make sure to wrap your app with a router:

```tsx
import { BrowserRouter } from "react-router-dom";
import { RootLayout } from "@thunder-source/thunder-ui";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        {/* Your routes */}
      </RootLayout>
    </BrowserRouter>
  );
}
```

## Components

### UI Components
- Button
- Input
- Card
- Dialog
- Dropdown Menu
- Select
- Calendar
- Table
- Tabs
- Toast
- Tooltip
- And many more...

### Custom Components
- Header
- Sidebar
- Form Components
- Data Tables
- Filters
- And more...

## Documentation

For detailed component documentation and examples, please refer to the [Storybook documentation](https://your-storybook-url.com) (if available).

## TypeScript Support

This package is written in TypeScript and includes type definitions. No additional types package is required.

### Type Safety Features
- Full TypeScript strict mode enabled
- Declaration maps included for "Go to Definition" support
- Comprehensive type definitions for all components

## Bundle Size

The library is optimized for production use:

- **ESM Bundle**: ~2.07 MB (minified)
- **CJS Bundle**: ~2.08 MB (minified)
- **CSS Bundle**: ~113 KB (processed with Tailwind)

> **Note**: The actual bundle size in your application will be smaller due to tree-shaking. Only the components you import will be included in your final bundle.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Have an idea? Check out our [Feature Suggestions & Roadmap](./FEATURE_SUGGESTION.md) to see what's planned or to make a request.

## Development

### Local Development
```bash
# Install dependencies
pnpm install

# Start development mode
pnpm run dev

# Build the library
pnpm run build

# Run linting
pnpm run lint

# Start Storybook
pnpm run storybook
```

### Testing
```bash
# Validate package build
pnpm run validate

# Test in consumer app
pnpm run test:consumer

# Create test package
pnpm run pack:test
```

For detailed testing instructions, see [TESTING.md](./TESTING.md).

### Pre-Release

Before publishing, review the [Pre-Release Checklist](./PRE_RELEASE_CHECKLIST.md) to ensure:
- Build completes successfully
- All tests pass
- TypeScript types work correctly
- Components render in test app
- Package metadata is complete

## Documentation

- **[Testing Guide](./TESTING.md)** - How to test the package locally
- **[Pre-Release Checklist](./PRE_RELEASE_CHECKLIST.md)** - Complete checklist before publishing
- **[Release Notes](./RELEASE_NOTES.md)** - Version history and changes
- **[Test Consumer App](./test-consumer-app/README.md)** - Test application setup

## Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/thunder-source/thunder-ui/issues).

---

> **Built with** ❤️ by Praditya Manjhi

