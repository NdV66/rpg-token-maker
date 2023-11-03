import { useRef } from 'react';
import { Box } from '@mui/material';
import { IMainComponentViewModel } from 'viewModels';
import { AvatarFrameComponent } from './AvatarFrameComponent';
import { AvatarImageComponent } from './AvatarImageComponent';
import { ResizeAvatarImageComponent } from './ResizeAvatarImageComponent';
import { ResizeArea } from './ResizeArea';
import { useSettingsContext } from 'components/SettingsContextComponent';
import { ExportCanvasButton } from './ExportCanvasButton';
import img from 'data/other3.jpeg'; //TODO load

type Props = {
  resizeComponentViewModel: IMainComponentViewModel;
};

export const ResizeView = ({ resizeComponentViewModel }: Props) => {
  const { workspaceSizeHeight, workspaceSizeWidth, translations } = useSettingsContext();
  const frameCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Box>
      <ResizeArea
        width={workspaceSizeWidth}
        height={workspaceSizeHeight}
        onMouseLeave={() => {
          resizeComponentViewModel.avatarImageComponentViewModel.turnOffIsMouseDown();
        }}
      >
        <AvatarImageComponent
          imageSrc={img}
          workspaceSizeHeight={workspaceSizeHeight}
          workspaceSizeWidth={workspaceSizeWidth}
          canvasRef={imageCanvasRef}
          defaultWidth={resizeComponentViewModel.defaultAvatarImageWidth}
          viewModel={resizeComponentViewModel.avatarImageComponentViewModel}
        />
        <ResizeAvatarImageComponent viewModel={resizeComponentViewModel.resizeAvatarViewModel} imageRef={imageCanvasRef} />
        <AvatarFrameComponent canvasRef={frameCanvasRef} size={resizeComponentViewModel.avatarFrameSize} viewModel={resizeComponentViewModel.avatarFrameComponentViewModel} />
      </ResizeArea>

      <ExportCanvasButton
        exportToPngViewModel={resizeComponentViewModel}
        frameCanvasRef={frameCanvasRef}
        imageCanvasRef={imageCanvasRef}
        translations={translations}
      ></ExportCanvasButton>
    </Box>
  );
};
