import './styles.css';

import { useState, useRef } from 'react';

type TPosition = {
  x: number;
  y: number;
};

export const MoveImageArea = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [offset, setOffset] = useState<TPosition>({ x: 0, y: 0 });

  const moveRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);

    const newOffset = {
      x: moveRef.current!.offsetLeft - event.clientX,
      y: moveRef.current!.offsetTop - event.clientY,
    };

    setOffset(newOffset);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (isMouseDown) {
      const newMousePosition: TPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      const divLeft = newMousePosition.x + offset.x;
      const divTop = newMousePosition.y + offset.y;

      moveRef.current!.style.left = `${divLeft}px`;
      moveRef.current!.style.top = `${divTop}px`;
    }
  };

  return (
    <div
      className="bg-gray-200 move-image"
      ref={moveRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      div to move
    </div>
  );
};
