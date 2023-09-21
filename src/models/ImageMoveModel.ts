import { Observable, ReplaySubject } from 'rxjs';
import { TPosition } from 'types';
import { AMouseHandler, IAMouseHandler } from './AMouseHandler';

export interface IImageMoveModel extends IAMouseHandler {
  elementOffset$: Observable<TPosition>;
  setInitialElementOffset: (offset: TPosition) => void;
  finishMoveImage: () => void;
  moveImage: (event: React.MouseEvent) => void;
  startMoveImage: (topLeftOffset: TPosition, event: React.MouseEvent) => void;
  updateElementPosition: (newPosition: TPosition) => void;
  updateElementPositionRaw: (newPosition: TPosition) => void;
}

const EMPTY_OFFSET: TPosition = { x: 0, y: 0 };

export class ImageMoveModel extends AMouseHandler implements IImageMoveModel {
  private _elementOffset$ = new ReplaySubject<TPosition>();
  private _currentOffset = EMPTY_OFFSET;

  public readonly elementOffset$ = this._elementOffset$.asObservable();

  public setInitialElementOffset(offset: TPosition) {
    this._elementOffset$.next(offset);
    this._currentOffset = offset;
  }

  public moveImage = (event: React.MouseEvent) => {
    if (this.isMouseDown) {
      const value = {
        x: event.pageX + this._currentOffset.x,
        y: event.pageY + this._currentOffset.y,
      };
      this.updateElementPosition(value);
    }
  };

  public updateElementPosition = (newPosition: TPosition) => {
    this._elementOffset$.next(newPosition);
  };

  public updateElementPositionRaw = (newPosition: TPosition) => {
    this._currentOffset = EMPTY_OFFSET;
    this._elementOffset$.next(newPosition);
  };

  public finishMoveImage() {
    this.turnOffIsMouseDown();
  }

  public startMoveImage = (topLeftOffset: TPosition, event: React.MouseEvent) => {
    this.turnOnIsMouseDown();
    const offset: TPosition = {
      x: topLeftOffset.x - event.pageX,
      y: topLeftOffset.y - event.pageY,
    };
    this._currentOffset = offset;
  };
}
