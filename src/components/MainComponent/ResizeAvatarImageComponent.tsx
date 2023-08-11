import { useStateObservable } from 'tools';
import { TPosition } from 'types';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';

type Props = {
  viewModel: IResizeAvatarImageComponentViewModel;
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

export const ResizeAvatarImageComponent = ({ viewModel }: Props) => {
  const currentSizeWithOffset = useStateObservable(viewModel.currentSizeWithOffset$);
  let isDown = false;

  let dots: TResizeDot[] = [];

  if (currentSizeWithOffset) {
    const { offset, size } = currentSizeWithOffset;
    dots = prepareOffsetsForDots(offset, size.width, size.height);
  }

  //TODO tets only
  const onMouseDown = () => {
    console.log('down');
    isDown = true;
  };

  const onMouseMove = () => {
    if (isDown) {
      console.log('move');
      viewModel.updateTest(100, 100);
    }
  };

  const onMouseUp = () => {
    console.log('up');
    isDown = false;
  };

  return (
    <>
      <div className="resize-avatar">
        {dots.map((dot) => (
          <div
            className="resize-dot"
            key={dot.pointName}
            style={{ top: dot.y, left: dot.x }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          />
        ))}
      </div>
    </>
  );
};
