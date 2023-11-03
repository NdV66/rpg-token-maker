import { TTranslations } from 'types';
import { ExportCanvasComponent } from './ExportCanvasComponent';
import { IExportToPngViewModel } from 'viewModels';

type Props = {
  frameCanvasRef: React.RefObject<HTMLCanvasElement>;
  imageCanvasRef: React.RefObject<HTMLCanvasElement>;
  translations: TTranslations;
  exportToPngViewModel: IExportToPngViewModel;
};

export const ExportCanvasButton = ({ frameCanvasRef, imageCanvasRef, translations, exportToPngViewModel }: Props) => (
  <ExportCanvasComponent exportToPng={exportToPngViewModel.exportToPng} frameCanvasRef={frameCanvasRef} imageCanvasRef={imageCanvasRef}>
    {translations.exportImageToPng}
  </ExportCanvasComponent>
);
