import { Observable, fromEvent, map } from 'rxjs';

export interface IAMouseHandler {
  fromMouseEvent: <T extends HTMLElement>(element: T, trigger: string) => Observable<React.MouseEvent<Element, MouseEvent>>;
  turnOffIsMouseDown: () => void;
  turnOnIsMouseDown: () => void;
}

export abstract class AMouseHandler implements IAMouseHandler {
  private _isMouseDown = false;

  public turnOffIsMouseDown = () => {
    this._isMouseDown = false;
  };

  public turnOnIsMouseDown = () => {
    this._isMouseDown = true;
  };

  protected get isMouseDown() {
    return this._isMouseDown;
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
