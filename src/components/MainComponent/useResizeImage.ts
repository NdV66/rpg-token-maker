import { useCallback } from 'react';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

export const useResizeImage = (viewModel: IResizeAvatarImageComponentViewModel) => {
  const onMouseDown = useCallback(() => {
    viewModel.handleStartResize();
  }, []);

  const onMouseUp = useCallback(() => {
    viewModel.handleFinishResize();
  }, []);

  const onMouseMove = useCallback(() => {
    viewModel.updateTest(200, 200);
  }, []);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
