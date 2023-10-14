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
      const mousePosition: TPosition = { x: point.x - 10, y: point.y - 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointA(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on left from the point A and below it (mousePosition.x < A.x && mousePosition.y > A.y)', () => {
      const mousePosition: TPosition = { x: point.x - 10, y: point.y + 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointA(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on the right of the point A and above it (mousePosition.x > A.x && mousePosition.y < A.y)', () => {
      const mousePosition: TPosition = { x: point.x + 10, y: point.y - 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointA(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on the right of the point A and below it (mousePosition.x > A.x && mousePosition.y > A.y)', () => {
      const mousePosition: TPosition = { x: point.x + 10, y: point.y + 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointA(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('calcSizeByPointB() - Should calculate an image size by point B', () => {
    const point: TPosition = { x: 120, y: 24 };

    it('- when mouse position is on right from the point B and above it (mousePosition.x > B.x && mousePosition.y < B.y)', () => {
      const mousePosition: TPosition = { x: point.x + 10, y: point.y - 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointB(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on right from the point B and below it (mousePosition.x > B.x && mousePosition.y > B.y)', () => {
      const mousePosition: TPosition = { x: point.x + 10, y: point.y + 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointB(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on left from the point B and above it (mousePosition.x < B.x && mousePosition.y < B.y)', () => {
      const mousePosition: TPosition = { x: point.x - 10, y: point.y - 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointB(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on left from the point B and below it (mousePosition.x < B.x && mousePosition.y > B.y)', () => {
      const mousePosition: TPosition = { x: point.x - 10, y: point.y + 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointB(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('calcSizeByPointC() - Should calculate an image size by point C', () => {
    const point: TPosition = { x: 120, y: 200 };

    it('- when mouse position is on right from the point C and above it (mousePosition.x > C.x && mousePosition.y < C.y)', () => {
      const mousePosition: TPosition = { x: point.x + 10, y: point.y - 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointC(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on right from the point C and below it (mousePosition.x > C.x && mousePosition.y > C.y)', () => {
      const mousePosition: TPosition = { x: point.x + 10, y: point.y + 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointC(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on left from the point C and above it (mousePosition.x < C.x && mousePosition.y < C.y)', () => {
      const mousePosition: TPosition = { x: point.x - 10, y: point.y - 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointC(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on left from the point C and below it (mousePosition.x < C.x && mousePosition.y > C.y)', () => {
      const mousePosition: TPosition = { x: point.x - 10, y: point.y + 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointC(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('calcSizeByPointD() - Should calculate an image size by point C', () => {
    const point: TPosition = { x: 20, y: 200 };

    it('- when mouse position is on left from the point D and above it (mousePosition.x < D.x && mousePosition.y < D.y)', () => {
      const mousePosition: TPosition = { x: point.x - 10, y: point.y - 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointD(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on left from the point D and below it (mousePosition.x < D.x && mousePosition.y > D.y)', () => {
      const mousePosition: TPosition = { x: point.x - 10, y: point.y + 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width + DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointD(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on right from the point D and above it (mousePosition.x > D.x && mousePosition.y < D.y)', () => {
      const mousePosition: TPosition = { x: point.x + 10, y: point.y - 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height - DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointD(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });

    it('- when mouse position is on right from the point D and below it (mousePosition.x > D.x && mousePosition.y > D.y)', () => {
      const mousePosition: TPosition = { x: point.x + 10, y: point.y + 10 };
      const offset = calcAbsOffset(point, mousePosition);
      const expectedResult: TSize = {
        width: imageSize.width - DOUBLE * offset.x,
        height: imageSize.height + DOUBLE * offset.y,
      };

      const result = model.calcSizeByPointD(imageSize, mousePosition, point, offset);
      expect(result).toEqual(expectedResult);
    });
  });
});
