import { useStateObservable } from 'tools';
import { TPosition } from 'types';
import {
  IAvatarImageOnCanvasMoveViewModel,
  IDrawAvatarOnCanvasViewModel,
  IResizeAvatarViewModel,
} from 'viewModels';

type Props = {
  drawAvatarViewModel: IDrawAvatarOnCanvasViewModel;
  moveImageViewModel: IAvatarImageOnCanvasMoveViewModel;
  resizeAvatarViewModel: IResizeAvatarViewModel;
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
    { pointName: 'A', x, y },
    { pointName: 'B', x: x + imageWidth, y },
    { pointName: 'C', x: x + imageWidth, y: y + imageHeight },
    { pointName: 'D', x, y: y + imageHeight },
  ];
};

export const ResizeAvatarImageComponent = ({
  moveImageViewModel,
  drawAvatarViewModel,
  resizeAvatarViewModel,
}: Props) => {
  const offset = useStateObservable(moveImageViewModel.elementOffset$);
  const size = useStateObservable(drawAvatarViewModel.canvasSize$);

  const dots = offset && size ? prepareOffsetsForDots(offset, size.width, size.height) : [];
  //TODO tets only
  const onClickDot = () => {
    resizeAvatarViewModel.setNewSize({
      height: 200,
      width: 100,
      styleHeight: 200,
      styleWidth: 100,
    });
  };

  return (
    <>
      <div className="resize-avatar">
        {dots.map((dot) => (
          <div
            className="resize-dot"
            key={dot.pointName}
            style={{ top: dot.y, left: dot.x }}
            onClick={onClickDot}
          />
        ))}
      </div>
    </>
  );
};
