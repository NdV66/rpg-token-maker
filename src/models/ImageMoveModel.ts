import { BehaviorSubject, Observable } from 'rxjs';
import { TPosition } from 'types';
import { AMouseHandler, IAMouseHandler } from './AMouseHandler';

export interface IImageMoveModel extends IAMouseHandler {
  elementOffset$: Observable<TPosition>;

  handleMouseUp: () => void;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseDown: (topLeftOffset: TPosition, event: React.MouseEvent) => void;
  updateElementPosition: (newPosition: TPosition) => void;
  updateElementPositionRaw: (newPosition: TPosition) => void;
}

const START_OFFSET: TPosition = { x: 50, y: 50 };

export class ImageMoveModel extends AMouseHandler implements IImageMoveModel {
  private _elementOffset$ = new BehaviorSubject<TPosition>(START_OFFSET);
  private _currentOffset = START_OFFSET;

  public readonly elementOffset$ = this._elementOffset$.asObservable();

  public handleMouseMove = (event: React.MouseEvent) => {
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
    this._currentOffset = { x: 0, y: 0 };
    this._elementOffset$.next(newPosition);
  };

  public handleMouseUp() {
    this.turnOffIsMouseDown();
  }

  public handleMouseDown = (topLeftOffset: TPosition, event: React.MouseEvent) => {
    this.turnOnIsMouseDown();
    const offset: TPosition = {
      x: topLeftOffset.x - event.pageX,
      y: topLeftOffset.y - event.pageY,
    };
    this._currentOffset = offset;
  };
}

// x: element.offsetLeft - event.pageX,
// y: element.offsetTop - event.pageY,
