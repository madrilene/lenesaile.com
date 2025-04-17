import {promises as fsPromises, existsSync} from 'node:fs';
import path from 'node:path';
import Image from '@11ty/eleventy-img';

const ogImagesDir = './src/assets/og-images';

export const svgToJpeg = async () => {
  const socialPreviewImagesDir = 'dist/assets/og-images/';
  const files = await fsPromises.readdir(socialPreviewImagesDir);

  if (files.length === 0) {
    return;
  }

  for (const filename of files) {
    if (!filename.endsWith('.svg')) continue;
    const outputFilename = filename.slice(0, -4); // removes '.svg'
    const outputPath = path.join(ogImagesDir, `${outputFilename}.jpeg`);

    if (existsSync(outputPath)) continue;

    const imageUrl = path.join(socialPreviewImagesDir, filename);

    await Image(imageUrl, {
      formats: ['jpeg'],
      outputDir: ogImagesDir,
      filenameFormat: (id, src, width, format) => `${outputFilename}.${format}`
    });
  }
};
