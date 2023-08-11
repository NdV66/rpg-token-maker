import { TPosition } from 'types';

type Props = {
  imageTopLeft: TPosition;
  imageWidth: number;
  imageHeight: number;
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

export const ResizeAvatarImageComponent = ({ imageTopLeft, imageHeight, imageWidth }: Props) => {
  const dots = prepareOffsetsForDots(imageTopLeft, imageWidth, imageHeight);

  console.log(dots);

  return (
    <>
      <div className="resize-avatar" />
      {dots.map((dot) => (
        <div className="resize-dot" key={dot.pointName} style={{ top: dot.y, left: dot.x }} />
      ))}
    </>
  );
};
