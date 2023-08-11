import { BehaviorSubject, Observable } from 'rxjs';
import { TCanvasSize } from 'types';

//TODO to envs
const DEFAULT_SIZE: TCanvasSize = {
  height: 0,
  styleHeight: 0,
  width: 0,
  styleWidth: 0,
};

export interface IResizeAvatarViewModel {
  sizeAfterResize$: Observable<TCanvasSize>;
  setNewSize: (size: TCanvasSize) => void;
}

export class ResizeAvatarViewModel implements IResizeAvatarViewModel {
  private _sizeAfterResize$ = new BehaviorSubject<TCanvasSize>(DEFAULT_SIZE);

  get sizeAfterResize$() {
    return this._sizeAfterResize$.asObservable();
  }

  //TODO test only
  public setNewSize(size: TCanvasSize) {
    this._sizeAfterResize$.next(size);
  }
}
