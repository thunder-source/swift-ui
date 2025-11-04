import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directories = [path.join(__dirname, "../src")];

async function renameFiles(dir) {
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				await renameFiles(fullPath);
			} else if (entry.isFile()) {
				const ext = path.extname(entry.name);
				const basename = path.basename(entry.name, ext);

				// Skip if already starts with lowercase or is a dotfile
				if (/^[a-z]/.test(basename) || basename.startsWith(".")) {
					continue;
				}

				// Convert first character to lowercase
				const newName =
					basename.charAt(0).toLowerCase() + basename.slice(1) + ext;
				const newPath = path.join(dir, newName);

				// Only rename if the new name is different
				if (newName !== entry.name) {
					console.log(`Renaming: ${entry.name} -> ${newName}`);
					await fs.rename(fullPath, newPath);
				}
			}
		}
	} catch (error) {
		console.error(`Error processing directory ${dir}:`, error);
	}
}

async function main() {
	console.log("Starting to rename files to lowercase...");

	for (const dir of directories) {
		console.log(`\nProcessing directory: ${dir}`);
		await renameFiles(dir);
	}

	console.log("\nFile renaming completed!");
}

main().catch(console.error);
