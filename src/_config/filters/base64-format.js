import fs from 'node:fs';

export const base64Format = async imagePath => {
  try {
    let base64Image;

    if (imagePath.endsWith('.jpeg') || imagePath.endsWith('.jpg')) {
      const image = fs.readFileSync(imagePath);
      base64Image = Buffer.from(image).toString('base64');
      return `data:image/jpeg;base64,${base64Image}`;
    } else if (imagePath.endsWith('.png')) {
      const image = fs.readFileSync(imagePath);
      base64Image = Buffer.from(image).toString('base64');
      return `data:image/png;base64,${base64Image}`;
    } else {
      console.error('Unsupported image format');
      return null;
    }
  } catch (error) {
    console.error('Error encoding image:', error);
    return null;
  }
};
