const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/irl/**/*.{jpg,jpeg,png}',
  { eager: true },
);

export function getIrlImage(slug: string, filename: string): ImageMetadata {
  const image = imageModules[`../assets/irl/${slug}/${filename}`]?.default;

  if (!image) {
    throw new Error(`Missing IRL image: ${slug}/${filename}`);
  }

  return image;
}

export function responsiveWidths(
  image: ImageMetadata,
  desiredWidths: number[],
): number[] {
  const widths = desiredWidths.filter((width) => width <= image.width);
  const largestDesiredWidth = desiredWidths.at(-1) ?? image.width;

  if (image.width < largestDesiredWidth && !widths.includes(image.width)) {
    widths.push(image.width);
  }

  return widths;
}
