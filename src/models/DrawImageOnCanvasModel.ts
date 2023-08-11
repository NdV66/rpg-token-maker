import { IImageLoaderModel } from 'models';
import { BehaviorSubject, Observable } from 'rxjs';

type TCanvasSize = {
  width: number;
  height: number;
  styleHeight: number;
  styleWidth: number;
};

export interface IDrawImageOnCanvasModel {
  canvasSize$: Observable<TCanvasSize>;

  loadImage: (
    imageSrc: string,
    defaultImageWidth: number,
  ) => Promise<{ drawHeight: number; image: HTMLImageElement }>;
  calculateCanvasSize: (drawHeight: number, defaultImageWidth: number) => TCanvasSize;
}

const DEFAULT_SIZE: TCanvasSize = {
  height: 0,
  styleHeight: 0,
  width: 0,
  styleWidth: 0,
};

export class DrawImageOnCanvasModel implements IDrawImageOnCanvasModel {
  private _canvasSize$ = new BehaviorSubject<TCanvasSize>(DEFAULT_SIZE);

  constructor(private readonly _imageLoader: IImageLoaderModel) {}

  get canvasSize$() {
    return this._canvasSize$.asObservable();
  }

  public async loadImage(imageSrc: string, defaultImageWidth: number) {
    const image = await this._imageLoader.loadImage(imageSrc);
    const { width, height } = image;
    const drawHeightRaw = (defaultImageWidth * height) / width;
    const drawHeight = Math.floor(drawHeightRaw);

    return {
      drawHeight,
      image,
    };
  }

  public calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    const size = {
      width: defaultImageWidth,
      height: drawHeight,
      styleHeight: drawHeight,
      styleWidth: defaultImageWidth,
    };

    this._canvasSize$.next(size);

    return size;
  }
}
