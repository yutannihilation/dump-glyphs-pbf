// This code is derived from maplibre-gl-js, licensed under the BSD 3-clause license.
//
// original code: https://github.com/maplibre/maplibre-gl-js/blob/main/src/style/style_glyph.ts

import type { AlphaImage } from './image';

/**
 * Some metices related to a glyph
 */
export type GlyphMetrics = {
    width: number;
    height: number;
    left: number;
    top: number;
    advance: number;
    /**
     * isDoubleResolution = true for 48px textures
     */
    isDoubleResolution?: boolean;
};

/**
 * A style glyph type
 */
export type StyleGlyph = {
    id: number;
    bitmap: AlphaImage;
    metrics: GlyphMetrics;
};
