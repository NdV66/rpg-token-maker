import { ResizeImageCalculationsModel } from 'models';
import { TPosition, TSize } from 'types';

describe('ResizeImageCalculationsModel', () => {
  let model: ResizeImageCalculationsModel;

  beforeEach(() => {
    model = new ResizeImageCalculationsModel();
  });

  it('Should calculate correct offset between point and a mouse position', () => {
    const point: TPosition = { x: 10, y: 20 };
    const mousePosition: TPosition = { x: 100, y: 200 };
    const expectedResult: TPosition = {
      x: Math.abs(mousePosition.x - point.x),
      y: Math.abs(mousePosition.y - point.y),
    };

    const result = model.calcOffset(mousePosition, point);
    expect(result).toEqual(expectedResult);
  });

  it('Should calc correct image height by ratio and width', () => {
    const ratio = 2;
    const width = 100;
    const expectedHeight = width / ratio;

    const result = model.calcHeightByRatio(width, ratio);
    expect(result).toEqual(expectedHeight);
  });

  it('Should calc correct image width by ratio and height', () => {
    const ratio = 2;
    const height = 100;
    const expectedWidth = height * ratio;

    const result = model.calcWidthByRatio(height, ratio);
    expect(result).toEqual(expectedWidth);
  });

  describe('keepMinSize()', () => {
    it('Should return untouched image size, when everything is ok', () => {
      const size: TSize = { width: 300, height: 300 };
      const minSize = 100;
      const expectedResult: TSize = { ...size };

      const result = model.keepMinSize(size, minSize);
      expect(result).toEqual(expectedResult);
    });

    it('Should recalculate width (width < minSize)', () => {
      const size: TSize = { width: 50, height: 300 };
      const minSize = 100;
      const expectedResult: TSize = { width: minSize, height: size.height };

      const result = model.keepMinSize(size, minSize);
      expect(result).toEqual(expectedResult);
    });

    it('Should recalculate height (height < minSize)', () => {
      const size: TSize = { width: 300, height: 50 };
      const minSize = 100;
      const expectedResult: TSize = { width: size.width, height: minSize };

      const result = model.keepMinSize(size, minSize);
      expect(result).toEqual(expectedResult);
    });
  });
});
