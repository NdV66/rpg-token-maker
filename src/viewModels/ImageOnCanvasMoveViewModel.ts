import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  filter,
  fromEvent,
  map,
} from 'rxjs';
import { TPosition } from 'types';

export interface IImageOnCanvasMoveViewModel {
  elementOffset$: Observable<TPosition>;

  handleMoveElement: (mousemove$: Observable<React.MouseEvent>) => Subscription['unsubscribe'];
  setCurrentOffset: (elementOffset: TPosition) => void;
  turnOffIsMouseDown: () => void;
  fromMouseEvent: <T extends HTMLElement>(
    element: T,
    trigger: string,
  ) => Observable<React.MouseEvent<Element, MouseEvent>>;
}

const START_OFFSET: TPosition = { x: 0, y: 0 }; //TODO env

export class ImageOnCanvasMoveViewModel implements IImageOnCanvasMoveViewModel {
  private _isMouseDown$ = new BehaviorSubject<boolean>(false);
  private _elementOffset$ = new BehaviorSubject<TPosition>(START_OFFSET);
  private _currentOffset = START_OFFSET;

  get elementOffset$() {
    return this._elementOffset$.asObservable();
  }

  public fromMouseEvent<T extends HTMLElement>(element: T, trigger: string) {
    return fromEvent(element, trigger).pipe(map(this._convertToReactMouseEvent));
  }

  public handleMoveElement = (mousemove$: Observable<React.MouseEvent>) => {
    const moveElement$ = combineLatest([mousemove$, this._isMouseDown$])
      .pipe(
        filter(([_, isMouseDown]) => !!isMouseDown),
        map(([event]) => {
          event.preventDefault();
          return event;
        }),
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

  public setCurrentOffset = (elementOffset: TPosition) => {
    this._isMouseDown$.next(true);
    this._currentOffset = elementOffset;
  };

  private _convertToReactMouseEvent(event: Event) {
    event.preventDefault();
    return event as any as React.MouseEvent;
  }

  private _setNewElementPosition(mousePosition: TPosition) {
    const value = {
      x: mousePosition.x + this._currentOffset.x,
      y: mousePosition.y + this._currentOffset.y,
    };
    this._elementOffset$.next(value);
  }

  private _positionFromEvent(event: React.MouseEvent) {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }
}
