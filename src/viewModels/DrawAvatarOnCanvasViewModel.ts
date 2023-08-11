import { BehaviorSubject, Observable } from 'rxjs';
import { TCanvasSize } from 'types';
import {
  DrawImageOnCanvasViewModel,
  IDrawImageOnCanvasViewModel,
} from './DrawImageOnCanvasViewModel';

export interface IDrawAvatarOnCanvasViewModel extends IDrawImageOnCanvasViewModel {
  canvasSize$: Observable<TCanvasSize>;
}

const DEFAULT_SIZE: TCanvasSize = {
  height: 0,
  styleHeight: 0,
  width: 0,
  styleWidth: 0,
};

export class DrawAvatarOnCanvasViewModel
  extends DrawImageOnCanvasViewModel
  implements IDrawAvatarOnCanvasViewModel
{
  private _canvasSize$ = new BehaviorSubject<TCanvasSize>(DEFAULT_SIZE);

  get canvasSize$() {
    return this._canvasSize$.asObservable();
  }

  public override calculateCanvasSize(drawHeight: number, defaultImageWidth: number) {
    const size = super.calculateCanvasSize(drawHeight, defaultImageWidth);
    this._canvasSize$.next(size);
    return size;
  }
}
