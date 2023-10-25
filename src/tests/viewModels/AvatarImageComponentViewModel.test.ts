import { Observable } from 'rxjs';
import { drawImageOnCanvasModelMock, imageMoveModelMock } from 'tests/mocks';
import { TPosition } from 'types';
import { AvatarImageComponentViewModel } from 'viewModels';

describe('AvatarImageComponentViewModel', () => {
  let viewModel: AvatarImageComponentViewModel;

  beforeEach(() => {
    viewModel = new AvatarImageComponentViewModel(drawImageOnCanvasModelMock, imageMoveModelMock);
  });

  it('Should set initial values', () => {
    const offset: TPosition = { x: 100, y: 200 };

    viewModel.setInitialElementOffset(offset);

    expect(imageMoveModelMock.setInitialElementOffset).toHaveBeenCalledTimes(1);
    expect(imageMoveModelMock.setInitialElementOffset).toHaveBeenCalledWith(offset);
  });

  it('Should calculate canvas size', () => {
    const drawHeight = 200;
    const defaultImageWidth = 140;

    viewModel.calculateCanvasSize(drawHeight, defaultImageWidth);

    expect(drawImageOnCanvasModelMock.calculateCanvasSize).toHaveBeenCalledTimes(1);
    expect(drawImageOnCanvasModelMock.calculateCanvasSize).toHaveBeenCalledWith(drawHeight, defaultImageWidth);
  });

  it('Should turn off isMouseDown', () => {
    viewModel.turnOffIsMouseDown();
    expect(imageMoveModelMock.turnOffIsMouseDown).toHaveBeenCalledTimes(1);
  });

  it('Should create RXJS event from mouse event', () => {
    const element = document.createElement('div');
    const trigger = 'mousemove';
    imageMoveModelMock.fromMouseEvent = jest.fn().mockReturnValue(new Observable());

    const result$ = viewModel.fromMouseEvent(element, trigger);

    expect(imageMoveModelMock.fromMouseEvent).toHaveBeenCalledTimes(1);
    expect(imageMoveModelMock.fromMouseEvent).toHaveBeenCalledWith(element, trigger);
    expect(result$).toBeInstanceOf(Observable<React.MouseEvent<Element, MouseEvent>>);
  });

  it('Should move image', () => {
    const event = {} as React.MouseEvent;

    viewModel.moveImage(event);

    expect(imageMoveModelMock.moveImage).toHaveBeenCalledTimes(1);
    expect(imageMoveModelMock.moveImage).toHaveBeenCalledWith(event);
  });

  it('Should start move image', () => {
    const element = { offsetLeft: 100, offsetTop: 200 } as HTMLElement;
    const event = {} as React.MouseEvent;
    const expectedTopLeftOffset: TPosition = { x: element.offsetLeft, y: element.offsetTop };

    viewModel.startMoveImage(element, event);

    expect(imageMoveModelMock.startMoveImage).toHaveBeenCalledTimes(1);
    expect(imageMoveModelMock.startMoveImage).toHaveBeenCalledWith(expectedTopLeftOffset, event);
  });

  it('Should load image', () => {
    const src = 'myImage.jpeg';
    const width = 200;

    viewModel.loadImage(src, width);

    expect(drawImageOnCanvasModelMock.loadImage).toHaveBeenCalledTimes(1);
    expect(drawImageOnCanvasModelMock.loadImage).toHaveBeenCalledWith(src, width);
  });
});
