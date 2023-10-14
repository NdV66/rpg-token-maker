import { ResizeImageCalculationModel, DOUBLE } from 'models/ResizeImageCalculationModel';
import { TPosition, TSize } from 'types';

const imageSize: TSize = { height: 100, width: 100 };

const calcAbsOffset = (point: TPosition, mousePosition: TPosition): TPosition => ({
  x: Math.abs(point.x - mousePosition.x),
  y: Math.abs(point.y - mousePosition.y),
});

describe('ResizeImageCalculationModel', () => {
  let model: ResizeImageCalculationModel;

  beforeEach(() => {
    model = new ResizeImageCalculationModel();
  });

  describe('calcSizeByPointA() - Should calculate an image size by point A', () => {
    const point: TPosition = { x: 20, y: 24 };

    it('- when mouse position is on left from the point A and above it (mousePosition.x < A.x && mousePosition.y < A.y)', () => {
      const mousePosition: TPosition = { x: 10, y: 6 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointA(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on left from the point A and below it (mousePosition.x < A.x && mousePosition.y > A.y)', () => {
      const mousePosition: TPosition = { x: 10, y: 36 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointA(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on the right of the point A and above it (mousePosition.x > A.x && mousePosition.y < A.y)', () => {
      const mousePosition: TPosition = { x: 20, y: 4 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointA(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on the right of the point A and below it (mousePosition.x > A.x && mousePosition.y > A.y)', () => {
      const mousePosition: TPosition = { x: 20, y: 46 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointA(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });
  });
});
