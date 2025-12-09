import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generatePost(id) {
    return {
        id,
        title_et: "",
        content_et: "",
        image: ""
    };
}

const outputDir = path.join(process.cwd(), "public", "blog");

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
} else {
    // Clear existing files
    const files = fs.readdirSync(outputDir);
    for (const file of files) {
        fs.unlinkSync(path.join(outputDir, file));
    }
}

// Generate 50 empty individual files: 1.json, 2.json, ..., 50.json
for (let i = 1; i <= 50; i++) {
    const post = generatePost(i);
    fs.writeFileSync(
        path.join(outputDir, `${i}.json`),
        JSON.stringify(post, null, 2)
    );
}

console.log("50 empty blog JSON templates generated in public/blog/!");
