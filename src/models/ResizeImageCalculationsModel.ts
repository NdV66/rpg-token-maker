import { TPosition, TSize } from 'types';

export interface IResizeImageCalculationsModel {
  calcOffset: (mousePosition: TPosition, point: TPosition) => TPosition;
  calcHeightByRatio: (width: number, ratio: number) => number;
  calcWidthByRatio: (height: number, ratio: number) => number;
  keepMinSize: (newImageSize: TSize, minSize: number) => TSize;
}

export class ResizeImageCalculationsModel implements IResizeImageCalculationsModel {
  public calcOffset(mousePosition: TPosition, point: TPosition) {
    return {
      x: Math.abs(mousePosition.x - point.x),
      y: Math.abs(mousePosition.y - point.y),
    };
  }

  public calcHeightByRatio(width: number, ratio: number) {
    return width / ratio;
  }

  public calcWidthByRatio(height: number, ratio: number) {
    return ratio * height;
  }

  public keepMinSize(newImageSize: TSize, minSize: number) {
    const size = { ...newImageSize };
    if (size.width < minSize) size.width = minSize;
    if (size.height < minSize) size.height = minSize;
    return size;
  }
}
