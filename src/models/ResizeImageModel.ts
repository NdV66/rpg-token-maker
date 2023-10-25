import { EDotsNames, TAppEnv, TPosition, TSize } from 'types';
import { IResizeImageCalculationPointsModel } from './ResizeImageCalculationPointsModel';
import { IResizeImageCalculationsModel } from './ResizeImageCalculationsModel';

export interface IResizeImageModel {
  calcResize: (currentDot: EDotsNames, mousePosition: TPosition, imageSize: TSize, A_pageXY: TPosition) => TSize;
}

export class ResizeImageModel implements IResizeImageModel {
  constructor(
    private readonly _ratio: number,
    private readonly _appEnv: TAppEnv,
    private readonly _resizeImageCalculationPointsModel: IResizeImageCalculationPointsModel,
    private readonly _resizeImageCalculationsModel: IResizeImageCalculationsModel,
  ) {}

  private _action(mousePosition: TPosition, currentPoint: TPosition, calcRawNewImageSize: (offset: TPosition) => TSize) {
    const offset = this._resizeImageCalculationsModel.calcOffset(mousePosition, currentPoint);
    const rawNewImageSize = calcRawNewImageSize(offset);
    const newImageSize = this._resizeImageCalculationsModel.keepMinSize(rawNewImageSize, this._appEnv.minImageSize);
    if (offset.x > offset.y) newImageSize.height = this._resizeImageCalculationsModel.calcHeightByRatio(newImageSize.width, this._ratio);
    else newImageSize.width = this._resizeImageCalculationsModel.calcWidthByRatio(newImageSize.height, this._ratio);

    return newImageSize;
  }

  private _calcA(imageSize: TSize, mousePosition: TPosition, A: TPosition) {
    const calcSize = (offset: TPosition) => this._resizeImageCalculationPointsModel.calcSizeByPointA(imageSize, mousePosition, A, offset);
    return this._action(mousePosition, A, calcSize);
  }

  private _calcB(imageSize: TSize, mousePosition: TPosition, B: TPosition) {
    const calcSize = (offset: TPosition) => this._resizeImageCalculationPointsModel.calcSizeByPointB(imageSize, mousePosition, B, offset);
    return this._action(mousePosition, B, calcSize);
  }

  private _calcC(imageSize: TSize, mousePosition: TPosition, C: TPosition) {
    const calcSize = (offset: TPosition) => this._resizeImageCalculationPointsModel.calcSizeByPointC(imageSize, mousePosition, C, offset);
    return this._action(mousePosition, C, calcSize);
  }

  private _calcD(imageSize: TSize, mousePosition: TPosition, D: TPosition) {
    const calcSize = (offset: TPosition) => this._resizeImageCalculationPointsModel.calcSizeByPointD(imageSize, mousePosition, D, offset);
    return this._action(mousePosition, D, calcSize);
  }

  /**
   * This calculation is based on pageY and pageX.
   */
  public calcResize(currentDot: EDotsNames, mousePosition: TPosition, imageSize: TSize, A: TPosition) {
    const commands = {
      [EDotsNames.A]: () => {
        return this._action(mousePosition, A, () => this._calcA(imageSize, mousePosition, A));
      },
      [EDotsNames.B]: () => {
        const B: TPosition = { x: A.x + imageSize.width, y: A.y };
        return this._action(mousePosition, B, () => this._calcB(imageSize, mousePosition, B));
      },
      [EDotsNames.C]: () => {
        const C: TPosition = { x: A.x + imageSize.width, y: A.y + imageSize.height };
        return this._action(mousePosition, C, () => this._calcC(imageSize, mousePosition, C));
      },
      [EDotsNames.D]: () => {
        const D: TPosition = { x: A.x, y: A.y + imageSize.height };
        return this._action(mousePosition, D, () => this._calcD(imageSize, mousePosition, D));
      },
    };

    return commands[currentDot]();
  }
}

// Factory
export type IImageResizeModelFactory = (ratio: number) => IResizeImageModel;

export const imageResizeModelFactory =
  (appEnv: TAppEnv, resizeImageCalculationPointsModel: IResizeImageCalculationPointsModel, resizeImageCalculationsModel: IResizeImageCalculationsModel) => (ratio: number) =>
    new ResizeImageModel(ratio, appEnv, resizeImageCalculationPointsModel, resizeImageCalculationsModel);
