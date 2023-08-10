import { TAppEnv } from 'types';

export interface IExportCanvasViewModel {
  exportToPng: (
    currentImage: HTMLCanvasElement,
    currentFrame: HTMLCanvasElement,
  ) => string | undefined;
}

export class ExportCanvasViewModel implements IExportCanvasViewModel {
  constructor(private readonly _appEnv: TAppEnv) {}

  public exportToPng(currentImage: HTMLCanvasElement, currentFrame: HTMLCanvasElement) {
    const mergedLayersCanvas = document.createElement('canvas');
    const finalCanvas = document.createElement('canvas');
    const exportContext = mergedLayersCanvas.getContext('2d');
    const finalContext = finalCanvas.getContext('2d');
    const FRAME_SIZE = currentFrame.width;

    if (exportContext && finalContext) {
      mergedLayersCanvas.width = this._appEnv.workspaceSize;
      mergedLayersCanvas.height = this._appEnv.workspaceSize;

      exportContext.drawImage(currentImage, currentImage.offsetLeft, currentImage.offsetTop);
      exportContext.drawImage(currentFrame, currentFrame.offsetLeft, currentFrame.offsetTop);

      finalCanvas.width = FRAME_SIZE;
      finalCanvas.height = FRAME_SIZE;

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

      return finalCanvas.toDataURL('image/png', 1.0);
    }
  }
}
