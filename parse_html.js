const fs = require("fs");
const path = require("path");

try {
  const html = fs.readFileSync("public/ref/09.12forNYE.html", "utf8");
  // Simple regex to remove style tags and scripts
  const noStyle = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  // Remove tags but keep some structure
  const text = noStyle
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/\n\s*\n/g, "\n");
  console.log(text);
} catch (e) {
  console.error(e);
}
