import { useEffect, useMemo, useRef, useState } from 'react';

import { IMainComponentViewModel } from 'viewModels';
import { AvatarFrameComponent } from './AvatarFrameComponent';
import { AvatarImageComponent } from './AvatarImageComponent';
import { ExportCanvasComponent } from './ExportCanvasComponent';
import { ResizeAvatarImageComponent } from './ResizeAvatarImageComponent';
import { TPosition, TSize } from 'types';

type Props = {
  mainComponentViewModel: IMainComponentViewModel;
};

export const MainComponent = ({ mainComponentViewModel }: Props) => {
  const frameCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState<TSize>({ width: 0, height: 0 });

  return (
    <>
      <ExportCanvasComponent
        viewModel={mainComponentViewModel.exportCanvasViewModel}
        frameCanvasRef={frameCanvasRef}
        imageCanvasRef={imageCanvasRef}
      />

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
        <ResizeAvatarImageComponent
          imageHeight={100}
          imageWidth={200}
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
