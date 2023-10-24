import { TopLeftCssCalculatorModel } from 'models';
import { EDotsNames, TPosition, TSize } from 'types';

const parentOffset: TPosition = { x: 10, y: 20 };
const imageSize: TSize = { width: 200, height: 200 };
const mousePosition: TPosition = { x: 100, y: 100 };

describe('TopLeftCssCalculatorModel', () => {
  let model: TopLeftCssCalculatorModel;

  beforeEach(() => {
    model = new TopLeftCssCalculatorModel();
  });

  //point name, mouse position, expected result
  const cases = [
    [EDotsNames.A, mousePosition, { x: 90, y: 80 }],
    [EDotsNames.B, mousePosition, { x: -110, y: 80 }],
    [EDotsNames.C, mousePosition, { x: -110, y: -120 }],
    [EDotsNames.D, mousePosition, { x: 90, y: -120 }],
  ];

  test.each(cases)('Should calculate top left CSS position, based on point %p', (pointName, mousePosition, expectedResult) => {
    const result = model.calcTopLeftCss(pointName as EDotsNames, parentOffset, imageSize, mousePosition as TPosition);
    expect(result).toEqual(expectedResult);
  });
});
