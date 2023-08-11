import { useStateObservable } from 'tools';
import { TPosition } from 'types';
import { IAvatarImageOnCanvasMoveViewModel, IDrawAvatarOnCanvasViewModel } from 'viewModels';

type Props = {
  drawAvatarViewModel: IDrawAvatarOnCanvasViewModel;
  moveImageViewModel: IAvatarImageOnCanvasMoveViewModel;
};

type TResizeDot = TPosition & {
  pointName: string;
};

const prepareOffsetsForDots = (
  imageTopLeft: TPosition,
  imageWidth: number,
  imageHeight: number,
): TResizeDot[] => {
  const { x, y } = imageTopLeft;

  return [
    { pointName: 'A', x, y }, //A
    { pointName: 'B', x: x + imageWidth, y }, //B
    { pointName: 'C', x: x + imageWidth, y: y + imageHeight }, //C
    { pointName: 'D', x, y: y + imageHeight }, //D
  ];
};

export const ResizeAvatarImageComponent = ({ moveImageViewModel, drawAvatarViewModel }: Props) => {
  const offset = useStateObservable(moveImageViewModel.elementOffset$);
  const size = useStateObservable(drawAvatarViewModel.canvasSize$);

  //TODO show dots only after mousedown and move? not always
  const dots = offset && size ? prepareOffsetsForDots(offset, size.width, size.height) : [];

  console.log(size);

  return (
    <>
      <div className="resize-avatar">
        {dots.map((dot) => (
          <div className="resize-dot" key={dot.pointName} style={{ top: dot.y, left: dot.x }} />
        ))}
      </div>
    </>
  );
};
