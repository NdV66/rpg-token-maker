import { TPosition, TSize } from 'types';

const DOUBLE = 2;

type TAction = (
  imageSize: TSize,
  mousePosition: TPosition,
  A: TPosition,
  offset: TPosition,
) => TSize;

export interface IResizeImageCalculationModel {
  calcSizeByPointA: TAction;
  calcSizeByPointB: TAction;
  calcSizeByPointC: TAction;
  calcSizeByPointD: TAction;
}

export class ResizeImageCalculationModel {
  public calcSizeByPointA(
    imageSize: TSize,
    mousePosition: TPosition,
    A: TPosition,
    offset: TPosition,
  ) {
    const rawNewImageSize: TSize = { ...imageSize };

    if (mousePosition.x < A.x) rawNewImageSize.width += DOUBLE * offset.x;
    else rawNewImageSize.width -= DOUBLE * offset.x;

    if (mousePosition.y < A.y) rawNewImageSize.height += DOUBLE * offset.y;
    else rawNewImageSize.height -= DOUBLE * offset.y;

    return rawNewImageSize;
  }

  public calcSizeByPointB(
    imageSize: TSize,
    mousePosition: TPosition,
    B: TPosition,
    offset: TPosition,
  ) {
    const rawNewImageSize: TSize = { ...imageSize };

    if (mousePosition.x < B.x) rawNewImageSize.width -= DOUBLE * offset.x;
    else rawNewImageSize.width += DOUBLE * offset.x;

    if (mousePosition.y < B.y) rawNewImageSize.height += DOUBLE * offset.y;
    else rawNewImageSize.height -= DOUBLE * offset.y;

    return rawNewImageSize;
  }

  public calcSizeByPointC(
    imageSize: TSize,
    mousePosition: TPosition,
    C: TPosition,
    offset: TPosition,
  ) {
    const rawNewImageSize: TSize = { ...imageSize };
    if (mousePosition.x < C.x) rawNewImageSize.width -= DOUBLE * offset.x;
    else rawNewImageSize.width += DOUBLE * offset.x;

    if (mousePosition.y < C.y) rawNewImageSize.height -= DOUBLE * offset.y;
    else rawNewImageSize.height += DOUBLE * offset.y;

    return rawNewImageSize;
  }

  public calcSizeByPointD(
    imageSize: TSize,
    mousePosition: TPosition,
    D: TPosition,
    offset: TPosition,
  ) {
    const rawNewImageSize: TSize = { ...imageSize };

    if (mousePosition.x < D.x) rawNewImageSize.width += DOUBLE * offset.x;
    else rawNewImageSize.width -= DOUBLE * offset.x;

    if (mousePosition.y < D.y) rawNewImageSize.height -= DOUBLE * offset.y;
    else rawNewImageSize.height += DOUBLE * offset.y;

    return rawNewImageSize;
  }
}
