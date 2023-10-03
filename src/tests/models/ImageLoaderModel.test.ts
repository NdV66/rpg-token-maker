import { ImageLoaderModel } from 'models';

const LOAD_FAILURE_SRC = 'wrongImage.jpg';
const LOAD_SUCCESS_SRC = 'okImg.jpeg';
const expectedError = new Error('mocked error');

Object.defineProperty(global.Image.prototype, 'src', {
  set(src) {
    if (src === LOAD_FAILURE_SRC) {
      setTimeout(() => this.onerror(expectedError));
    } else if (src === LOAD_SUCCESS_SRC) {
      setTimeout(() => this.onload());
    }
  },
});

describe('ImageLoaderModel', () => {
  let model: ImageLoaderModel;

  beforeEach(() => {
    model = new ImageLoaderModel();
  });

  describe('loadImage()', () => {
    it('Should throw an error', async () => {
      await expect(() => model.loadImage(LOAD_FAILURE_SRC)).rejects.toThrow(expectedError);
    });

    it('Should work ok', async () => {
      const result = await model.loadImage(LOAD_SUCCESS_SRC);
      expect(result instanceof HTMLImageElement).toBe(true);
    });
  });
});
