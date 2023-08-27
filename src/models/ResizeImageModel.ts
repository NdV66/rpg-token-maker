import { EDotsNames, TAppEnv, TPosition, TSize } from 'types';

export interface IResizeImageModel {
  calcResize: (
    currentDot: EDotsNames,
    mousePosition: TPosition,
    imageSize: TSize,
    topLeftOffset: TPosition,
    A_pageXY: TPosition,
  ) => TSize & { cssA: TPosition };
}

export class ResizeImageModel implements IResizeImageModel {
  constructor(private readonly _appEnv: TAppEnv, private readonly _ratio: number) {}

  /**
   * It prepare image size based on ratio and current width.
   * @param currentWidth current image width
   * @param ratio imageWidth / imageHeight
   * @returns
   */
  private _prepareSizesWithRatio = (currentWidth: number, ratio: number) => {
    const width =
      currentWidth < this._appEnv.minAvatarWidth ? this._appEnv.minAvatarWidth : currentWidth;
    const height = width / ratio;
    return { width, height };
  };

  /**
   * This calculation is based on pageY and pageX.
   * @param currentDot
   * @param mousePosition
   * @param imageSize
   * @param topLeftOffset
   * @param A
   * @returns
   */
  public calcResize(
    currentDot: EDotsNames,
    mousePosition: TPosition,
    imageSize: TSize,
    topLeftOffset: TPosition,
    A: TPosition,
  ) {
    const cssA = { ...topLeftOffset }; //TODO calc in the viewModel
    let width = imageSize.width;

    if (currentDot === EDotsNames.A) {
      const offset: TPosition = {
        x: Math.abs(mousePosition.x - A.x),
        y: Math.abs(mousePosition.y - A.y),
      };

      if (mousePosition.x < A.x) {
        width += 2 * offset.x;
        cssA.x -= offset.x;
      } else {
        width -= 2 * offset.x;
        cssA.x += offset.x;
      }

      if (mousePosition.y < A.y) {
        cssA.y -= offset.y;
      } else {
        cssA.y += offset.y;
      }
    } else if (currentDot === EDotsNames.B) {
      const B: TPosition = {
        x: A.x + imageSize.width,
        y: A.y,
      };
      const offset: TPosition = {
        x: Math.abs(mousePosition.x - B.x),
        y: Math.abs(mousePosition.y - B.y),
      };

      if (mousePosition.x < B.x) {
        width -= 2 * offset.x;
        cssA.x += offset.x;
      } else {
        width += 2 * offset.x;
        cssA.x -= offset.x;
      }

      if (mousePosition.y < B.y) {
        cssA.y -= offset.y;
      } else {
        cssA.y += offset.y;
      }
    } else if (currentDot === EDotsNames.C) {
      const C: TPosition = {
        x: A.x + imageSize.width,
        y: A.y + imageSize.height,
      };
      const offset: TPosition = {
        x: Math.abs(mousePosition.x - C.x),
        y: Math.abs(mousePosition.y - C.y),
      };

      if (mousePosition.x < C.x) {
        console.log('zmniejszam width');
        width -= 2 * offset.x;
        cssA.x += offset.x;
      } else {
        console.log('zwiekszam width');
        width += 2 * offset.x;
        cssA.x -= offset.x;
      }

      if (mousePosition.y < C.y) {
        console.log('zmniejszam height');
        cssA.y += offset.y;
      } else {
        console.log('zwiekszam height');
        cssA.y -= offset.y;
      }

      console.log(
        // 'A',
        // A,
        'topLeftOffset',
        topLeftOffset,
        'cssA',
        cssA,
        'offset',
        offset,
        'mouse',
        mousePosition,
      );
    } else {
    }

    const size = this._prepareSizesWithRatio(width, this._ratio);
    // const heightOffset = imageSize.height - size.height;
    // cssA.y += heightOffset;
    return { ...size, cssA };
  }
}

// FABRIC
export type IImageResizeModelFabric = (ratio: number) => ResizeImageModel;

export const imageResizeModelFabric = (APP_ENV: TAppEnv) => (ratio: number) =>
  new ResizeImageModel(APP_ENV, ratio);
