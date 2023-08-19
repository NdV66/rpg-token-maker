import { BehaviorSubject, Observable } from 'rxjs';
import { TPosition } from 'types';
import { AMouseHandler, IAMouseHandler } from './AMouseHandler';

export interface IAvatarImageMoveModel extends IAMouseHandler {
  elementOffset$: Observable<TPosition>;

  handleMouseUp: () => void;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseMove2: (event: React.MouseEvent) => void;
  handleMouseDown: <T extends HTMLElement>(element: T, event: React.MouseEvent) => void;
  updateElementPosition: (newPosition: TPosition) => void;
}

const START_OFFSET: TPosition = { x: 50, y: 50 };

export class AvatarImageMoveModel extends AMouseHandler implements IAvatarImageMoveModel {
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

  public handleMouseMove2 = (event: React.MouseEvent) => {
    const value = {
      x: event.pageX + this._currentOffset.x,
      y: event.pageY + this._currentOffset.y,
    };
    this.updateElementPosition(value);
  };

  public updateElementPosition = (newPosition: TPosition) => {
    this._elementOffset$.next(newPosition);
  };

  public handleMouseUp() {
    this.turnOffIsMouseDown();
  }

  public handleMouseDown = <T extends HTMLElement>(element: T, event: React.MouseEvent) => {
    this.turnOnIsMouseDown();
    const offset: TPosition = {
      x: element.offsetLeft - event.pageX, //is this A point? topLeft
      y: element.offsetTop - event.pageY,
    };
    this._currentOffset = offset;
  };
}
