import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { unzipSync, zipSync } from "fflate";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
let html = await readFile(join(dist, "index.html"), "utf8");

async function inlineMatches(pattern, replace) {
  const matches = [...html.matchAll(pattern)];
  for (const match of matches)
    html = html.replace(match[0], () => replace(match));
}

// Load the build assets first, then substitute them without interpreting dollar signs.
const assets = {};
for (const match of html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+)"/g)) {
  assets[match[1]] = await readFile(resolve(dist, match[1]), "utf8");
}
await inlineMatches(
  /<script\b[^>]*\bsrc="(\.\/assets\/[^"]+\.js)"[^>]*><\/script>/g,
  (match) =>
    `<script type="module">${assets[match[1]].replace(/<\/script/gi, "<\\/script")}</script>`,
);
await inlineMatches(
  /<link\b[^>]*\bhref="(\.\/assets\/[^"]+\.css)"[^>]*>/g,
  (match) =>
    `<style>${assets[match[1]].replace(/<\/style/gi, "<\\/style")}</style>`,
);
const favicon = await readFile(join(root, "public/assets/favicon.svg"));
html = html.replace(
  /href="(?:\.\/)?assets\/favicon\.svg"/g,
  () => `href="data:image/svg+xml;base64,${favicon.toString("base64")}"`,
);
if (/<(?:script|link)\b[^>]*(?:src|href)="\.\/assets\//.test(html)) {
  throw new Error("Standalone HTML still references a build asset");
}
await writeFile(join(root, "Ratatune.html"), html);

const includes = [
  "src",
  "public",
  "scripts",
  "tests",
  "dist",
  "package.json",
  "package-lock.json",
  "vite.config.js",
  "playwright.config.js",
  "index.html",
  ".gitignore",
  "README.md",
  "Submission notes.md",
  "Ratatune.html",
  "Desktop.png",
  "Mobile.png",
  "Early access form.png",
  "Preview.png",
  "Interaction.png",
  "Mobile interaction.png",
];
const entries = {};
async function collect(path) {
  const absolute = join(root, path);
  const info = await stat(absolute);
  if (info.isDirectory()) {
    for (const name of await readdir(absolute)) await collect(join(path, name));
  } else {
    entries["Ratatune/" + relative(root, absolute).split("\\").join("/")] =
      new Uint8Array(await readFile(absolute));
  }
}
for (const path of includes) await collect(path);
const zip = zipSync(entries, { level: 9 });
const unpacked = unzipSync(zip);
if (Object.keys(entries).length !== Object.keys(unpacked).length)
  throw new Error("ZIP verification failed");
for (const [name, bytes] of Object.entries(entries)) {
  if (!Buffer.from(unpacked[name]).equals(Buffer.from(bytes)))
    throw new Error("ZIP content mismatch: " + name);
}
await writeFile(join(root, "Ratatune-assignment.zip"), zip);
console.log(
  `Packaged and verified ${Object.keys(entries).length} files (${(zip.length / 1024).toFixed(0)} KB).`,
);
