import { BehaviorSubject, Observable, fromEvent, map } from 'rxjs';
import { TPosition } from 'types';

export interface IAvatarImageMoveModel {
  elementOffset$: Observable<TPosition>;

  turnOffIsMouseDown: () => void;
  fromMouseEvent: <T extends HTMLElement>(
    element: T,
    trigger: string,
  ) => Observable<React.MouseEvent<Element, MouseEvent>>;
  handleMoveElement: (event: React.MouseEvent) => void;
  handleMouseDown: <T extends HTMLElement>(element: T, event: React.MouseEvent) => void;
}

const START_OFFSET: TPosition = { x: 0, y: 0 };

export class AvatarImageMoveModel implements IAvatarImageMoveModel {
  private _elementOffset$ = new BehaviorSubject<TPosition>(START_OFFSET);
  private _isDown = false;
  private _currentOffset = START_OFFSET;

  public readonly elementOffset$ = this._elementOffset$.asObservable();

  public fromMouseEvent<T extends HTMLElement>(element: T, trigger: string) {
    return fromEvent(element, trigger).pipe(
      map((event) => {
        event.preventDefault();
        return event as any as React.MouseEvent;
      }),
    );
  }

  public turnOffIsMouseDown = () => {
    this._isDown = false;
  };

  public handleMoveElement = (event: React.MouseEvent) => {
    if (this._isDown) {
      const newMousePosition = this._positionFromEvent(event);
      const value = {
        x: newMousePosition.x + this._currentOffset.x,
        y: newMousePosition.y + this._currentOffset.y,
      };
      this._elementOffset$.next(value);
    }
  };

  public handleMouseDown = <T extends HTMLElement>(element: T, event: React.MouseEvent) => {
    this._isDown = true;
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
