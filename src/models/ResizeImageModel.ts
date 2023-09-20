import { EDotsNames, TAppEnv, TPosition, TSize } from 'types';
import { roundNumber } from './tool';

export interface IResizeImageModel {
  calcResize: (
    currentDot: EDotsNames,
    mousePosition: TPosition,
    imageSize: TSize,

    A_pageXY: TPosition,
  ) => { offset: TPosition; newImageSize: TSize };
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
    A: TPosition,
  ) {
    //TODO calc in the viewModel

    const commands = {
      [EDotsNames.A]: () => {
        const newImageSize: TSize = { ...imageSize };
        const offset = this._calcOffset(mousePosition, A);

        if (mousePosition.x < A.x) {
          newImageSize.width += 2 * offset.x;
        } else {
          newImageSize.width -= 2 * offset.x;
        }

        if (mousePosition.y < A.y) {
          newImageSize.height += 2 * offset.y;
        } else {
          newImageSize.height -= 2 * offset.y;
        }

        if (offset.x > offset.y) {
          newImageSize.height = this._calcHeightByRatio(imageSize.width);
        } else {
          newImageSize.width = this._calcWidthByRatio(imageSize.height);
        }

        return { newImageSize, offset };
      },
      [EDotsNames.B]: () => {
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

        return { newImageSize, offset };
      },
      [EDotsNames.C]: () => {
        const newImageSize: TSize = { ...imageSize };
        const C: TPosition = {
          x: A.x + imageSize.width,
          y: A.y + imageSize.height,
        };

        const offset = this._calcOffset(mousePosition, C);

        if (mousePosition.x < C.x) {
          newImageSize.width -= 2 * offset.x;
        } else {
          newImageSize.width += 2 * offset.x;
        }

        if (mousePosition.y < C.y) {
          newImageSize.height -= 2 * offset.y;
        } else {
          newImageSize.height += 2 * offset.y;
        }

        if (offset.x > offset.y) {
          newImageSize.height = this._calcHeightByRatio(imageSize.width);
        } else {
          newImageSize.width = this._calcWidthByRatio(imageSize.height);
        }

        return { newImageSize, offset };
      },
      [EDotsNames.D]: () => {
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

        return { newImageSize, offset };
      },
    };

    const action = commands[currentDot];
    const { newImageSize, offset } = action();

    return { newImageSize, offset };
  }
}

// Factory
export type IImageResizeModelFactory = (ratio: number) => ResizeImageModel;

export const imageResizeModelFactory = (APP_ENV: TAppEnv) => (ratio: number) =>
  new ResizeImageModel(APP_ENV, ratio);
