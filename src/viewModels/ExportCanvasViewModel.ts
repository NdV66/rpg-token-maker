import { TAppEnv } from 'types';

export interface IExportCanvasViewModel {
  exportToPng: (
    currentImage: HTMLCanvasElement,
    currentFrame: HTMLCanvasElement,
  ) => string | undefined;
}

export class ExportCanvasViewModel implements IExportCanvasViewModel {
  constructor(private readonly _appEnv: TAppEnv) {}

  private _drawCircleMask(
    context: CanvasRenderingContext2D,
    frameOffsetLeft: number,
    frameOffsetTop: number,
  ) {
    const offsetLeft = frameOffsetLeft / 2;
    const offsetTop = frameOffsetTop / 2;
    const radius = this._appEnv.defaultFrameSize / 2;

    context.save();
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(offsetLeft, offsetTop, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }

  private _mergeCanvasLayers(
    mergedLayersContext: CanvasRenderingContext2D,
    currentImage: HTMLCanvasElement,
    currentFrame: HTMLCanvasElement,
  ) {
    mergedLayersContext.drawImage(currentImage, currentImage.offsetLeft, currentImage.offsetTop);
    mergedLayersContext.drawImage(currentFrame, currentFrame.offsetLeft, currentFrame.offsetTop);
  }

  private _prepareCanvasForMergeLayers() {
    const mergedLayersCanvas = document.createElement('canvas');
    mergedLayersCanvas.width = this._appEnv.workspaceSize;
    mergedLayersCanvas.height = this._appEnv.workspaceSize;
    return mergedLayersCanvas;
  }

  private _prepareFinalCanvas(frameSize: number) {
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = frameSize;
    finalCanvas.height = frameSize;
    return finalCanvas;
  }

  /**
   *
   * @param currentImage
   * @param currentFrame
   * @returns string (URL of the exported image)
   */
  public exportToPng(currentImage: HTMLCanvasElement, currentFrame: HTMLCanvasElement) {
    const FRAME_SIZE = currentFrame.width;
    const mergedLayersCanvas = this._prepareCanvasForMergeLayers();
    const finalCanvas = this._prepareFinalCanvas(FRAME_SIZE);
    const mergedLayersContext = mergedLayersCanvas.getContext('2d');
    const finalContext = finalCanvas.getContext('2d');

    if (mergedLayersContext && finalContext) {
      this._mergeCanvasLayers(mergedLayersContext, currentImage, currentFrame);

      finalContext.drawImage(
        mergedLayersCanvas,
        currentFrame.offsetLeft,
        currentFrame.offsetTop,
        FRAME_SIZE,
        FRAME_SIZE,
        0,
        0,
        FRAME_SIZE,
        FRAME_SIZE,
      );

      this._drawCircleMask(finalContext, currentFrame.offsetLeft, currentFrame.offsetTop);

      return finalCanvas.toDataURL('image/png', 1.0);
    }
  }
}
