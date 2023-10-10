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
});
