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
    const FINAL_CANVAS_SIZE = 1200;
    const FRAME_SIZE = 200;
    const DEVICE_PIXEL_RATIO = window.devicePixelRatio;

    const exportCanvas = document.createElement('canvas');
    const finalCanvas = document.createElement('canvas');

    exportCanvas.width = FINAL_CANVAS_SIZE;
    exportCanvas.height = FINAL_CANVAS_SIZE;

    const context = exportCanvas.getContext('2d');
    const finalContext = finalCanvas.getContext('2d');

    if (context && finalContext) {
      const currentImage = imageCanvasRef.current!;
      const currentFrame = frameCanvasRef.current!;

      context.drawImage(currentImage, currentImage.offsetLeft, currentImage.offsetTop);
      context.drawImage(currentFrame, currentFrame.offsetLeft, currentFrame.offsetTop);

      finalCanvas.width = FRAME_SIZE * DEVICE_PIXEL_RATIO;
      finalCanvas.height = FRAME_SIZE * DEVICE_PIXEL_RATIO;

      const size = FINAL_CANVAS_SIZE / DEVICE_PIXEL_RATIO;

      finalContext.drawImage(
        exportCanvas,
        currentFrame.offsetLeft, //frame is not able to move, so it's final offset - it's what we need to export
        currentFrame.offsetTop, //frame is not able to move, so it's final offset - it's what we need to export
        size,
        size,
        0,
        0,
        800,
        800,
      ); //TODO wtf 800

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
