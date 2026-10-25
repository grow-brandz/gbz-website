const ALLOWED_TAGS = new Set([
  "h2",
  "h3",
  "h4",
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "img",
]);

const TAG_ALIAS = {
  h1: "h2",
  h5: "h3",
  h6: "h4",
  del: "s",
  strike: "s",
};

const VOID_TAGS = new Set(["br", "img"]);

const DROP_WITH_CONTENT = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "svg",
  "math",
  "noscript",
  "template",
  "textarea",
  "title",
  "xmp",
  "noframes",
  "noembed",
]);

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  colon: ":",
};

function stripNulls(value) {
  let result = "";
  for (const char of String(value)) {
    if (char.codePointAt(0) !== 0) result += char;
  }
  return result;
}

function stripControls(value) {
  let result = "";
  for (const char of String(value)) {
    const code = char.codePointAt(0);
    if (code > 31 && code !== 127) result += char;
  }
  return result;
}

function fromCodePoint(code) {
  if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return "";
  if (code <= 31 || code === 127) return "";
  if (code >= 0xd800 && code <= 0xdfff) return "";
  return String.fromCodePoint(code);
}

function decodeEntities(value) {
  let current = stripNulls(value);

  for (let pass = 0; pass < 2; pass += 1) {
    current = current
      .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => fromCodePoint(parseInt(hex, 16)))
      .replace(/&#([0-9]+);?/g, (_, num) => fromCodePoint(parseInt(num, 10)))
      .replace(/&([a-z]+);?/gi, (full, name) => {
        const mapped = NAMED_ENTITIES[name.toLowerCase()];
        return mapped === undefined ? full : mapped;
      });
  }

  return current;
}

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeText(value).replace(/"/g, "&quot;");
}

function sanitizeUrl(value) {
  const cleaned = stripControls(decodeEntities(value)).replace(/\s+/g, "").trim();
  if (!cleaned) return "";
  if (cleaned.startsWith("#")) return cleaned;
  if (cleaned.startsWith("//") || cleaned.startsWith("\\")) return "";
  if (cleaned.startsWith("/") && !cleaned.startsWith("/\\")) return cleaned;

  const lower = cleaned.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("file:")
  ) {
    return "";
  }

  try {
    const url = new URL(cleaned);
    if (!["http:", "https:", "mailto:", "tel:"].includes(url.protocol)) return "";
    return url.href;
  } catch {
    if (/^[a-z][a-z0-9+.-]*:/i.test(cleaned)) return "";
    return cleaned;
  }
}

function sanitizeImageUrl(value) {
  const url = sanitizeUrl(value);
  if (!url || url.startsWith("#") || url.startsWith("mailto:") || url.startsWith("tel:")) {
    return "";
  }
  if (url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.href;
  } catch {
    return "";
  }
  return "";
}

function parseAttributes(source) {
  const attrs = [];
  const pattern =
    /([^\s/>"'=<>`]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s/>"'=<>`]+)))?/g;
  let match = pattern.exec(source);
  while (match) {
    attrs.push({
      name: match[1].toLowerCase(),
      value: match[2] ?? match[3] ?? match[4] ?? "",
    });
    match = pattern.exec(source);
  }
  return attrs;
}

function parseTag(raw) {
  const match = /^<\s*(\/)?\s*([a-zA-Z0-9:-]+)([\s\S]*?)>$/.exec(raw);
  if (!match) return null;
  const name = match[2].toLowerCase();
  const attrSource = match[3].replace(/\/\s*$/, "");
  return {
    closing: Boolean(match[1]),
    name,
    selfClosing: /\/\s*$/.test(match[3]) || VOID_TAGS.has(name),
    attrs: match[1] ? [] : parseAttributes(attrSource),
  };
}

function visibleText(html) {
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeArticleHtml(input) {
  if (typeof input !== "string" || !input) return "";

  const html = stripNulls(input);
  let index = 0;
  let output = "";
  const stack = [];

  const emitOpen = (name, htmlTag) => {
    output += htmlTag;
    if (!VOID_TAGS.has(name)) stack.push({ name, skip: false });
  };

  while (index < html.length) {
    if (html[index] !== "<") {
      const next = html.indexOf("<", index);
      const text = html.slice(index, next === -1 ? html.length : next);
      output += escapeText(decodeEntities(text));
      index = next === -1 ? html.length : next;
      continue;
    }

    if (html.startsWith("<!--", index)) {
      const end = html.indexOf("-->", index + 4);
      index = end === -1 ? html.length : end + 3;
      continue;
    }

    const end = html.indexOf(">", index + 1);
    if (end === -1) {
      output += escapeText(decodeEntities(html.slice(index)));
      break;
    }

    const raw = html.slice(index, end + 1);
    index = end + 1;
    const tag = parseTag(raw);
    if (!tag) {
      output += escapeText(decodeEntities(raw));
      continue;
    }

    if (DROP_WITH_CONTENT.has(tag.name) && !tag.closing) {
      const closeTag = new RegExp(`<\\s*/\\s*${tag.name}\\b[^>]*>`, "i");
      const rest = html.slice(index);
      const found = closeTag.exec(rest);
      index = found ? index + found.index + found[0].length : html.length;
      continue;
    }

    const mapped = TAG_ALIAS[tag.name] || tag.name;

    if (tag.closing) {
      if (!stack.some((item) => item.name === mapped)) continue;
      while (stack.length) {
        const item = stack.pop();
        if (!item.skip) output += `</${item.name}>`;
        if (item.name === mapped) break;
      }
      continue;
    }

    if (!ALLOWED_TAGS.has(mapped)) continue;

    if (mapped === "a") {
      const hrefAttr = tag.attrs.find((attr) => attr.name === "href");
      const href = hrefAttr ? sanitizeUrl(hrefAttr.value) : "";
      if (!href) {
        stack.push({ name: "a", skip: true });
        continue;
      }
      const blank = tag.attrs.some(
        (attr) => attr.name === "target" && attr.value === "_blank",
      );
      const rel = blank ? ' target="_blank" rel="noopener noreferrer"' : "";
      emitOpen("a", `<a href="${escapeAttr(href)}"${rel}>`);
      continue;
    }

    if (mapped === "img") {
      const srcAttr = tag.attrs.find((attr) => attr.name === "src");
      const src = srcAttr ? sanitizeImageUrl(srcAttr.value) : "";
      if (!src) continue;
      const altAttr = tag.attrs.find((attr) => attr.name === "alt");
      const alt = altAttr ? escapeAttr(decodeEntities(altAttr.value)) : "";
      output += `<img src="${escapeAttr(src)}" alt="${alt}">`;
      continue;
    }

    if (mapped === "br") {
      output += "<br>";
      continue;
    }

    emitOpen(mapped, `<${mapped}>`);
  }

  while (stack.length) {
    const item = stack.pop();
    if (!item.skip) output += `</${item.name}>`;
  }

  return output.trim();
}

export function articleRichHtml(value) {
  const clean = sanitizeArticleHtml(value);
  if (!clean) return "";
  if (/<img\b/i.test(clean)) return clean;
  return visibleText(clean) ? clean : "";
}
