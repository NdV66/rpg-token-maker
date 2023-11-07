import {
  appEnvMock,
  avatarFrameComponentViewModelMock,
  avatarImageComponentViewModelMock,
  exportCanvasModelMock,
  imageUploadModelMock,
  resizeAvatarViewModelMock,
} from 'tests/mocks';
import { ResizeComponentViewModel } from 'viewModels';

describe('ResizeComponentViewModel', () => {
  let viewModel: ResizeComponentViewModel;

  beforeEach(() => {
    viewModel = new ResizeComponentViewModel(
      appEnvMock,
      resizeAvatarViewModelMock,
      avatarFrameComponentViewModelMock,
      avatarImageComponentViewModelMock,
      exportCanvasModelMock,
      imageUploadModelMock,
    );
  });

  it('Should export to png', () => {
    const currentImage = document.createElement('canvas');
    const currentFrame = document.createElement('canvas');

    viewModel.exportToPng(currentImage, currentFrame);

    expect(exportCanvasModelMock.exportToPng).toHaveBeenCalledTimes(1);
    expect(exportCanvasModelMock.exportToPng).toHaveBeenCalledWith(currentImage, currentFrame);
  });
});
