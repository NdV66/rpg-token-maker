import { IResizeImageCalculationsModel, ResizeImageModel, imageResizeModelFactory } from 'models';
import { appEnvMock } from './mocks';
import { IResizeImageCalculationPointsModel } from 'models/ResizeImageCalculationPointsModel';
import { EDotsNames, TPosition, TSize } from 'types';

const ratioMock = 2;
const A: TPosition = { x: 20, y: 20 };
const imageSizeMock: TSize = { width: 100, height: 100 };

const resizeImageCalculationPointsModelMock: IResizeImageCalculationPointsModel = {
  calcSizeByPointA: jest.fn(),
  calcSizeByPointB: jest.fn(),
  calcSizeByPointC: jest.fn(),
  calcSizeByPointD: jest.fn(),
};
const resizeImageCalculationsModelMock: IResizeImageCalculationsModel = {
  calcHeightByRatio: jest.fn(),
  calcOffset: jest.fn(),
  calcWidthByRatio: jest.fn(),
  keepMinSize: jest.fn(),
};

describe('ResizeImageModel', () => {
  let model: ResizeImageModel;

  beforeEach(() => {
    resizeImageCalculationsModelMock.calcHeightByRatio = jest.fn((width: number, ratio: number) => width / ratio);
    resizeImageCalculationsModelMock.calcWidthByRatio = jest.fn((height: number, ratio: number) => height * ratio);
    resizeImageCalculationsModelMock.calcOffset = jest.fn((mousePosition: TPosition, point: TPosition) => ({
      x: Math.abs(mousePosition.x - point.x),
      y: Math.abs(mousePosition.y - point.y),
    }));

    model = new ResizeImageModel(ratioMock, appEnvMock, resizeImageCalculationPointsModelMock, resizeImageCalculationsModelMock);
  });

  describe('Should get model by a factory', () => {
    const modelCreatorFromFactory = imageResizeModelFactory(appEnvMock, resizeImageCalculationPointsModelMock, resizeImageCalculationsModelMock);
    const model = modelCreatorFromFactory(ratioMock);

    expect(typeof modelCreatorFromFactory).toBe('function');
    expect(model instanceof ResizeImageModel).toBe(true);
  });

  describe('Should calc correct resize by point A', () => {
    // mousePosition, newRawSize, expectedSize
    const cases: Array<TPosition | TSize>[] = [
      [
        //width by ratio
        { x: 50, y: 100 },
        { width: 70, height: 20 },
        { width: ratioMock * 20, height: 20 },
      ],
      [
        //height by ratio
        { x: 100, y: 50 },
        { width: 180, height: 70 },
        { width: 180, height: 180 / ratioMock },
      ],
    ];

    test.each(cases)('Should %p as %p', (mousePosition, newRawSize, expectedSize) => {
      resizeImageCalculationPointsModelMock.calcSizeByPointA = jest.fn().mockReturnValueOnce(newRawSize);
      resizeImageCalculationsModelMock.keepMinSize = jest.fn().mockReturnValue(newRawSize);

      const result = model.calcResize(EDotsNames.A, mousePosition as TPosition, imageSizeMock, A);
      expect(result).toEqual(expectedSize);
    });
  });

  describe('Should calc correct resize by point B', () => {
    // mousePosition, newRawSize, expectedSize
    const cases: Array<TPosition | TSize>[] = [
      [
        //width by ratio
        { x: 100, y: 50 },
        { width: 80, height: 70 },
        { width: 70 * ratioMock, height: 70 },
      ],
      [
        //height by ratio
        { x: 30, y: 50 },
        { width: 10, height: 70 },
        { width: 10, height: 10 / ratioMock },
      ],
    ];

    test.each(cases)('Should calc with %p mouse position, %p new raw size as %p expected size', (mousePosition, newRawSize, expectedSize) => {
      resizeImageCalculationPointsModelMock.calcSizeByPointB = jest.fn().mockReturnValueOnce(newRawSize);
      resizeImageCalculationsModelMock.keepMinSize = jest.fn().mockReturnValue({ ...newRawSize });

      const result = model.calcResize(EDotsNames.B, mousePosition as TPosition, imageSizeMock, A);
      expect(result).toEqual(expectedSize);
    });
  });

  describe('Should calc correct resize by point C', () => {
    // mousePosition, newRawSize, expectedSize
    const cases: Array<TPosition | TSize>[] = [
      [
        //width by ratio
        { x: 100, y: 50 },
        { width: 80, height: 30 },
        { width: 30 * ratioMock, height: 30 },
      ],
      [
        //height by ratio
        { x: 50, y: 100 },
        { width: 30, height: 100 },
        { width: 30, height: 30 / ratioMock },
      ],
    ];

    test.each(cases)('Should calc with %p mouse position, %p new raw size as %p expected size', (mousePosition, newRawSize, expectedSize) => {
      resizeImageCalculationPointsModelMock.calcSizeByPointC = jest.fn().mockReturnValueOnce(newRawSize);
      resizeImageCalculationsModelMock.keepMinSize = jest.fn().mockReturnValue({ ...newRawSize });

      const result = model.calcResize(EDotsNames.C, mousePosition as TPosition, imageSizeMock, A);
      expect(result).toEqual(expectedSize);
    });
  });

  describe('Should calc correct resize by point D', () => {
    // mousePosition, newRawSize, expectedSize
    const cases: Array<TPosition | TSize>[] = [
      [
        //width by ratio
        { x: 80, y: 40 },
        { width: 40, height: 20 },
        { width: 20 * ratioMock, height: 20 },
      ],
      [
        //height by ratio
        { x: 100, y: 80 },
        { width: 20, height: 60 },
        { width: 20, height: 20 / ratioMock },
      ],
    ];

    test.each(cases)('Should calc with %p mouse position, %p new raw size as %p expected size', (mousePosition, newRawSize, expectedSize) => {
      resizeImageCalculationPointsModelMock.calcSizeByPointD = jest.fn().mockReturnValueOnce(newRawSize);
      resizeImageCalculationsModelMock.keepMinSize = jest.fn().mockReturnValue({ ...newRawSize });

      const result = model.calcResize(EDotsNames.D, mousePosition as TPosition, imageSizeMock, A);
      expect(result).toEqual(expectedSize);
    });
  });
});
