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
  calculateCanvasSize: (drawHeight: number, width: number) => void;
}

const DEFAULT_SIZE: TCanvasSize = {
  height: 0,
  styleHeight: 0,
  width: 0,
  styleWidth: 0,
};

export class DrawImageOnCanvasModel implements IDrawImageOnCanvasModel {
  private _canvasSize$ = new BehaviorSubject<TCanvasSize>(DEFAULT_SIZE);
  public readonly canvasSize$ = this._canvasSize$.asObservable();

  constructor(private readonly _imageLoader: IImageLoaderModel) {}

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

  public calculateCanvasSize(drawHeight: number, width: number) {
    const size = {
      width,
      height: drawHeight,
      styleHeight: drawHeight,
      styleWidth: width,
    };

    this._canvasSize$.next(size);
  }
}
