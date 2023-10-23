import { ImageMoveModel } from 'models';
import { makeTestScheduler } from './tools';
import { TPosition } from 'types';

const initialOffsetMock: TPosition = { x: 10, y: 20 };
const eventMock = { pageX: 100, pageY: 200 } as any as React.MouseEvent;

describe('ImageMoveModel', () => {
  let model: ImageMoveModel;
  let testScheduler = makeTestScheduler();

  beforeEach(() => {
    model = new ImageMoveModel();
  });

  it('setInitialElementOffset() - Should set initial offset', () => {
    testScheduler.run(({ expectObservable }) => {
      model.setInitialElementOffset(initialOffsetMock);

      expectObservable(model.elementOffset$).toBe('a', { a: initialOffsetMock });
      expect(model['_currentOffset']).toEqual(initialOffsetMock);
    });
  });

  it('updateElementPosition() - Should update element position', () => {
    testScheduler.run(({ expectObservable }) => {
      const newPositionMock: TPosition = { x: 200, y: 400 };
      model.updateElementPosition(newPositionMock);
      expectObservable(model['_elementOffset$']).toBe('a', { a: newPositionMock });
    });
  });

  it('finishMoveImage() - Should set _isMouseDown to false', () => {
    model['_isMouseDown'] = true;
    model.finishMoveImage();
    expect(model['_isMouseDown']).toBe(false);
  });

  it('startMoveImage() - Should start moving the image', () => {
    const topLeftOffsetMock: TPosition = { x: 10, y: 20 };
    const expectedOffset: TPosition = {
      x: topLeftOffsetMock.x - eventMock.pageX,
      y: topLeftOffsetMock.y - eventMock.pageY,
    };
    model.turnOnIsMouseDown = jest.fn();

    model.startMoveImage(topLeftOffsetMock, eventMock);

    expect(model['_currentOffset']).toEqual(expectedOffset);
    expect(model.turnOnIsMouseDown).toHaveBeenCalledTimes(1);
  });

  describe('moveImage()', () => {
    beforeEach(() => {
      model['_currentOffset'] = initialOffsetMock;
      model.updateElementPosition = jest.fn();
    });

    it('Should move an image, when mouse is down', () => {
      const expectedValue = { x: eventMock.pageX + initialOffsetMock.x, y: eventMock.pageY + initialOffsetMock.y };
      model['_isMouseDown'] = true;

      model.moveImage(eventMock);

      expect(model.updateElementPosition).toHaveBeenCalledTimes(1);
      expect(model.updateElementPosition).toHaveBeenCalledWith(expectedValue);
    });

    it('Should NOT move an image, when mouse is NOT down', () => {
      const eventMock = { pageX: 100, pageY: 200 } as any as React.MouseEvent;
      model['_isMouseDown'] = false;

      model.moveImage(eventMock);

      expect(model.updateElementPosition).not.toHaveBeenCalled();
    });
  });
});
