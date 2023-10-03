import { DrawImageOnCanvasModel, IImageLoaderModel } from 'models';

const imageLoaderMock: IImageLoaderModel = {
  loadImage: jest.fn(),
};

const defaultImageWidth = 300;
const widthMock = 200;
const heightMock = 600;
const src = 'image.jpg';

describe('DrawImageOnCanvasModel', () => {
  let model: DrawImageOnCanvasModel;

  beforeEach(() => {
    model = new DrawImageOnCanvasModel(imageLoaderMock);
  });

  describe('_calculateDrawHeight()', () => {
    it('Should calculate draw height correctly', () => {
      const expectedDrawHeight = 900;
      const result = model['_calculateDrawHeight'](defaultImageWidth, widthMock, heightMock);
      expect(result).toBe(expectedDrawHeight);
    });
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
