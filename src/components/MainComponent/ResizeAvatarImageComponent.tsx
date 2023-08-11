import { useStateObservable } from 'tools';
import { TPosition } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

type Props = {
  resizeAvatarViewModel: IResizeAvatarImageComponentViewModel;
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

export const ResizeAvatarImageComponent = ({ resizeAvatarViewModel }: Props) => {
  const currentSizeWithOffset = useStateObservable(resizeAvatarViewModel.currentSizeWithOffset$);

  let dots: TResizeDot[] = [];

  if (currentSizeWithOffset) {
    const { offset, size } = currentSizeWithOffset;
    dots = prepareOffsetsForDots(offset, size.width, size.height);
  }

  //TODO tets only
  const onClickDot = () => {};

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
