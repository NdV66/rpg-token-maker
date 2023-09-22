import { EDotsNames, TAppEnv, TPosition, TSize } from 'types';

const DOUBLE = 2;

export interface IResizeImageModel {
  calcResize: (
    currentDot: EDotsNames,
    mousePosition: TPosition,
    imageSize: TSize,
    A_pageXY: TPosition,
  ) => TSize;
}

export class ResizeImageModel implements IResizeImageModel {
  constructor(private readonly _ratio: number, private readonly _appEnv: TAppEnv) {}

  private _calcOffset(mousePosition: TPosition, point: TPosition) {
    return {
      x: Math.abs(mousePosition.x - point.x),
      y: Math.abs(mousePosition.y - point.y),
    };
  }

  private _calcHeightByRatio(width: number) {
    return width / this._ratio;
  }

  private _calcWidthByRatio(height: number) {
    return this._ratio * height;
  }

  private _keepMinSize(newImageSize: TSize, minSize: number) {
    const size = { ...newImageSize };
    if (size.width < minSize) size.width = minSize;
    if (size.height < minSize) size.height = minSize;
    return size;
  }

  private _action(
    mousePosition: TPosition,
    currentPoint: TPosition,
    calcRawNewImageSize: (offset: TPosition) => TSize,
  ) {
    const offset = this._calcOffset(mousePosition, currentPoint);
    const rawNewImageSize = calcRawNewImageSize(offset);
    const newImageSize = this._keepMinSize(rawNewImageSize, this._appEnv.minImageSize);

    if (offset.x > offset.y) newImageSize.height = this._calcHeightByRatio(newImageSize.width);
    else newImageSize.width = this._calcWidthByRatio(newImageSize.height);

    return newImageSize;
  }

  private _calcA(imageSize: TSize, mousePosition: TPosition, A: TPosition) {
    const calcSize = (offset: TPosition) => {
      const rawNewImageSize: TSize = { ...imageSize };

      if (mousePosition.x < A.x) rawNewImageSize.width += DOUBLE * offset.x;
      else rawNewImageSize.width -= DOUBLE * offset.x;

      if (mousePosition.y < A.y) rawNewImageSize.height += DOUBLE * offset.y;
      else rawNewImageSize.height -= DOUBLE * offset.y;

      return rawNewImageSize;
    };

    return this._action(mousePosition, A, calcSize);
  }

  private _calcB(imageSize: TSize, mousePosition: TPosition, B: TPosition) {
    const calcSize = (offset: TPosition) => {
      const rawNewImageSize: TSize = { ...imageSize };

      if (mousePosition.x < B.x) rawNewImageSize.width -= DOUBLE * offset.x;
      else rawNewImageSize.width += DOUBLE * offset.x;

      if (mousePosition.y < B.y) rawNewImageSize.height += DOUBLE * offset.y;
      else rawNewImageSize.height -= DOUBLE * offset.y;

      return rawNewImageSize;
    };

    return this._action(mousePosition, B, calcSize);
  }

  private _calcC(imageSize: TSize, mousePosition: TPosition, C: TPosition) {
    const calcSize = (offset: TPosition) => {
      const rawNewImageSize: TSize = { ...imageSize };
      if (mousePosition.x < C.x) rawNewImageSize.width -= DOUBLE * offset.x;
      else rawNewImageSize.width += DOUBLE * offset.x;

      if (mousePosition.y < C.y) rawNewImageSize.height -= DOUBLE * offset.y;
      else rawNewImageSize.height += DOUBLE * offset.y;

      return rawNewImageSize;
    };

    return this._action(mousePosition, C, calcSize);
  }

  private _calcD(imageSize: TSize, mousePosition: TPosition, D: TPosition) {
    const calcSize = (offset: TPosition) => {
      const rawNewImageSize: TSize = { ...imageSize };

      if (mousePosition.x < D.x) rawNewImageSize.width += DOUBLE * offset.x;
      else rawNewImageSize.width -= DOUBLE * offset.x;

      if (mousePosition.y < D.y) rawNewImageSize.height -= DOUBLE * offset.y;
      else rawNewImageSize.height += DOUBLE * offset.y;

      return rawNewImageSize;
    };

    return this._action(mousePosition, D, calcSize);
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
    const commands = {
      [EDotsNames.A]: () => {
        return this._action(mousePosition, A, () => this._calcA(imageSize, mousePosition, A));
      },
      [EDotsNames.B]: () => {
        const B: TPosition = {
          x: A.x + imageSize.width,
          y: A.y,
        };

        return this._action(mousePosition, B, () => this._calcB(imageSize, mousePosition, B));
      },
      [EDotsNames.C]: () => {
        const C: TPosition = {
          x: A.x + imageSize.width,
          y: A.y + imageSize.height,
        };

        return this._action(mousePosition, C, () => this._calcC(imageSize, mousePosition, C));
      },
      [EDotsNames.D]: () => {
        const D: TPosition = {
          x: A.x,
          y: A.y + imageSize.height,
        };

        return this._action(mousePosition, D, () => this._calcD(imageSize, mousePosition, D));
      },
    };

    const action = commands[currentDot];
    return action();
  }
}

// Factory
export type IImageResizeModelFactory = (ratio: number) => ResizeImageModel;

export const imageResizeModelFactory = (appEnv: TAppEnv) => (ratio: number) =>
  new ResizeImageModel(ratio, appEnv);
