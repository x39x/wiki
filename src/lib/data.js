import { loadMarkdown } from "./markdown.js";

// 扫描 wiki/ 下所有 Markdown 文件
const modules = import.meta.glob("../../wiki/**/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
});

const pages = Object.create(null);
const navMap = new Map(); // 分类名 -> { name, pages, groups(Map) }
const tagsMap = new Map(); // tag -> [{ slug, title, path }]

for (const [globPath, raw] of Object.entries(modules)) {
    const page = await loadMarkdown(globPath, raw);
    pages[page.slug] = page;

    // 构建导航：大类（一级目录）-> 子分组（二级目录）-> 页面；更深层压平到子分组
    const segs = page.path.split("/");
    let categoryName;
    let groupName;
    let label;

    if (segs.length === 1) {
        // 直接在 wiki/ 下，归到 others
        categoryName = "others";
        groupName = null;
        label = segs[0];
    } else if (segs.length === 2) {
        // wiki/dir/page.md：大类下的直接页面
        categoryName = segs[0];
        groupName = null;
        label = segs[1];
    } else {
        // wiki/dir/sub/...：归到子分组，label 是子分组之后的相对路径
        categoryName = segs[0];
        groupName = segs[1];
        label = segs.slice(2).join("/");
    }

    let category = navMap.get(categoryName);
    if (!category) {
        category = { name: categoryName, pages: [], groups: new Map() };
        navMap.set(categoryName, category);
    }

    const entry = { slug: page.slug, title: page.title, label };
    if (groupName) {
        let group = category.groups.get(groupName);
        if (!group) {
            group = { name: groupName, pages: [] };
            category.groups.set(groupName, group);
        }
        group.pages.push(entry);
    } else {
        category.pages.push(entry);
    }

    // tags 索引
    for (const tag of page.tags) {
        if (!tagsMap.has(tag)) tagsMap.set(tag, []);
        tagsMap.get(tag).push({ slug: page.slug, title: page.title, path: page.path });
    }
}

const byName = (a, b) => a.name.localeCompare(b.name, "zh-CN");
const byLabel = (a, b) => a.label.localeCompare(b.label, "zh-CN");

// 导航：分类排好序，others 放最后
const nav = [...navMap.values()]
    .map((c) => ({
        name: c.name,
        pages: c.pages.sort(byLabel),
        groups: [...c.groups.values()]
            .map((g) => ({ name: g.name, pages: g.pages.sort(byLabel) }))
            .sort(byName),
    }))
    .sort((a, b) => {
        if (a.name === "others") return 1;
        if (b.name === "others") return -1;
        return byName(a, b);
    });

// tags：todo 放最后
const tags = [...tagsMap.entries()]
    .map(([tag, list]) => ({
        tag,
        pages: list.sort((a, b) => a.path.localeCompare(b.path, "zh-CN")),
    }))
    .sort((a, b) => {
        if (a.tag === "todo") return 1;
        if (b.tag === "todo") return -1;
        return a.tag.localeCompare(b.tag, "zh-CN");
    });

export const getPage = (slug) => pages[slug] ?? null;
export const getAllSlugs = () => Object.keys(pages);
export const getNav = () => nav;
export const getTags = () => tags;
