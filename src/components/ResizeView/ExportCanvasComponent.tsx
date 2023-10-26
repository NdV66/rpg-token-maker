import { Button } from '@mui/material';
import { IMainComponentViewModel } from 'viewModels';

type Props = {
  exportToPng: IMainComponentViewModel['exportToPng'];
  frameCanvasRef: React.RefObject<HTMLCanvasElement>;
  imageCanvasRef: React.RefObject<HTMLCanvasElement>;
};

export const ExportCanvasComponent = ({ exportToPng, imageCanvasRef, frameCanvasRef }: Props) => {
  const exportAsImage = async () => {
    const exportData = await exportToPng(imageCanvasRef.current!, frameCanvasRef.current!);
    window.open(exportData, '_blank');
  };

  return <Button onClick={exportAsImage}>EXPORT TEST IMAGE</Button>;
};
