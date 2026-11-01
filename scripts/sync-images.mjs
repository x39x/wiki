#!/usr/bin/env node
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const docDir = join(root, "wiki");
const outputDir = join(root, "public", "images");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

function collectImages(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        if (entry.name.startsWith(".")) return [];

        const path = join(directory, entry.name);
        if (entry.isDirectory()) return collectImages(path);
        if (imageExtensions.has(entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase())) {
            return [path];
        }
        return [];
    });
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

for (const source of collectImages(docDir)) {
    const parts = relative(docDir, source)
        .split(sep)
        .filter((part) => part !== "img");
    const targetName = ["wiki", ...parts].join("-");
    copyFileSync(source, join(outputDir, targetName));
    console.log(`${relative(root, source)} -> public/images/${targetName}`);
}
