import './styles.css';
import { useRef, useEffect } from 'react';
import { IMoveImageAreaViewModel } from 'viewModels';

import img from 'data/testImg.jpg';

type Props = {
  viewModel: IMoveImageAreaViewModel;
};

const drawWidth = 200;

const useMouseImageAreaViewModel = () => {};

export const AvatarImageComponent = ({ viewModel }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D) => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      const { width, height } = image;
      const drawHight = (drawWidth * height) / width;
      canvasRef.current!.width = drawWidth;
      canvasRef.current!.height = drawHight;
      console.log(drawWidth, drawHight);
      ctx.drawImage(image, 0, 0, drawWidth, drawHight);
    };
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      draw(context);
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="canvas" />;
};
