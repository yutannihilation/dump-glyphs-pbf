// This code is derived from maplibre-gl-js, licensed under the BSD 3-clause license.
//
// original code: https://github.com/maplibre/maplibre-gl-js/blob/main/src/util/image.ts

export type Size = {
    width: number;
    height: number;
};

function createImage(image: any, {
    width,
    height
}: Size, channels: number, data?: Uint8Array | Uint8ClampedArray) {
    if (!data) {
        data = new Uint8Array(width * height * channels);
    } else if (data instanceof Uint8ClampedArray) {
        data = new Uint8Array(data.buffer);
    } else if (data.length !== width * height * channels) {
        throw new RangeError(`mismatched image size. expected: ${data.length} but got: ${width * height * channels}`);
    }
    image.width = width;
    image.height = height;
    image.data = data;
    return image;
}


export class AlphaImage {
    width: number;
    height: number;
    data: Uint8Array;

    constructor(size: Size, data?: Uint8Array | Uint8ClampedArray) {
        createImage(this, size, 1, data);
    }
}