import { DrawImageOnCanvasModel, IImageLoaderModel } from 'models';

const imageLoaderMock: IImageLoaderModel = {
  loadImage: jest.fn(),
};

const defaultImageWidth = 300;
const src = 'image.jpg';

describe('DrawImageOnCanvasModel', () => {
  let model: DrawImageOnCanvasModel;

  beforeEach(() => {
    model = new DrawImageOnCanvasModel(imageLoaderMock);
  });

  describe('loadImage()', () => {
    it('Should load an image without any problems', async () => {
      const widthMock = 200;
      const heightMock = 600;

      const image = new Image();
      image.width = widthMock;
      image.height = heightMock;
      imageLoaderMock.loadImage = jest.fn().mockResolvedValue(image);

      const expectResult = {
        drawHeight: 900, //(defaultImageWidth * height) / width
        image: expect.objectContaining({
          width: widthMock,
          height: heightMock,
        }),
      };

      const result = await model.loadImage(src, defaultImageWidth);
      expect(result).toEqual(expectResult);
    });

    it('Should throw an error, if there is any problem', async () => {
      const expectedError = new Error('a');
      imageLoaderMock.loadImage = jest.fn().mockRejectedValue(expectedError);

      await expect(() => model.loadImage(src, defaultImageWidth)).rejects.toThrow(expectedError);
    });
  });
});
