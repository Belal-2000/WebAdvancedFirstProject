import sharp from 'sharp';

export default function imageProcess(
  fileName: string,
  x: string,
  y: string
): void {
  sharp(`./assets/full/${fileName}.jpg`)
    .resize(parseInt(x), parseInt(y))
    .toFile(`./assets/thump/${fileName}-${x}_${y}.jpg`);
}
