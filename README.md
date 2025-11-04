# @hrms/components

A production-ready React component library for HRMS applications built with TypeScript, Tailwind CSS, and Radix UI.

## Features

- 🎨 **Modern UI Components** - Beautiful, accessible components built on Radix UI primitives
- 🎯 **TypeScript Support** - Fully typed components with excellent TypeScript support  
- 🎨 **Tailwind CSS** - Styled with Tailwind CSS for easy customization
- 📦 **Tree-shakeable** - ESM and CommonJS support for optimal bundle sizes
- 🎭 **Storybook Integration** - Interactive component documentation and testing
- ♿ **Accessible** - Built on Radix UI primitives for ARIA compliance
- 🔧 **Fully Configurable** - Highly customizable with props and variants

## Installation

\`\`\`bash
npm install @hrms/components
# or
yarn add @hrms/components
# or
pnpm add @hrms/components
\`\`\`

### Peer Dependencies

This package requires the following peer dependencies:

\`\`\`bash
npm install react react-dom
\`\`\`

## Usage

\`\`\`tsx
import { Button, Card, Input } from '@hrms/components';
import '@hrms/components/styles';

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
\`\`\`

## Importing Styles

Import the component styles in your root file (e.g., `main.tsx` or `App.tsx`):

\`\`\`tsx
import '@hrms/components/styles';
\`\`\`

## Tailwind CSS Setup

This package uses Tailwind CSS. Make sure you have Tailwind configured in your project. You may need to add the following to your `tailwind.config.js`:

\`\`\`js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@hrms/components/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
};
\`\`\`

## Component Categories

### Base Components
- `AnnouncementCard` - Display announcements
- `AvatarUploadImage` - Avatar with upload functionality
- `InputField` - Custom input component
- `SelectInput` - Select dropdown component
- `Notification` - Notification component
- And more...

### UI Components
- `Button` - Button with multiple variants
- `Card` - Card container
- `Input` - Text input
- `Dialog` - Modal dialog
- `Dropdown` - Dropdown menu
- `Table` - Data table
- And more...

### Custom Components
- `Header` - Application header
- `Sidebar` - Navigation sidebar
- `FormModal` - Form in modal
- `DataTable` - Advanced data table
- And more...

## Development

### Build

\`\`\`bash
npm run build
\`\`\`

### Storybook

\`\`\`bash
npm run storybook
\`\`\`

### Lint

\`\`\`bash
npm run lint
\`\`\`

## License

MIT
