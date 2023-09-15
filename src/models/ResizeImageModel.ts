import { EDotsNames, TAppEnv, TPosition, TSize } from 'types';
import { roundNumber } from './tool';

export interface IResizeImageModel {
  calcResize: (
    currentDot: EDotsNames,
    mousePosition: TPosition,
    imageSize: TSize,
    topLeftOffset: TPosition,
    A_pageXY: TPosition,
    parentOffset: TPosition,
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

  private _calcHeightByRatio(width: number) {
    return roundNumber(width / this._ratio);
  }

  private _calcWidthByRatio(height: number) {
    return roundNumber(this._ratio * height);
  }

  /**
   * This calculation is based on pageY and pageX.
   */
  public calcResize(
    currentDot: EDotsNames,
    mousePosition: TPosition,
    imageSize: TSize,
    topLeftOffset: TPosition,
    A: TPosition,
    parentOffset: TPosition,
  ) {
    //TODO calc in the viewModel

    const commands = {
      [EDotsNames.A]: () => {
        const cssA = { ...topLeftOffset }; //TODO calc in the viewModel
        const newImageSize: TSize = { ...imageSize };
        const offset = this._calcOffset(mousePosition, A);

        if (offset.x > offset.y) {
          if (mousePosition.x < A.x) {
            newImageSize.width += 2 * offset.x;
          } else {
            newImageSize.width -= 2 * offset.x;
          }

          newImageSize.height = this._calcHeightByRatio(imageSize.width);
        } else {
          if (mousePosition.y < A.y) {
            newImageSize.height += 2 * offset.y;
          } else {
            newImageSize.height -= 2 * offset.y;
          }

          newImageSize.width = this._calcWidthByRatio(imageSize.height);
        }

        if (mousePosition.y < A.y) {
          cssA.y -= offset.y;
        } else {
          cssA.y += offset.y;
        }

        if (mousePosition.x < A.x) {
          cssA.x -= offset.x;
        } else {
          cssA.x += offset.x;
        }

        return { newImageSize, cssA };
      },
      [EDotsNames.B]: () => {
        const cssA = { ...topLeftOffset };
        const newImageSize: TSize = { ...imageSize };
        const B: TPosition = {
          x: A.x + imageSize.width,
          y: A.y,
        };
        const offset = this._calcOffset(mousePosition, B);

        if (mousePosition.x < B.x) {
          newImageSize.width -= 2 * offset.x;
        } else {
          newImageSize.width += 2 * offset.x;
        }

        if (mousePosition.y < B.y) {
          newImageSize.height += 2 * offset.y;
        } else {
          newImageSize.height -= 2 * offset.y;
        }

        if (offset.x > offset.y) {
          newImageSize.height = this._calcHeightByRatio(imageSize.width);
        } else {
          newImageSize.width = this._calcWidthByRatio(imageSize.height);
        }

        const newB = mousePosition;
        cssA.x = newB.x - newImageSize.width - parentOffset.x;
        cssA.y = newB.y - parentOffset.y;

        return { newImageSize, cssA };
      },
      [EDotsNames.C]: () => {
        const cssA = { ...topLeftOffset };
        const newImageSize: TSize = { ...imageSize };
        const C: TPosition = {
          x: A.x + imageSize.width,
          y: A.y + imageSize.height,
        };

        const offset = this._calcOffset(mousePosition, C);

        if (mousePosition.x < C.x) {
          console.log('X -');
          newImageSize.width -= 2 * offset.x;
        } else {
          console.log('X +');
          newImageSize.width += 2 * offset.x;
        }

        if (mousePosition.y < C.y) {
          console.log('Y -');
          newImageSize.height -= 2 * offset.y;
        } else {
          console.log('Y +');
          newImageSize.height += 2 * offset.y;
        }

        if (offset.x > offset.y) {
          newImageSize.height = this._calcHeightByRatio(imageSize.width);
        } else {
          newImageSize.width = this._calcWidthByRatio(imageSize.height);
        }

        const newC = mousePosition;
        cssA.x = newC.x - newImageSize.width - parentOffset.x;
        cssA.y = newC.y - newImageSize.height - parentOffset.y;

        return { newImageSize, cssA };
      },
      [EDotsNames.D]: () => {
        const cssA = { ...topLeftOffset };
        const newImageSize: TSize = { ...imageSize };
        const D: TPosition = {
          x: A.x,
          y: A.y + imageSize.height,
        };
        const offset = this._calcOffset(mousePosition, D);

        if (mousePosition.x < D.x) {
          newImageSize.width += 2 * offset.x;
        } else {
          newImageSize.width -= 2 * offset.x;
        }

        if (mousePosition.y < D.y) {
          newImageSize.height -= 2 * offset.y;
        } else {
          newImageSize.height += 2 * offset.y;
        }

        if (offset.x > offset.y) {
          newImageSize.height = this._calcHeightByRatio(imageSize.width);
        } else {
          newImageSize.width = this._calcWidthByRatio(imageSize.height);
        }

        const newD = mousePosition;
        cssA.x = newD.x - parentOffset.x;
        cssA.y = newD.y - newImageSize.height - parentOffset.y;

        return { newImageSize, cssA };
      },
    };

    const action = commands[currentDot];
    const { newImageSize, cssA } = action();

    return { ...newImageSize, cssA };
  }
}

// Factory
export type IImageResizeModelFactory = (ratio: number) => ResizeImageModel;

export const imageResizeModelFactory = (APP_ENV: TAppEnv) => (ratio: number) =>
  new ResizeImageModel(APP_ENV, ratio);
