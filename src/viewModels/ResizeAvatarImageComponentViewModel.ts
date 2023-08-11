import { IAvatarImageMoveModel, IDrawImageOnCanvasModel } from 'models';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { TCanvasSize, TPosition } from 'types';

type TCanvasSizeWithOffset = {
  size: TCanvasSize;
  offset: TPosition;
};

const DEFAULT_SIZE: TCanvasSizeWithOffset = {
  size: {
    height: 0,
    styleHeight: 0,
    width: 0,
    styleWidth: 0,
  },
  offset: { x: 0, y: 0 },
};

export interface IResizeAvatarImageComponentViewModel {
  currentSizeWithOffset$: Observable<TCanvasSizeWithOffset>;
  updateTest: (height: number, width: number) => void;
}

export class ResizeAvatarImageComponentViewModel implements IResizeAvatarImageComponentViewModel {
  private _currentSizeWithOffset$ = new BehaviorSubject<TCanvasSizeWithOffset>(DEFAULT_SIZE);

  constructor(
    private readonly _drawAvatarOnCanvasModel: IDrawImageOnCanvasModel,
    private readonly _moveImageViewModel: IAvatarImageMoveModel,
  ) {
    this._updateCurrentSizeWithOffset();
  }

  private _updateCurrentSizeWithOffset() {
    combineLatest([
      this._drawAvatarOnCanvasModel.canvasSize$,
      this._moveImageViewModel.elementOffset$,
    ]).subscribe(([size, offset]) => {
      this._currentSizeWithOffset$.next({ size, offset });
    });
  }

  get currentSizeWithOffset$() {
    return this._currentSizeWithOffset$.asObservable();
  }

  // TODO only for tests
  public updateTest(height: number, width: number) {
    this._drawAvatarOnCanvasModel.calculateCanvasSize(height, width);
  }
}
