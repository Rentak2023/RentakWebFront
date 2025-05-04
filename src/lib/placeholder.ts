import { encode } from "blurhash";
import { imageSize } from "image-size";
import { imageSizeFromFile } from "image-size/fromFile";
import { unstable_cacheLife as cacheLife } from "next/cache";
import sharp from "sharp";

export type IOptions = {
  size?: number;
  offline?: boolean;
};

export type IOutput = {
  encoded: string;
  width: number;
  height: number;
};

/**
 * Generate a Blurhash string from a given image URL or local path.
 *
 * @source https://github.com/mcnaveen/blurhash-from-url
 * @param {string} source - The image URL or local path to the image file.
 * @param {IOptions} [options] - The optional configuration options.
 * @param {number} [options.size=32] - The desired size of the image for encoding the Blurhash.
 * @param {boolean} [options.offline=false] - Set to `true` if the image source is a local path, `false` if it's a URL.
 * @returns {Promise<IOutput>} The Promise that resolves to the encoded Blurhash string, along with the image width and height.
 * @default size 32
 * @default offline false
 * @example
 * ```js
 * import { blurhashFromURL } from "blurhash-from-url";
 *
 * const output = await blurhashFromURL("https://i.imgur.com/NhfEdg2.png", {
 *    size: 32,
 * });
 *
 * console.log(output);
 * ```
 */
export const blurhashFromURL = async (
  source: string,
  options: IOptions = {},
): Promise<IOutput> => {
  "use cache";
  cacheLife("max");
  const { size = 64, offline = false } = options;

  let width, height, returnedBuffer;

  if (offline) {
    const fs = await import("node:fs");
    const { width: localWidth, height: localHeight } =
      await imageSizeFromFile(source);
    width = localWidth;
    height = localHeight;
    returnedBuffer = await sharp(fs.readFileSync(source)).toBuffer();
  } else {
    const response = await fetch(source);
    const arrayBuffer = await response.arrayBuffer();
    returnedBuffer = Buffer.from(arrayBuffer);

    const { width: remoteWidth, height: remoteHeight } =
      imageSize(returnedBuffer);
    width = remoteWidth;
    height = remoteHeight;
  }

  const { info, data } = await sharp(returnedBuffer)
    .resize(size, size, {
      fit: "inside",
    })
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true,
    });

  const encoded = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4,
  );

  const output: IOutput = {
    encoded,
    width,
    height,
  };

  return output;
};
