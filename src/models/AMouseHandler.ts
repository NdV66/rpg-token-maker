import { Observable, fromEvent, map } from 'rxjs';

export interface IAMouseHandler {
  fromMouseEvent: <T extends HTMLElement>(
    element: T,
    trigger: string,
  ) => Observable<React.MouseEvent<Element, MouseEvent>>;
  turnOffIsMouseDown: () => void;
  turnOnIsMouseDown: () => void;
}

export abstract class AMouseHandler implements IAMouseHandler {
  private _isDown = false;

  public turnOffIsMouseDown = () => {
    this._isDown = false;
  };

  public turnOnIsMouseDown = () => {
    this._isDown = true;
  };

  protected get isMouseDown() {
    return this._isDown;
  }

  public fromMouseEvent<T extends HTMLElement>(element: T, trigger: string) {
    return fromEvent(element, trigger).pipe(
      map((event) => {
        event.preventDefault();
        return event as any as React.MouseEvent;
      }),
    );
  }
}
