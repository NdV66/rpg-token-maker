import { IAvatarImageMoveModel } from 'models';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { TCanvasSize, TPosition } from 'types';
import { IAvatarImageComponentViewModel } from './AvatarImageComponentViewModel';

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
}

export class ResizeAvatarImageComponentViewModel implements IResizeAvatarImageComponentViewModel {
  private _currentSizeWithOffset$ = new BehaviorSubject<TCanvasSizeWithOffset>(DEFAULT_SIZE);

  constructor(
    private readonly _avatarImageComponentViewModel: IAvatarImageComponentViewModel,
    private readonly _moveImageViewModel: IAvatarImageMoveModel,
  ) {
    this._updateCurrentSizeWithOffset();
  }

  private _updateCurrentSizeWithOffset() {
    combineLatest([
      this._avatarImageComponentViewModel.canvasSize$,
      this._moveImageViewModel.elementOffset$,
    ]).subscribe(([size, offset]) => {
      this._currentSizeWithOffset$.next({ size, offset });
    });
  }

  get currentSizeWithOffset$() {
    return this._currentSizeWithOffset$.asObservable();
  }
}
