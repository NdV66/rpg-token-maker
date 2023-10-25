import { appEnvMock, avatarFrameComponentViewModelMock, avatarImageComponentViewModelMock, exportCanvasModelMock, resizeAvatarViewModelMock } from 'tests/mocks';
import { MainComponentViewModel } from 'viewModels';

describe('MainComponentViewModel', () => {
  let viewModel: MainComponentViewModel;

  beforeEach(() => {
    viewModel = new MainComponentViewModel(appEnvMock, resizeAvatarViewModelMock, avatarFrameComponentViewModelMock, avatarImageComponentViewModelMock, exportCanvasModelMock);
  });

  it('Should export to png', () => {
    const currentImage = document.createElement('canvas');
    const currentFrame = document.createElement('canvas');

    viewModel.exportToPng(currentImage, currentFrame);

    expect(exportCanvasModelMock.exportToPng).toHaveBeenCalledTimes(1);
    expect(exportCanvasModelMock.exportToPng).toHaveBeenCalledWith(currentImage, currentFrame);
  });
});
