import { parseGlyphPbf } from "./parse_glyph_pbf";

const path: string = Bun.argv.pop() ?? "";
const file = Bun.file(path);
const data = await file.bytes();

const result = parseGlyphPbf(data);
console.log(result);