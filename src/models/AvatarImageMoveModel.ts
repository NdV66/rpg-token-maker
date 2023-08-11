import { BehaviorSubject, Observable } from 'rxjs';
import { TPosition } from 'types';
import { AMouseHandler, IAMouseHandler } from './AMouseHandler';

export interface IAvatarImageMoveModel extends IAMouseHandler {
  elementOffset$: Observable<TPosition>;

  handleMoveElement: (event: React.MouseEvent) => void;
  handleMouseDown: <T extends HTMLElement>(element: T, event: React.MouseEvent) => void;
}

const START_OFFSET: TPosition = { x: 0, y: 0 };

export class AvatarImageMoveModel extends AMouseHandler implements IAvatarImageMoveModel {
  private _elementOffset$ = new BehaviorSubject<TPosition>(START_OFFSET);
  private _currentOffset = START_OFFSET;

  public readonly elementOffset$ = this._elementOffset$.asObservable();

  public handleMoveElement = (event: React.MouseEvent) => {
    if (this.isMouseDown) {
      const newMousePosition = this._positionFromEvent(event);
      const value = {
        x: newMousePosition.x + this._currentOffset.x,
        y: newMousePosition.y + this._currentOffset.y,
      };
      this._elementOffset$.next(value);
    }
  };

  public handleMouseDown = <T extends HTMLElement>(element: T, event: React.MouseEvent) => {
    this.turnOnIsMouseDown();
    const offset: TPosition = {
      x: element.offsetLeft - event.clientX,
      y: element.offsetTop - event.clientY,
    };
    this._currentOffset = offset;
  };

  private _positionFromEvent(event: React.MouseEvent) {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }
}
