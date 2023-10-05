import { appEnvMock } from 'appEnv';
import { ExportCanvasModel } from 'models';
import { commonErrorMock, imageLoaderModelMock } from 'tests/mocks';

const contextMock = {
  globalCompositeOperation: 'color',
  drawImage: jest.fn(),
  restore: jest.fn(),
  save: jest.fn(),
} as any as CanvasRenderingContext2D;

describe('ExportCanvasModel', () => {
  let model: ExportCanvasModel;

  beforeEach(() => {
    model = new ExportCanvasModel(appEnvMock, imageLoaderModelMock);
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
      expect(contextMock.drawImage).toHaveBeenCalledWith(
        imageMock,
        0,
        0,
        appEnvMock.defaultFrameSize,
        appEnvMock.defaultFrameSize,
      );
    });

    it('Should provide error from this._imageLoader.loadImage', async () => {
      imageLoaderModelMock.loadImage = jest.fn().mockRejectedValue(commonErrorMock);
      await expect(() => model['_drawTokenMask'](contextMock, frameSrc)).rejects.toThrow(
        commonErrorMock,
      );
    });
  });
});
