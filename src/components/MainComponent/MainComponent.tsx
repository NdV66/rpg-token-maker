import { useRef } from 'react';

import { IMainComponentViewModel } from 'viewModels';
import { AvatarFrameComponent } from './AvatarFrameComponent';
import { AvatarImageComponent } from './AvatarImageComponent';
import { ExportCanvasComponent } from './ExportCanvasComponent';
import { ResizeAvatarImageComponent } from './ResizeAvatarImageComponent';

type Props = {
  mainComponentViewModel: IMainComponentViewModel;
};

export const MainComponent = ({ mainComponentViewModel }: Props) => {
  const frameCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <ExportCanvasComponent
        exportToPng={mainComponentViewModel.exportToPng}
        frameCanvasRef={frameCanvasRef}
        imageCanvasRef={imageCanvasRef}
      />

      <div
        className="area"
        onMouseLeave={() => {
          mainComponentViewModel.avatarImageComponentViewModel.turnOffIsMouseDown();
        }}
      >
        <AvatarImageComponent
          canvasRef={imageCanvasRef}
          defaultWidth={mainComponentViewModel.defaultAvatarImageWidth}
          viewModel={mainComponentViewModel.avatarImageComponentViewModel}
        />
        <ResizeAvatarImageComponent viewModel={mainComponentViewModel.resizeAvatarViewModel} />

        <AvatarFrameComponent
          canvasRef={frameCanvasRef}
          size={mainComponentViewModel.avatarFrameSize}
          viewModel={mainComponentViewModel.avatarFrameComponentViewModel}
        />
      </div>
    </>
  );
};
