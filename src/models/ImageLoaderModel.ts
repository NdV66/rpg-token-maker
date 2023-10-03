export interface IImageLoaderModel {
  loadImage: (imageSrc: string) => Promise<HTMLImageElement>;
}

export class ImageLoaderModel implements IImageLoaderModel {
  public loadImage(imageSrc: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => resolve(image);
      image.onerror = reject;
    });
  }
}
