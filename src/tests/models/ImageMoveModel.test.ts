import { ImageMoveModel } from 'models';
import { makeTestScheduler } from 'tests/tools';
import { TPosition } from 'types';

const initialOffsetMock: TPosition = { x: 10, y: 20 };

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

  describe('moveImage()', () => {
    beforeEach(() => {
      model['_currentOffset'] = initialOffsetMock;
      model.updateElementPosition = jest.fn();
    });

    it('Should move an image, when mouse is down', () => {
      const eventMock = { pageX: 100, pageY: 200 } as any as React.MouseEvent;
      const expectedValue = { x: eventMock.pageX + initialOffsetMock.x, y: eventMock.pageY + initialOffsetMock.y };
      model['_isDown'] = true;

      model.moveImage(eventMock);

      expect(model.updateElementPosition).toHaveBeenCalledTimes(1);
      expect(model.updateElementPosition).toHaveBeenCalledWith(expectedValue);
    });

    it('Should NOT move an image, when mouse is NOT down', () => {
      const eventMock = { pageX: 100, pageY: 200 } as any as React.MouseEvent;
      model['_isDown'] = false;

      model.moveImage(eventMock);

      expect(model.updateElementPosition).not.toHaveBeenCalled();
    });
  });
});
