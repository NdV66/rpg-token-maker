import './styles.css';
import { useRef, useEffect } from 'react';

type Props = {
  imgSrc: string;
  defaultDrawWidth: number;
};

export const AvatarImageComponent = ({ imgSrc, defaultDrawWidth }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const adjustCanvasSizeToScreen = (
    canvas: HTMLCanvasElement,
    drawWidth: number,
    drawHeight: number,
  ) => {
    canvas.width = drawWidth * devicePixelRatio;
    canvas.height = drawHeight * devicePixelRatio;
    canvas.style.width = (canvas.width / devicePixelRatio).toString() + 'px';
    canvas.style.height = (canvas.height / devicePixelRatio).toString() + 'px';
  };

  const prepareImageSize = (image: HTMLImageElement, drawWidth: number) => {
    const { width, height } = image;
    const drawHight = (drawWidth * height) / width;
    return { drawHight, drawWidth };
  };

  const drawImageOnCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      const { drawHight, drawWidth } = prepareImageSize(image, defaultDrawWidth);
      adjustCanvasSizeToScreen(canvas, drawWidth, drawHight);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      drawImageOnCanvas(context, canvasRef.current!);
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="canvas" />;
};
