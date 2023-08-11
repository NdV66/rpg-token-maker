import { EDotsNames } from './EDotsNames';
import { TPosition } from './TPosition';

export type TResizeDots = {
  [key in EDotsNames]: TPosition;
};
