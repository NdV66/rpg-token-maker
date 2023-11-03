import { Observable, ReplaySubject } from 'rxjs';

export interface IImageUploadModel {
  uploadImage: (file?: File) => void;
  currentImageSrc: Observable<string>;
}

export class ImageUploadModel implements IImageUploadModel {
  private _currentImageSrc = new ReplaySubject<string>(1);
  public readonly currentImageSrc = this._currentImageSrc.asObservable();

  public uploadImage(file?: File) {
    if (file) {
      this._currentImageSrc.next(URL.createObjectURL(file));
    }
  }
}
