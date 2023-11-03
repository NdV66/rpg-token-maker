import { Button } from '@mui/material';
import { PropsWithChildren } from 'react';
import { IResizeComponentViewModel } from 'viewModels';

type Props = {
  exportToPng: IResizeComponentViewModel['exportToPng'];
  frameCanvasRef: React.RefObject<HTMLCanvasElement>;
  imageCanvasRef: React.RefObject<HTMLCanvasElement>;
};

export const ExportCanvasComponent = ({ exportToPng, imageCanvasRef, frameCanvasRef, children }: PropsWithChildren<Props>) => {
  const exportAsImage = async () => {
    const exportData = await exportToPng(imageCanvasRef.current!, frameCanvasRef.current!);
    window.open(exportData, '_blank');
  };

  return <Button onClick={exportAsImage}>{children}</Button>;
};
