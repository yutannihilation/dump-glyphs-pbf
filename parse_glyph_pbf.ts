// This code is derived from maplibre-gl-js, licensed under the BSD 3-clause license.
//
// original code: https://github.com/maplibre/maplibre-gl-js/blob/main/src/style/parse_glyph_pbf.ts

import { AlphaImage } from './image';

import Protobuf from 'pbf';
const border = 3;

import type { StyleGlyph } from './style_glyph';

function readFontstacks(tag: number, glyphs: Array<StyleGlyph>, pbf: Protobuf) {
    if (tag === 1) {
        pbf.readMessage(readFontstack, glyphs);
    }
}

function readFontstack(tag: number, glyphs: Array<StyleGlyph>, pbf: Protobuf) {
    if (tag === 3) {
        const { id, bitmap, width, height, left, top, advance } = pbf.readMessage(readGlyph, {});
        glyphs.push({
            id,
            bitmap: new AlphaImage({
                width: width + 2 * border,
                height: height + 2 * border
            }, bitmap),
            metrics: { width, height, left, top, advance }
        });
    }
}

function readGlyph(tag: number, glyph: any, pbf: Protobuf) {
    if (tag === 1) glyph.id = pbf.readVarint();
    else if (tag === 2) glyph.bitmap = pbf.readBytes();
    else if (tag === 3) glyph.width = pbf.readVarint();
    else if (tag === 4) glyph.height = pbf.readVarint();
    else if (tag === 5) glyph.left = pbf.readSVarint();
    else if (tag === 6) glyph.top = pbf.readSVarint();
    else if (tag === 7) glyph.advance = pbf.readVarint();
}

export function parseGlyphPbf(data: ArrayBuffer | Uint8Array): Array<StyleGlyph> {
    return new Protobuf(data).readFields(readFontstacks, []);
}

export const GLYPH_PBF_BORDER = border;
