import './styles.css';
import { useRef, useEffect } from 'react';
import { IMoveImageAreaViewModel } from 'viewModels';
import { fromEvent, map } from 'rxjs';
import { TPosition } from 'types';

export const useMouseImageAreaViewModel = (viewModel: IMoveImageAreaViewModel) => {
  const moveRef = useRef<HTMLDivElement>(null);

  const handleMoveElement = () => {
    const mousemove$ = fromEvent(moveRef.current!, 'mousemove');
    const moveElementUnsubscribe = viewModel.handleMoveElement(mousemove$);

    const elementOffset$ = viewModel.elementOffset$.subscribe((newPosition) => {
      moveRef.current!.style.left = `${newPosition.x}px`;
      moveRef.current!.style.top = `${newPosition.y}px`;
    });

    return () => {
      moveElementUnsubscribe();
      elementOffset$.unsubscribe();
    };
  };

  const handleMouseDownElement = () => {
    const mousedown$ = fromEvent(moveRef.current!, 'mousedown').pipe(
      map(viewModel.convertToReactMouseEvent),
    );
    const action$ = mousedown$.subscribe((event) => {
      const elementOffset: TPosition = {
        x: moveRef.current!.offsetLeft,
        y: moveRef.current!.offsetTop,
      };

      viewModel.handleMouseDown(event, elementOffset);
    });

    return () => action$.unsubscribe();
  };

  useEffect(() => {
    const clean = handleMoveElement();
    const cleanMouseDown = handleMouseDownElement();

    return () => {
      clean();
      cleanMouseDown();
    };
  }, [viewModel]);

  return {
    handleMouseUp: viewModel.turnOffIsMouseDown,
    moveRef,
  };
};

type Props = {
  viewModel: IMoveImageAreaViewModel;
};

export const MoveImageArea = ({ viewModel }: Props) => {
  const { handleMouseUp, moveRef } = useMouseImageAreaViewModel(viewModel);

  return (
    <div className="bg-gray-200 move-image" ref={moveRef} onMouseUp={handleMouseUp}>
      div to move
    </div>
  );
};
