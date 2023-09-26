import { EDotsNames, TDotsRef, TResizeDots } from 'types';

export const updateDotsPositions = (elements: TDotsRef, dotsPositions: TResizeDots) => {
  const values = Object.values(EDotsNames);
  values.forEach((key) => {
    elements[key as EDotsNames].setAttribute(
      'style',
      ` top: ${dotsPositions[key].y}px; left: ${dotsPositions[key as EDotsNames].x}px;`,
    );
  });
};
