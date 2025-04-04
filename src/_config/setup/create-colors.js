import fs from 'node:fs';
import Color from 'colorjs.io';

const colorsBase = JSON.parse(fs.readFileSync('./src/_data/designTokens/colorsBase.json', 'utf-8'));

const neutralDark = '#161616';
const neutralLight = '#ffffff';

const generatePalette = (baseColorHex, steps) => {
  const baseColor = new Color(baseColorHex).to('oklch');

  return steps.map(step => {
    let color = new Color('oklch', [step.lightness, baseColor.c * step.chromaFactor, baseColor.h]);

    if (step.mixWith && step.mixAmount) {
      color = color.mix(new Color(step.mixWith), step.mixAmount, {space: 'oklab'});
    }

    const rgb = color.to('srgb');
    const [r, g, b] = rgb.coords.map(value => Math.round(Math.min(Math.max(value * 255, 0), 255)));

    const hexValue = `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return {
      name: `${step.label}`,
      value: hexValue
    };
  });
};

const vibrantSteps = [
  {label: '100', lightness: 0.96, chromaFactor: 0.19, mixWith: neutralLight, mixAmount: 0.75},
  {label: '200', lightness: 0.8, chromaFactor: 0.65, mixWith: neutralLight, mixAmount: 0.6},
  {label: '300', lightness: 0.75, chromaFactor: 0.8, mixWith: neutralLight, mixAmount: 0.3},
  {label: '400', lightness: 0.7, chromaFactor: 0.9, mixWith: neutralLight, mixAmount: 0.15},
  {label: '500', lightness: 0.62, chromaFactor: 1},
  {label: '600', lightness: 0.5, chromaFactor: 1},
  {label: '700', lightness: 0.4, chromaFactor: 1, mixWith: neutralDark, mixAmount: 0.3},
  {label: '800', lightness: 0.35, chromaFactor: 0.85, mixWith: neutralDark, mixAmount: 0.7},
  {label: '900', lightness: 0.25, chromaFactor: 0.65, mixWith: neutralDark, mixAmount: 0.85}
];

const neutralSteps = [
  {label: '100', lightness: 0.98, chromaFactor: 0.12},
  {label: '200', lightness: 0.92, chromaFactor: 0.14},
  {label: '300', lightness: 0.75, chromaFactor: 0.14},
  {label: '400', lightness: 0.6, chromaFactor: 0.25},
  {label: '500', lightness: 0.5, chromaFactor: 0.3},
  {label: '600', lightness: 0.4, chromaFactor: 0.35},
  {label: '700', lightness: 0.35, chromaFactor: 0.3},
  {label: '800', lightness: 0.3, chromaFactor: 0.27},
  {label: '900', lightness: 0.26, chromaFactor: 0.25}
];

const colorTokens = {
  title: colorsBase.title,
  description: colorsBase.description,
  items: []
};

colorsBase.shades_neutral.forEach(color => {
  const palette = generatePalette(color.value, neutralSteps);
  palette.forEach(shade => {
    colorTokens.items.push({
      name: `${color.name} ${shade.name}`,
      value: shade.value
    });
  });
});

colorsBase.shades_vibrant.forEach(color => {
  const palette = generatePalette(color.value, vibrantSteps);
  palette.forEach(shade => {
    colorTokens.items.push({
      name: `${color.name} ${shade.name}`,
      value: shade.value
    });
  });
});

colorsBase.light_dark.forEach(color => {
  colorTokens.items.push({
    name: color.name,
    value: color.value
  });

  const lightDark = new Color(color.value).to('oklch');
  const subduedColor = new Color('oklch', [
    lightDark.l,
    lightDark.c * 0.8, // reduce chroma by 20%
    lightDark.h
  ]).to('srgb');

  const [r, g, b] = subduedColor.coords.map(value => Math.round(Math.min(Math.max(value * 255, 0), 255)));

  const subduedHex = `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  colorTokens.items.push({
    name: `${color.name} Subdued`,
    value: subduedHex
  });
});

colorsBase.standalone.forEach(color => {
  colorTokens.items.push({
    name: color.name,
    value: color.value
  });
});

fs.writeFileSync('./src/_data/designTokens/colors.json', JSON.stringify(colorTokens, null, 2));
