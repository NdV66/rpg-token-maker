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
  isMouseDown$: Observable<boolean>;
  elementOffset$: Observable<TPosition>;

  handleMoveElement: (mousemove$: Observable<React.MouseEvent>) => Subscription['unsubscribe'];
  setCurrentOffset: (event: React.MouseEvent, elementOffset: TPosition) => void;
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

  constructor() {}

  get isMouseDown$() {
    return this._isMouseDown$.asObservable();
  }

  get elementOffset$() {
    return this._elementOffset$.asObservable();
  }

  public fromMouseEvent<T extends HTMLElement>(element: T, trigger: string) {
    return fromEvent(element, trigger).pipe(map(this._convertToReactMouseEvent));
  }

  public handleMoveElement = (mousemove$: Observable<React.MouseEvent>) => {
    const moveElement$ = combineLatest([mousemove$, this.isMouseDown$])
      .pipe(
        filter(([_, isMouseDown]) => !!isMouseDown),
        map(([event]) => event),
      )
      .subscribe((event) => {
        const newMousePosition = this._positionFromEvent(event);
        console.log(newMousePosition);
        this._setNewElementPosition(newMousePosition);
      });

    return () => moveElement$.unsubscribe();
  };

  public turnOffIsMouseDown = () => {
    this._isMouseDown$.next(false);
  };

  public setCurrentOffset = (event: React.MouseEvent, elementOffset: TPosition) => {
    this._isMouseDown$.next(true);
    const eventOffset = this._positionFromEvent(event);

    this._currentOffset = {
      x: elementOffset.x - eventOffset.x,
      y: elementOffset.y - eventOffset.y,
    };
  };

  private _convertToReactMouseEvent(event: Event) {
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
