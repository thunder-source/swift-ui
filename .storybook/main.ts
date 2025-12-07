import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	 framework: '@storybook/react-vite',
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-docs",
	],
	typescript: {
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},
	viteFinal: async (config) => {
		// Handle circular dependencies and optimize imports
		config.optimizeDeps = config.optimizeDeps || {};
		config.optimizeDeps.include = [
			"react",
			"react-dom",
			"@radix-ui/react-slot",
			"@radix-ui/react-dialog",
			"@radix-ui/react-dropdown-menu",
			"@radix-ui/react-label",
			"@radix-ui/react-popover",
			"@radix-ui/react-select",
			"@radix-ui/react-separator",
			"@radix-ui/react-slider",
			"@radix-ui/react-switch",
			"@radix-ui/react-tabs",
			"@radix-ui/react-tooltip",
			"@radix-ui/react-checkbox",
			"@radix-ui/react-slot",
		];
		config.optimizeDeps.exclude = [
			...(config.optimizeDeps.exclude || []),
			"lucide-react",
			"@radix-ui/react-slot",
			"semver", // Exclude semver to avoid default export issues
		];

		// Add build configuration
		config.build = {
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ["react", "react-dom", "@radix-ui/react-slot"],
						ui: [
							"@radix-ui/react-dialog",
							"@radix-ui/react-dropdown-menu",
							"@radix-ui/react-label",
						],
					},
				},
			},
		};

		return config;
	},
};
export default config;
