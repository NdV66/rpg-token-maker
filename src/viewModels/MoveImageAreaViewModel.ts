import { BehaviorSubject, Observable, Subscription, combineLatest, filter, map } from 'rxjs';
import { TPosition } from 'types';

export interface IMoveImageAreaViewModel {
  isMouseDown$: Observable<boolean>;
  elementOffset$: Observable<TPosition>;

  handleMoveElement: (mousemove$: Observable<Event>) => Subscription['unsubscribe'];
  handleMouseDown: (event: React.MouseEvent, elementOffset: TPosition) => void;
  turnOffIsMouseDown: () => void;
  convertToReactMouseEvent: (event: Event) => React.MouseEvent;
}

export class MoveImageAreaViewModel implements IMoveImageAreaViewModel {
  private _isMouseDown$ = new BehaviorSubject<boolean>(false);
  private _elementOffset$ = new BehaviorSubject<TPosition>({ x: 0, y: 0 });
  private _currentOffset = { x: 0, y: 0 };

  get isMouseDown$() {
    return this._isMouseDown$.asObservable();
  }

  get elementOffset$() {
    return this._elementOffset$.asObservable();
  }

  public convertToReactMouseEvent(event: Event) {
    return event as any as React.MouseEvent;
  }

  public handleMoveElement = (mousemove$: Observable<Event>) => {
    const moveElement$ = combineLatest([mousemove$, this.isMouseDown$])
      .pipe(
        filter(([_, isMouseDown]) => !!isMouseDown),
        map(([event, _]) => this.convertToReactMouseEvent(event)),
      )
      .subscribe((event) => {
        const newMousePosition = this._positionFromEvent(event);
        this._setNewElementPosition(newMousePosition);
      });

    return () => moveElement$.unsubscribe();
  };

  public turnOffIsMouseDown = () => {
    this._isMouseDown$.next(false);
  };

  public handleMouseDown = (event: React.MouseEvent, elementOffset: TPosition) => {
    this._isMouseDown$.next(true);
    const eventOffset = this._positionFromEvent(event);

    this._currentOffset = {
      x: elementOffset.x - eventOffset.x,
      y: elementOffset.y - eventOffset.y,
    };
  };

  private _setNewElementPosition(mousePosition: TPosition) {
    const value = {
      x: mousePosition.x + this._currentOffset.x,
      y: mousePosition.y + this._currentOffset.y,
    };
    this._elementOffset$.next(value);
  }

  private _positionFromEvent(event: React.MouseEvent) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }
}
