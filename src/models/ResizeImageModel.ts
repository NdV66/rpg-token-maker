import { EDotsNames, TAppEnv, TPosition, TSize } from 'types';

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

export class ResizeImageModel implements IResizeImageModel {
  constructor(private readonly _appEnv: TAppEnv) {}

  /**
   * It prepare image size based on ratio and current width.
   * @param currentWidth current image width
   * @param ratio imageWidth / imageHeight
   * @returns
   */
  private _prepareSizesWithRatio = (currentWidth: number, ratio: number) => {
    const width =
      currentWidth < this._appEnv.minAvatarWidth ? this._appEnv.minAvatarWidth : currentWidth;
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
