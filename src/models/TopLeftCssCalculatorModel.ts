import { EDotsNames, TPosition, TSize } from 'types';

export interface ITopLeftCssCalculatorModel {
  calcTopLeftCss: (
    dot: EDotsNames,
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) => TPosition;
}

type TAction = () => TPosition;

export class TopLeftCssCalculatorModel implements ITopLeftCssCalculatorModel {
  private _calcA(parentOffset: TPosition, _: TSize, mousePositionAsNewPointPosition: TPosition) {
    return {
      x: mousePositionAsNewPointPosition.x - parentOffset.x,
      y: mousePositionAsNewPointPosition.y - parentOffset.y,
    };
  }

  private _calcB(
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) {
    return {
      x: mousePositionAsNewPointPosition.x - newImageSize.width - parentOffset.x,
      y: mousePositionAsNewPointPosition.y - parentOffset.y,
    };
  }

  private _calcC(
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) {
    return {
      x: mousePositionAsNewPointPosition.x - newImageSize.width - parentOffset.x,
      y: mousePositionAsNewPointPosition.y - newImageSize.height - parentOffset.y,
    };
  }

  private _calcD(
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) {
    return {
      x: mousePositionAsNewPointPosition.x - parentOffset.x,
      y: mousePositionAsNewPointPosition.y - newImageSize.height - parentOffset.y,
    };
  }

  private _topLeftCssCalculatorAction_Factory = (
    dot: EDotsNames,
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) => {
    const actions = new Map<EDotsNames, TAction>([
      [
        EDotsNames.A,
        () => this._calcA(parentOffset, newImageSize, mousePositionAsNewPointPosition),
      ],
      [
        EDotsNames.B,
        () => this._calcB(parentOffset, newImageSize, mousePositionAsNewPointPosition),
      ],
      [
        EDotsNames.C,
        () => this._calcC(parentOffset, newImageSize, mousePositionAsNewPointPosition),
      ],
      [
        EDotsNames.D,
        () => this._calcD(parentOffset, newImageSize, mousePositionAsNewPointPosition),
      ],
    ]);

    return actions.get(dot)!;
  };

  public calcTopLeftCss(
    dot: EDotsNames,
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) {
    return this._topLeftCssCalculatorAction_Factory(
      dot,
      parentOffset,
      newImageSize,
      mousePositionAsNewPointPosition,
    )();
  }
}
