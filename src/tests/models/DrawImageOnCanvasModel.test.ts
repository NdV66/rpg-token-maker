import { DrawImageOnCanvasModel, IImageLoaderModel } from 'models';
import { TestScheduler } from 'rxjs/testing';
import { makeTestScheduler } from 'tests/tools';

const imageLoaderMock: IImageLoaderModel = {
  loadImage: jest.fn(),
};

const defaultImageWidth = 300;
const widthMock = 200;
const heightMock = 600;
const src = 'image.jpg';

describe('DrawImageOnCanvasModel', () => {
  let model: DrawImageOnCanvasModel;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    model = new DrawImageOnCanvasModel(imageLoaderMock);
    testScheduler = makeTestScheduler();
  });

  it('calculateCanvasSize() - should calc correctly', () => {
    const drawHeight = 900;
    const expectedResult = {
      width: widthMock,
      height: drawHeight,
      styleHeight: drawHeight,
      styleWidth: widthMock,
    };

    testScheduler.run(({ expectObservable }) => {
      model.calculateCanvasSize(drawHeight, widthMock);
      expectObservable(model.canvasSize$).toBe('a', { a: expectedResult });
    });
  });

  it('_calculateDrawHeight() - should calculate draw height correctly', () => {
    const expectedDrawHeight = 900;
    const result = model['_calculateDrawHeight'](defaultImageWidth, widthMock, heightMock);
    expect(result).toBe(expectedDrawHeight);
  });

  describe('loadImage()', () => {
    it('Should load an image without any problems', async () => {
      const widthMock = 200;
      const heightMock = 600;
      const drawHeight = 900;

      const image = new Image();
      image.width = widthMock;
      image.height = heightMock;

      imageLoaderMock.loadImage = jest.fn().mockResolvedValue(image);
      model['_calculateDrawHeight'] = jest.fn().mockReturnValue(drawHeight);

      const expectResult = {
        drawHeight,
        image: expect.objectContaining({
          width: widthMock,
          height: heightMock,
        }),
      };

      const result = await model.loadImage(src, defaultImageWidth);
      expect(result).toEqual(expectResult);
    });

    it('Should throw an error, if there is any problem', async () => {
      const expectedError = new Error('Something went wrong');
      imageLoaderMock.loadImage = jest.fn().mockRejectedValue(expectedError);

      await expect(() => model.loadImage(src, defaultImageWidth)).rejects.toThrow(expectedError);
    });
  });
});
