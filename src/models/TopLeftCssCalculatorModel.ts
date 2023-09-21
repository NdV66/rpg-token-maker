import { EDotsNames, TPosition, TSize } from 'types';

export interface ITopLeftCssCalculatorModel {
  calcTopLeftCss: (
    dot: EDotsNames,
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) => TPosition;
}

interface ITopLeftCssCalculatorAction {
  action: (
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) => TPosition;
}

export class TopLeftCssCalculatorModel implements ITopLeftCssCalculatorModel {
  public calcTopLeftCss(
    dot: EDotsNames,
    parentOffset: TPosition,
    newImageSize: TSize,
    mousePositionAsNewPointPosition: TPosition,
  ) {
    const actions = {
      [EDotsNames.A]: () => {
        return {
          x: mousePositionAsNewPointPosition.x - parentOffset.x,
          y: mousePositionAsNewPointPosition.y - parentOffset.y,
        };
      },
      [EDotsNames.B]: () => {
        return {
          x: mousePositionAsNewPointPosition.x - newImageSize.width - parentOffset.x,
          y: mousePositionAsNewPointPosition.y - parentOffset.y,
        };
      },
      [EDotsNames.C]: () => {
        return {
          x: mousePositionAsNewPointPosition.x - newImageSize.width - parentOffset.x,
          y: mousePositionAsNewPointPosition.y - newImageSize.height - parentOffset.y,
        };
      },
      [EDotsNames.D]: () => {
        return {
          x: mousePositionAsNewPointPosition.x - parentOffset.x,
          y: mousePositionAsNewPointPosition.y - newImageSize.height - parentOffset.y,
        };
      },
    };

    return actions[dot]();
  }
}
