import { EDotsNames, TPosition, TSize } from 'types';

// A *** B
// *     *
// D *** C

export interface IResizeImageModel {
  calcResize: (
    currentDot: EDotsNames,
    event: React.MouseEvent,
    image: HTMLCanvasElement,
  ) => TSize & { cssA: TPosition };
}

const MIN_WIDTH = 100; //todo env

export class ResizeImageModel implements IResizeImageModel {
  private _prepareSizesWithRatio = (currentWidth: number, ratio: number) => {
    const width = currentWidth < MIN_WIDTH ? MIN_WIDTH : currentWidth;
    const height = width / ratio;
    return { width, height };
  };

  public calcResize(currentDot: EDotsNames, event: React.MouseEvent, image: HTMLCanvasElement) {
    const imageRect = image.getBoundingClientRect();
    let width = imageRect.width;

    const M: TPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    const A: TPosition = { x: imageRect.left, y: imageRect.top }; //page X and page y
    const cssA = { x: image.offsetLeft, y: image.offsetTop };

    if (currentDot === EDotsNames.A) {
      const offset: TPosition = {
        x: Math.abs(M.x - A.x),
        y: Math.abs(M.y - A.y),
      };

      if (M.x < A.x) {
        width += 2 * offset.x;
        cssA.x -= offset.x;
      } else {
        width -= 2 * offset.x;
        cssA.x += offset.x;
      }

      if (M.y < A.y) {
        cssA.y -= offset.y;
      } else {
        cssA.y += offset.y;
      }
    } else if (currentDot === EDotsNames.B) {
      const B: TPosition = {
        x: A.x + imageRect.width,
        y: A.y,
      };

      if (M.x < B.x) {
      } else {
      }

      if (M.y < B.y) {
      } else {
      }
    }

    const ratio = imageRect.width / imageRect.height;
    const size = this._prepareSizesWithRatio(width, ratio);

    return { ...size, cssA };
  }
}
