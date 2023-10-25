import { IDrawImageOnCanvasModel } from 'models';
import { Subject } from 'rxjs';
import { AvatarFrameComponentViewModel } from 'viewModels';

const drawImageOnCanvasModelMock: IDrawImageOnCanvasModel = {
  calculateCanvasSize: jest.fn(),
  canvasSize$: new Subject(),
  loadImage: jest.fn(),
};

describe('AvatarFrameComponentViewModel', () => {
  let viewModel: AvatarFrameComponentViewModel;

  beforeEach(() => {
    viewModel = new AvatarFrameComponentViewModel(drawImageOnCanvasModelMock);
  });

  it('Should load image', async () => {
    const imageSrc = 'imageSrc.jpeg';
    const defaultImageWidth = 100;
    const expectedResult = { drawHeight: 100, image: new Image() };
    drawImageOnCanvasModelMock.loadImage = jest.fn().mockResolvedValue(expectedResult);

    const result = await viewModel.loadImage(imageSrc, defaultImageWidth);

    expect(drawImageOnCanvasModelMock.loadImage).toHaveBeenCalledTimes(1);
    expect(drawImageOnCanvasModelMock.loadImage).toHaveBeenCalledWith(imageSrc, defaultImageWidth);
    expect(result).toEqual(expectedResult);
  });

  it('Should calculate canvas size', () => {
    const drawHeight = 200;
    const defaultImageWidth = 140;

    viewModel.calculateCanvasSize(drawHeight, defaultImageWidth);

    expect(drawImageOnCanvasModelMock.calculateCanvasSize).toHaveBeenCalledTimes(1);
    expect(drawImageOnCanvasModelMock.calculateCanvasSize).toHaveBeenCalledWith(drawHeight, defaultImageWidth);
  });
});
