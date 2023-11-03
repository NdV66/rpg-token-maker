import { useRef } from 'react';

import { IMainComponentViewModel } from 'viewModels';
import { AvatarFrameComponent } from './AvatarFrameComponent';
import { AvatarImageComponent } from './AvatarImageComponent';
import { ExportCanvasComponent } from './ExportCanvasComponent';
import { ResizeAvatarImageComponent } from './ResizeAvatarImageComponent';
import { ResizeArea } from './ResizeArea';
import { useSettingsContext } from 'components/SettingsContextComponent';

type Props = {
  resizeComponentViewModel: IMainComponentViewModel;
};

export const ResizeView = ({ resizeComponentViewModel }: Props) => {
  const { workspaceSizeHeight, workspaceSizeWidth, translations } = useSettingsContext();
  const frameCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div>
      <ResizeArea
        width={workspaceSizeWidth}
        height={workspaceSizeHeight}
        onMouseLeave={() => {
          resizeComponentViewModel.avatarImageComponentViewModel.turnOffIsMouseDown();
        }}
      >
        <AvatarImageComponent
          workspaceSizeHeight={workspaceSizeHeight}
          workspaceSizeWidth={workspaceSizeWidth}
          canvasRef={imageCanvasRef}
          defaultWidth={resizeComponentViewModel.defaultAvatarImageWidth}
          viewModel={resizeComponentViewModel.avatarImageComponentViewModel}
        />
        <ResizeAvatarImageComponent viewModel={resizeComponentViewModel.resizeAvatarViewModel} imageRef={imageCanvasRef} />

        <AvatarFrameComponent canvasRef={frameCanvasRef} size={resizeComponentViewModel.avatarFrameSize} viewModel={resizeComponentViewModel.avatarFrameComponentViewModel} />
      </ResizeArea>

      <ExportCanvasComponent exportToPng={resizeComponentViewModel.exportToPng} frameCanvasRef={frameCanvasRef} imageCanvasRef={imageCanvasRef}>
        {translations.exportImageToPng}
      </ExportCanvasComponent>
    </div>
  );
};
