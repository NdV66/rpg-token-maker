import { TAppEnv } from 'types';
import { IImageLoaderModel } from 'models';

import frameMask from 'data/frameMask.png';

export interface IExportCanvasModel {
  exportToPng: (currentImage: HTMLCanvasElement, currentFrame: HTMLCanvasElement) => Promise<string | undefined>;
}

export class ExportCanvasModel implements IExportCanvasModel {
  constructor(private readonly _appEnv: TAppEnv, private readonly _imageLoader: IImageLoaderModel) {}

  private async _drawTokenMask(context: CanvasRenderingContext2D, frameMaskSrc: string) {
    const image = await this._imageLoader.loadImage(frameMaskSrc);
    context.save();
    context.globalCompositeOperation = 'destination-in';
    context.drawImage(image, 0, 0, this._appEnv.defaultFrameSize, this._appEnv.defaultFrameSize);
    context.restore();
  }

  private _mergeCanvasLayers(mergedLayersContext: CanvasRenderingContext2D, currentImage: HTMLCanvasElement, currentFrame: HTMLCanvasElement) {
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
  public async exportToPng(currentImage: HTMLCanvasElement, currentFrame: HTMLCanvasElement) {
    const FRAME_SIZE = currentFrame.width;
    const mergedLayersCanvas = this._prepareCanvasForMergeLayers();
    const finalCanvas = this._prepareFinalCanvas(FRAME_SIZE);
    const mergedLayersContext = mergedLayersCanvas.getContext('2d');
    const finalContext = finalCanvas.getContext('2d');

    if (mergedLayersContext && finalContext) {
      this._mergeCanvasLayers(mergedLayersContext, currentImage, currentFrame);

      finalContext.drawImage(mergedLayersCanvas, currentFrame.offsetLeft, currentFrame.offsetTop, FRAME_SIZE, FRAME_SIZE, 0, 0, FRAME_SIZE, FRAME_SIZE);
      await this._drawTokenMask(finalContext, frameMask);

      return finalCanvas.toDataURL('image/png', 1.0);
    }
  }
}
