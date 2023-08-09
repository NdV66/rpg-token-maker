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
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 600;
    exportCanvas.height = 600;

    const context = exportCanvas.getContext('2d');
    if (context) {
      const currentImage = imageCanvasRef.current!;
      const currentFrame = frameCanvasRef.current!;

      context.drawImage(currentImage, currentImage.offsetLeft, currentImage.offsetTop);
      context.drawImage(currentFrame, currentFrame.offsetLeft, currentFrame.offsetTop);

      context.save();

      context.beginPath();
      context.arc(50, 50, 100, 0, Math.PI * 2, true);
      context.closePath();

      context.clip();
      context.restore();

      const exportData = exportCanvas.toDataURL();
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
