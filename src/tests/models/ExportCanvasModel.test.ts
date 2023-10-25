import { ExportCanvasModel } from 'models';
import { commonErrorMock, imageLoaderModelMock, appEnvMock } from 'tests/mocks';

const contextMock = {
  globalCompositeOperation: 'color',
  drawImage: jest.fn(),
  restore: jest.fn(),
  save: jest.fn(),
} as any as CanvasRenderingContext2D;

const currentImageMock = { offsetLeft: 50, offsetTop: 70 } as any as HTMLCanvasElement;
const currentFrameMock = { offsetLeft: 150, offsetTop: 170 } as any as HTMLCanvasElement;

describe('ExportCanvasModel', () => {
  let model: ExportCanvasModel;

  beforeEach(() => {
    model = new ExportCanvasModel(appEnvMock, imageLoaderModelMock);
  });

  it('_mergeCanvasLayers() - Should merge two canvas layers together', () => {
    model['_mergeCanvasLayers'](contextMock, currentImageMock, currentFrameMock);

    expect(contextMock.drawImage).toHaveBeenCalledTimes(2);
    expect(contextMock.drawImage).toHaveBeenNthCalledWith(1, currentImageMock, currentImageMock.offsetLeft, currentImageMock.offsetTop);
    expect(contextMock.drawImage).toHaveBeenNthCalledWith(2, currentFrameMock, currentFrameMock.offsetLeft, currentFrameMock.offsetTop);
  });

  it('_prepareCanvasForMergeLayers() - Should prepare canvas to be a base for other merged layers, based on the workspace size from env', () => {
    const layer = model['_prepareCanvasForMergeLayers']();

    expect(layer instanceof HTMLCanvasElement).toBe(true);
    expect(layer.width).toBe(appEnvMock.workspaceSize);
    expect(layer.height).toBe(appEnvMock.workspaceSize);
  });

  it('_prepareFinalCanvas() - Should prepare final canvas to contain final merged layers, based on avatar frame size', () => {
    const frameSize = 166;
    const layer = model['_prepareFinalCanvas'](frameSize);

    expect(layer instanceof HTMLCanvasElement).toBe(true);
    expect(layer.width).toBe(frameSize);
    expect(layer.height).toBe(frameSize);
  });

  it('exportToPng() - Should export final merged layers as a one PNG image (mergedLayersContext & finalContext are existed)', async () => {
    const imageLinkMock = 'hereIsMyImage.png';
    const mergedLayersContextMock = {} as any as CanvasRenderingContext2D;
    const finalContextMock = { drawImage: jest.fn() } as any as CanvasRenderingContext2D;
    const mergedLayersCanvasMock = { getContext: jest.fn().mockReturnValue(mergedLayersContextMock) } as any as HTMLCanvasElement;
    const finalCanvasMock = {
      getContext: jest.fn().mockReturnValue(finalContextMock),
      toDataURL: jest.fn().mockReturnValue(imageLinkMock),
    } as any as HTMLCanvasElement;

    model['_prepareCanvasForMergeLayers'] = jest.fn().mockReturnValue(mergedLayersCanvasMock);
    model['_prepareFinalCanvas'] = jest.fn().mockReturnValue(finalCanvasMock);
    model['_mergeCanvasLayers'] = jest.fn();
    model['_drawTokenMask'] = jest.fn();

    const result = await model.exportToPng(currentImageMock, currentFrameMock);

    expect(result).toBe(imageLinkMock);
    expect(model['_prepareCanvasForMergeLayers']).toHaveBeenCalledTimes(1);
    expect(model['_prepareFinalCanvas']).toHaveBeenCalledTimes(1);
    expect(model['_prepareFinalCanvas']).toHaveBeenCalledWith(currentFrameMock.width);
    expect(model['_mergeCanvasLayers']).toHaveBeenCalledTimes(1);
    expect(model['_mergeCanvasLayers']).toHaveBeenCalledWith(mergedLayersContextMock, currentImageMock, currentFrameMock);
    expect(finalCanvasMock.toDataURL).toHaveBeenCalledTimes(1);
    expect(finalCanvasMock.toDataURL).toHaveBeenCalledWith('image/png', 1.0);
    expect(finalContextMock.drawImage).toHaveBeenCalledTimes(1);
    expect(finalContextMock.drawImage).toHaveBeenCalledWith(
      mergedLayersCanvasMock,
      currentFrameMock.offsetLeft,
      currentFrameMock.offsetTop,
      currentFrameMock.width,
      currentFrameMock.width,
      0,
      0,
      currentFrameMock.width,
      currentFrameMock.width,
    );
  });

  describe('_drawTokenMask()', () => {
    const frameSrc = 'anyOkSrc.jpeg';

    it('Should draw token mask on a canvas', async () => {
      const imageMock = new Image();
      imageMock.src = frameSrc;
      imageLoaderModelMock.loadImage = jest.fn().mockResolvedValue(imageMock);

      await model['_drawTokenMask'](contextMock, frameSrc);

      expect(contextMock.save).toHaveBeenCalledTimes(1);
      expect(contextMock.restore).toHaveBeenCalledTimes(1);
      expect(contextMock.globalCompositeOperation).toBe('destination-in');
      expect(contextMock.drawImage).toHaveBeenCalledTimes(1);
      expect(contextMock.drawImage).toHaveBeenCalledWith(imageMock, 0, 0, appEnvMock.defaultFrameSize, appEnvMock.defaultFrameSize);
    });

    it('Should provide error from this._imageLoader.loadImage', async () => {
      imageLoaderModelMock.loadImage = jest.fn().mockRejectedValue(commonErrorMock);
      await expect(() => model['_drawTokenMask'](contextMock, frameSrc)).rejects.toThrow(commonErrorMock);
    });
  });
});
