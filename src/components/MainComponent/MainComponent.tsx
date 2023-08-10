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
    const mergedLayersCanvas = document.createElement('canvas');
    const finalCanvas = document.createElement('canvas');
    const exportContext = mergedLayersCanvas.getContext('2d');
    const finalContext = finalCanvas.getContext('2d');

    if (exportContext && finalContext) {
      const currentImage = imageCanvasRef.current!;
      const currentFrame = frameCanvasRef.current!;

      const FRAME_SIZE = currentFrame.width;

      mergedLayersCanvas.width = 600;
      mergedLayersCanvas.height = 600;

      exportContext.drawImage(currentImage, currentImage.offsetLeft, currentImage.offsetTop);
      exportContext.drawImage(currentFrame, currentFrame.offsetLeft, currentFrame.offsetTop);

      finalCanvas.width = FRAME_SIZE;
      finalCanvas.height = FRAME_SIZE;

      finalContext.drawImage(
        mergedLayersCanvas,
        currentFrame.offsetLeft,
        currentFrame.offsetTop,
        FRAME_SIZE,
        FRAME_SIZE,
        0,
        0,
        FRAME_SIZE,
        FRAME_SIZE,
      );
      const exportData = finalCanvas.toDataURL('image/png', 1.0);
      window.open(exportData, '_blank'); //TODO
    }
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
