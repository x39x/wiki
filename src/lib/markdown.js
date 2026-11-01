import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { parse as parseYaml } from "yaml";

const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    //保留 markdown 里的yaml
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkMath)
    // 解析markdown
    .use(readFrontmatter)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeKatex, { strict: false })
    .use(rehypePrettyCode, {
        theme: { dark: "github-dark", light: "github-light" },
        keepBackground: false,
    })
    .use(addPageFeatures)
    .use(rehypeStringify);

function readFrontmatter() {
    return (tree, file) => {
        const yaml = tree.children.find((node) => node.type === "yaml");
        const metadata = yaml ? parseYaml(yaml.value) : {};
        if (metadata != null && (typeof metadata !== "object" || Array.isArray(metadata))) {
            throw new Error(`Invalid YAML frontmatter in ${file.path}: expected a mapping`);
        }

        file.data.metadata = metadata ?? {};
        if (yaml) tree.children.splice(tree.children.indexOf(yaml), 1);

        const titleHeading = tree.children.find(
            (node) => node.type === "heading" && node.depth === 1,
        );
        file.data.title = file.data.metadata.title || (titleHeading && textContent(titleHeading));
        if (titleHeading) tree.children.splice(tree.children.indexOf(titleHeading), 1);
    };
}

function addPageFeatures() {
    return (tree, file) => {
        const headings = [];
        let hasMath = false;
        const relDir = relativeDirectory(file.path);

        const visit = (parent) => {
            parent.children = (parent.children ?? []).map((node) => {
                if (node.type === "element") {
                    if (node.tagName === "img") rewriteImage(node, relDir);
                    if (node.tagName === "span" && node.properties?.className?.includes("katex"))
                        hasMath = true;
                    if (/^h[2-3]$/.test(node.tagName)) {
                        headings.push({
                            id: node.properties.id,
                            text: textContent(node),
                            depth: Number(node.tagName.slice(1)),
                        });
                    }
                }

                if (node.tagName === "pre") {
                    return {
                        type: "element",
                        tagName: "div",
                        properties: { className: ["code-block"] },
                        children: [node, copyButton()],
                    };
                }

                visit(node);
                return node;
            });
        };

        visit(tree);
        file.data.toc = renderToc(headings);
        file.data.hasMath = hasMath;
    };
}

function rewriteImage(image, relDir) {
    const src = image.properties?.src;
    if (
        typeof src !== "string" ||
        !src ||
        src.startsWith("/") ||
        /^[a-z][a-z\d+.-]*:/i.test(src) ||
        src.startsWith("//")
    ) {
        return;
    }

    const path = [...relDir.split("/").filter(Boolean)];
    for (const part of src.split("/")) {
        if (!part || part === ".") continue;
        if (part === "..") path.pop();
        else path.push(part);
    }

    image.properties.src = `/images/${["wiki", ...path.filter((part) => part !== "img")].join("-")}`;
}

function copyButton() {
    return {
        type: "element",
        tagName: "button",
        properties: {
            type: "button",
            className: ["copy-code"],
            "data-copy-code": true,
            "aria-label": "Copy code",
            title: "Copy code",
        },
        children: [],
    };
}

function renderToc(headings) {
    if (!headings.length) return "";
    const links = headings
        .map(
            ({ id, text, depth }) =>
                `<li class="toc-level-${depth}"><a href="#${escapeHtml(String(id ?? ""))}">${escapeHtml(text)}</a></li>`,
        )
        .join("");
    return `<nav aria-label="目录"><ul>${links}</ul></nav>`;
}

function textContent(node) {
    if (node.type === "text") return node.value;
    return (node.children ?? []).map(textContent).join("");
}

function relativeDirectory(path) {
    return path
        .replace(/^.*?wiki\//, "")
        .replace(/\.md$/, "")
        .split("/")
        .slice(0, -1)
        .join("/");
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function normalizeTags(tags) {
    const values = Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",") : [];
    return [
        ...new Set(
            values
                .map(String)
                .map((tag) => tag.trim())
                .filter(Boolean),
        ),
    ];
}

export async function loadMarkdown(path, source) {
    const file = await processor.process({ value: source, path });
    const metadata = file.data.metadata;
    const relativePath = path.replace(/^.*?wiki\//, "").replace(/\.md$/, "");

    return {
        slug: relativePath.replaceAll("/", "-"),
        path: relativePath,
        title: metadata.title || file.data.title || relativePath.split("/").at(-1),
        html: String(file),
        toc: file.data.toc,
        hasMath: file.data.hasMath,
        tags: normalizeTags(metadata.tags),
    };
}
