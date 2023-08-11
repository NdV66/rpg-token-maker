import { useStateObservable } from 'tools';
import { TPosition } from 'types';
import { IAvatarImageOnCanvasMoveViewModel } from 'viewModels';

type Props = {
  imageWidth: number;
  imageHeight: number;
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

export const ResizeAvatarImageComponent = ({
  moveImageViewModel,
  imageHeight,
  imageWidth,
}: Props) => {
  const offset = useStateObservable(moveImageViewModel.elementOffset$);

  const dots = offset ? prepareOffsetsForDots(offset, imageWidth, imageHeight) : [];

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
