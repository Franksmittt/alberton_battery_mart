// Regenerate branded favicons from public/images/logo-schema.jpg
// Requires one-off dev deps: pnpm add -D sharp to-ico
import sharp from "sharp";
import toIco from "to-ico";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const logoPath = join(root, "public/images/logo-schema.jpg");
const appDir = join(root, "src/app");
const publicDir = join(root, "public");

const logo = sharp(logoPath);

const png16 = await logo.clone().resize(16, 16, { fit: "cover" }).png().toBuffer();
const png32 = await logo.clone().resize(32, 32, { fit: "cover" }).png().toBuffer();
const png48 = await logo.clone().resize(48, 48, { fit: "cover" }).png().toBuffer();
const png180 = await logo.clone().resize(180, 180, { fit: "cover" }).png().toBuffer();
const png512 = await logo.clone().resize(512, 512, { fit: "cover" }).png().toBuffer();

const ico = await toIco([png16, png32, png48]);

writeFileSync(join(appDir, "favicon.ico"), ico);
writeFileSync(join(publicDir, "favicon.ico"), ico);
writeFileSync(join(appDir, "icon.png"), png32);
writeFileSync(join(appDir, "apple-icon.png"), png180);

// Optional PWA / manifest reference
writeFileSync(join(publicDir, "icon-192.png"), await logo.clone().resize(192, 192, { fit: "cover" }).png().toBuffer());
writeFileSync(join(publicDir, "icon-512.png"), png512);

console.log("Generated branded favicons from logo-schema.jpg");
