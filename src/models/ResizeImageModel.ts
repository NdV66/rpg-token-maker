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

//TODO add ratio
//TODO add min width and/or min height
export class ResizeImageModel implements IResizeImageModel {
  constructor(private readonly _appEnv: TAppEnv, private readonly _ratio: number) {}

  private _calcOffset(mousePosition: TPosition, point: TPosition) {
    return {
      x: Math.abs(mousePosition.x - point.x),
      y: Math.abs(mousePosition.y - point.y),
    };
  }

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
    const newImageSize: TSize = {
      width: imageSize.width,
      height: imageSize.height,
    };

    if (currentDot === EDotsNames.A) {
      const offset = this._calcOffset(mousePosition, A);

      if (mousePosition.x < A.x) {
        newImageSize.width += 2 * offset.x;
        cssA.x -= offset.x;
      } else {
        newImageSize.width -= 2 * offset.x;
        cssA.x += offset.x;
      }

      if (mousePosition.y < A.y) {
        cssA.y -= offset.y;
        newImageSize.height += 2 * offset.y;
      } else {
        cssA.y += offset.y;
        newImageSize.height -= 2 * offset.y;
      }
    } else if (currentDot === EDotsNames.B) {
      const B: TPosition = {
        x: A.x + imageSize.width,
        y: A.y,
      };
      const offset = this._calcOffset(mousePosition, B);

      if (mousePosition.x < B.x) {
        newImageSize.width -= 2 * offset.x;
        cssA.x += offset.x;
      } else {
        newImageSize.width += 2 * offset.x;
        cssA.x -= offset.x;
      }

      if (mousePosition.y < B.y) {
        cssA.y -= offset.y;
        newImageSize.height += 2 * offset.y;
      } else {
        cssA.y += offset.y;
        newImageSize.height -= 2 * offset.y;
      }
    } else if (currentDot === EDotsNames.C) {
      const C: TPosition = {
        x: A.x + imageSize.width,
        y: A.y + imageSize.height,
      };
      const offset = this._calcOffset(mousePosition, C);

      if (mousePosition.x < C.x) {
        newImageSize.width -= 2 * offset.x;
        cssA.x += offset.x;
      } else {
        newImageSize.width += 2 * offset.x;
        cssA.x -= offset.x;
      }

      if (mousePosition.y < C.y) {
        cssA.y += offset.y;
        newImageSize.height -= 2 * offset.y;
      } else {
        cssA.y -= offset.y;
        newImageSize.height += 2 * offset.y;
      }
    } else {
      const D: TPosition = {
        x: A.x,
        y: A.y + imageSize.height,
      };
      const offset = this._calcOffset(mousePosition, D);

      if (mousePosition.x < D.x) {
        newImageSize.width += 2 * offset.x;
        cssA.x -= offset.x;
      } else {
        newImageSize.width -= 2 * offset.x;
        cssA.x += offset.x;
      }

      if (mousePosition.y < D.y) {
        cssA.y += offset.y;
        newImageSize.height -= 2 * offset.y;
      } else {
        cssA.y -= offset.y;
        newImageSize.height += 2 * offset.y;
      }
    }

    return { ...newImageSize, cssA };
  }
}

// FABRIC
export type IImageResizeModelFabric = (ratio: number) => ResizeImageModel;

export const imageResizeModelFabric = (APP_ENV: TAppEnv) => (ratio: number) =>
  new ResizeImageModel(APP_ENV, ratio);
