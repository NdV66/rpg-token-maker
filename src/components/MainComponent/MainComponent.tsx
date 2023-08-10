import { useRef } from 'react';

import { IMainComponentViewModel } from 'viewModels';
import { AvatarFrameComponent } from './AvatarFrameComponent';
import { AvatarImageComponent } from './AvatarImageComponent';

type Props = {
  mainComponentViewModel: IMainComponentViewModel;
};

export const MainComponent = ({ mainComponentViewModel }: Props) => {
  const frameCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);

  const exportAsImage = () => {
    const exportData = mainComponentViewModel.exportCanvasViewModel.exportToPng(
      imageCanvasRef.current!,
      frameCanvasRef.current!,
    );
    window.open(exportData, '_blank');
  };

  return (
    <>
      <button onClick={exportAsImage}>TEST ME</button>
      <div
        className="area"
        onMouseLeave={() => {
          mainComponentViewModel.imageOnCanvasMoveViewModel.turnOffIsMouseDown();
        }}
      >
        <AvatarImageComponent
          canvasRef={imageCanvasRef}
          defaultWidth={mainComponentViewModel.defaultAvatarImageWidth}
          drawImageViewModel={mainComponentViewModel.drawImageOnCanvasViewModel}
          moveImageViewModel={mainComponentViewModel.imageOnCanvasMoveViewModel}
        />
        <AvatarFrameComponent
          canvasRef={frameCanvasRef}
          size={mainComponentViewModel.avatarFrameSize}
          viewModel={mainComponentViewModel.drawImageOnCanvasViewModel}
        />
      </div>
    </>
  );
};
