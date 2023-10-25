import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { drawImageOnCanvasModelMock, imageResizeModelFactoryMock, moveImageViewModelMock, resizeImageModelMock, topLeftCssCalculatorMock } from 'tests/mocks';
import { makeTestScheduler } from 'tests/tools';
import { EDotsNames, TCanvasSize, TPosition, TSize } from 'types';
import { ResizeAvatarImageComponentViewModel } from 'viewModels';

describe('ResizeAvatarImageComponentViewModel', () => {
  let viewModel: ResizeAvatarImageComponentViewModel;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    viewModel = new ResizeAvatarImageComponentViewModel(drawImageOnCanvasModelMock, moveImageViewModelMock, imageResizeModelFactoryMock, topLeftCssCalculatorMock);
    testScheduler = makeTestScheduler();
  });

  it('Should update current size on enter', () => {
    const size: TCanvasSize = { height: 100, width: 100, styleHeight: 100, styleWidth: 100 };
    const offset: TPosition = { x: 10, y: 20 };
    const expectedResult = { size, offset };
    drawImageOnCanvasModelMock.canvasSize$ = new Observable((observer) => observer.next(size));
    moveImageViewModelMock.elementOffset$ = new Observable((observer) => observer.next(offset));

    testScheduler.run(({ expectObservable }) => {
      viewModel = new ResizeAvatarImageComponentViewModel(drawImageOnCanvasModelMock, moveImageViewModelMock, imageResizeModelFactoryMock, topLeftCssCalculatorMock);
      expectObservable(viewModel['_currentSizeWithTopLeftPosition$']).toBe('a', { a: expectedResult });
    });
  });

  it('Should handle finish resize', () => {
    viewModel.handleFinishResize();

    expect(viewModel['_currentImageResizeModel']).toBe(null);
    expect(viewModel['_isMouseDown']).toBe(false);
    expect(moveImageViewModelMock.finishMoveImage).toHaveBeenCalledTimes(1);
  });

  it('Should handle start resize', () => {
    const image = { width: 100, height: 100 } as HTMLCanvasElement;

    viewModel.handleStartResize(image);

    expect(viewModel['_currentImageResizeModel']).not.toBe(null);
    expect(viewModel['_isMouseDown']).toBe(true);
  });

  it('Should prepare offset for dots (points)', () => {
    const position: TPosition = { x: 100, y: 200 };
    const imageWidth = 110;
    const imageHeight = 120;
    const expectedResult = {
      [EDotsNames.A]: { x: position.x, y: position.y },
      [EDotsNames.B]: { x: position.x + imageWidth, y: position.y },
      [EDotsNames.C]: { x: position.x + imageWidth, y: position.y + imageHeight },
      [EDotsNames.D]: { x: position.x, y: position.y + imageHeight },
    };

    const result = viewModel.prepareOffsetsForDots(position, imageWidth, imageHeight);

    expect(result).toEqual(expectedResult);
  });

  describe('Should handle resize an image', () => {
    const doNothingCases = [
      [
        () => {
          viewModel['_isMouseDown'] = false;
          viewModel['_currentImageResizeModel'] = resizeImageModelMock;
          return viewModel;
        },
      ],
      [
        () => {
          viewModel['_isMouseDown'] = false;
          viewModel['_currentImageResizeModel'] = null;
          return viewModel;
        },
      ],
      [
        () => {
          viewModel['_isMouseDown'] = true;
          viewModel['_currentImageResizeModel'] = null;
          return viewModel;
        },
      ],
    ];

    test.each(doNothingCases)('and do nothing, when statement is false', (setupViewModel) => {
      const event = {} as React.MouseEvent;
      const image = {} as HTMLCanvasElement;
      const viewModel = setupViewModel();

      viewModel.handleResize(EDotsNames.A, event, image);

      expect(resizeImageModelMock.calcResize).not.toHaveBeenCalled();
      expect(topLeftCssCalculatorMock.calcTopLeftCss).not.toHaveBeenCalled();
      expect(moveImageViewModelMock.turnOffIsMouseDown).not.toHaveBeenCalled();
      expect(drawImageOnCanvasModelMock.calculateCanvasSize).not.toHaveBeenCalled();
      expect(moveImageViewModelMock.updateElementPosition).not.toHaveBeenCalled();
    });

    it('and do it correctly', () => {
      //Given
      const currentDot = EDotsNames.B;
      const imageRect = { left: 100, top: 50 };
      const pageXY = { pageX: 10, pageY: 20 };
      const parentElement = { offsetLeft: 5, offsetTop: 4 } as any as HTMLDivElement;
      const newImageSize: TSize = { width: 80, height: 90 };
      const cssA = { top: 10, left: 14 };
      const event = { ...pageXY } as React.MouseEvent;
      const mousePosition: TPosition = { x: event.pageX, y: event.pageY };
      const image = {
        parentElement,
        getBoundingClientRect: jest.fn().mockReturnValue(imageRect),
      } as any as HTMLCanvasElement;
      const A: TPosition = { x: imageRect.left, y: imageRect.top }; //pageX and pageY for HTML element
      const parentOffset = {
        x: image.parentElement!.offsetLeft,
        y: image.parentElement!.offsetTop,
      };
      resizeImageModelMock.calcResize = jest.fn().mockReturnValue(newImageSize);
      topLeftCssCalculatorMock.calcTopLeftCss = jest.fn().mockReturnValue(cssA);
      viewModel['_isMouseDown'] = true;
      viewModel['_currentImageResizeModel'] = resizeImageModelMock;

      //When
      viewModel.handleResize(currentDot, event, image);

      //Then
      expect(resizeImageModelMock.calcResize).toHaveBeenCalledTimes(1);
      expect(resizeImageModelMock.calcResize).toHaveBeenCalledWith(currentDot, mousePosition, { width: image.width, height: image.height }, A);
      expect(topLeftCssCalculatorMock.calcTopLeftCss).toHaveBeenCalledTimes(1);
      expect(topLeftCssCalculatorMock.calcTopLeftCss).toHaveBeenCalledWith(currentDot, parentOffset, newImageSize, mousePosition);
      expect(moveImageViewModelMock.turnOffIsMouseDown).toHaveBeenCalledTimes(1);
      expect(drawImageOnCanvasModelMock.calculateCanvasSize).toHaveBeenCalledTimes(1);
      expect(drawImageOnCanvasModelMock.calculateCanvasSize).toHaveBeenCalledWith(newImageSize.height, newImageSize.width);
      expect(moveImageViewModelMock.updateElementPosition).toHaveBeenCalledTimes(1);
      expect(moveImageViewModelMock.updateElementPosition).toHaveBeenCalledWith(cssA);
    });
  });
});
