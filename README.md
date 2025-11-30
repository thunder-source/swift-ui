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

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on the GitHub repository.

> **Note**: Update the repository URL in `package.json` with your actual GitHub repository URL.

