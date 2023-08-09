import { useRef } from 'react';

import { IMainComponentViewModel } from 'viewModels';
import { AvatarFrameComponent } from './AvatarFrameComponent';
import { AvatarImageComponent } from './AvatarImageComponent';

type Props = {
  mainComponentViewModel: IMainComponentViewModel;
};

export const MainComponent = ({ mainComponentViewModel }: Props) => {
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const frameCanvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <div
        className="area"
        onMouseLeave={() => {
          mainComponentViewModel.imageOnCanvasMoveViewModel.turnOffIsMouseDown();
        }}
      >
        <AvatarImageComponent
          defaultWidth={mainComponentViewModel.defaultAvatarImageWidth}
          drawImageViewModel={mainComponentViewModel.drawImageOnCanvasViewModel}
          moveImageViewModel={mainComponentViewModel.imageOnCanvasMoveViewModel}
        />
        <AvatarFrameComponent
          size={mainComponentViewModel.avatarFrameSize}
          viewModel={mainComponentViewModel.drawImageOnCanvasViewModel}
        />
      </div>
    </>
  );
};
