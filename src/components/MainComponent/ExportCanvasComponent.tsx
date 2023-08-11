import { IExportCanvasViewModel } from 'viewModels';

type Props = {
  viewModel: IExportCanvasViewModel;
  frameCanvasRef: React.RefObject<HTMLCanvasElement>;
  imageCanvasRef: React.RefObject<HTMLCanvasElement>;
};

export const ExportCanvasComponent = ({ viewModel, imageCanvasRef, frameCanvasRef }: Props) => {
  const exportAsImage = async () => {
    const exportData = await viewModel.exportToPng(
      imageCanvasRef.current!,
      frameCanvasRef.current!,
    );
    window.open(exportData, '_blank');
  };

  return <button onClick={exportAsImage}>EXPORT TEST IMAGE</button>;
};
