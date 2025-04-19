import fs from 'node:fs';

export const base64Format = async imagePath => {
  try {
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png'
    };

    const ext = imagePath.split('.').pop().toLowerCase();

    if (!mimeTypes[ext]) {
      console.error('Unsupported image format:', ext);
      return null;
    }

    const image = fs.readFileSync(imagePath);
    const base64 = Buffer.from(image).toString('base64');

    return `data:${mimeTypes[ext]};base64,${base64}`;
  } catch (error) {
    console.error('Error encoding image:', error);
    return null;
  }
};
