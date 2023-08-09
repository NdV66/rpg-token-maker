import { useRef, useEffect, useCallback } from 'react';
import { IMoveImageAreaViewModel } from 'viewModels';
import { TPosition } from 'types';
import { debounceTime } from 'rxjs';

/**
 * Prepare data and actions for MoveImageAreaComponent.
 * @param viewModel: IMoveImageAreaViewModel
 * @returns
 * - moveRef: ref to the element that is able to move by mouse
 * - handleMouseUp: what to do for 'mouseup' event
 */
export const useMouseImageAreaViewModel = (viewModel: IMoveImageAreaViewModel) => {
  const moveRef = useRef<HTMLDivElement>(null);

  /**
   * Handle move element by mouse.
   * With every 'mousemove' event it prepares a new offset for the element.
   */
  const subscribeToMouseMove = useCallback(() => {
    const mousemove$ = viewModel
      .fromMouseEvent(moveRef.current!, 'mousemove')
      .pipe(debounceTime(5));
    const moveElementUnsubscribe = viewModel.handleMoveElement(mousemove$);

    return () => moveElementUnsubscribe();
  }, [viewModel]);

  /**
   * Subscribe to offset Observable.
   * When there is a change, then it sets a new offset (position) for moving element.
   */
  const subscribeToElementOffset = useCallback(() => {
    const elementOffset$ = viewModel.elementOffset$.subscribe((newPosition) => {
      moveRef.current!.style.left = `${newPosition.x}px`;
      moveRef.current!.style.top = `${newPosition.y}px`;
    });

    return () => elementOffset$.unsubscribe();
  }, [viewModel]);

  /**
   * Handle start moving of the element.
   * When there is 'mousedown' event detected, then it sets new element offset in the viewModel.
   */
  const subscribeToMouseDown = useCallback(() => {
    const mousedown$ = viewModel.fromMouseEvent(moveRef.current!, 'mousedown');

    const action$ = mousedown$.subscribe((event) => {
      const elementOffset: TPosition = {
        x: moveRef.current!.offsetLeft,
        y: moveRef.current!.offsetTop,
      };

      viewModel.setCurrentOffset(event, elementOffset);
    });

    return () => action$.unsubscribe();
  }, [viewModel]);

  useEffect(() => {
    const clean = subscribeToMouseMove();
    const cleanMouseDown = subscribeToMouseDown();
    const cleanSubscribeToOffset = subscribeToElementOffset();

    return () => {
      clean();
      cleanMouseDown();
      cleanSubscribeToOffset();
    };
  }, [viewModel, subscribeToMouseDown, subscribeToMouseMove, subscribeToElementOffset]);

  return {
    handleMouseUp: viewModel.turnOffIsMouseDown,
    moveRef,
  };
};
