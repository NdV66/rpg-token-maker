import { ImageUploadModel } from 'models';
import { TestScheduler } from 'rxjs/testing';
import { makeTestScheduler } from 'tests/tools';

describe('ImageUploadModel', () => {
  let model: ImageUploadModel;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    model = new ImageUploadModel();
    testScheduler = makeTestScheduler();
  });

  it('Should upload image, when image is not empty', () => {
    testScheduler.run(({ expectObservable }) => {
      const fileSrcMock = 'pathToFile.jpeg';
      const file = {} as File;
      URL.createObjectURL = jest.fn().mockReturnValue(fileSrcMock);

      model.uploadImage(file);

      expectObservable(model.currentImageSrc).toBe('a', { a: fileSrcMock });
      expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    });
  });

  it('Should not upload image, when image is empty', () => {
    testScheduler.run(({ expectObservable }) => {
      URL.createObjectURL = jest.fn();

      model.uploadImage(undefined);

      expectObservable(model.currentImageSrc).toBe('-');
      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });
  });
});
