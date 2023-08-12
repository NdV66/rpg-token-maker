import { useRef } from 'react';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';
import { useResizeImage } from './useResizeImage';
import { EDotsNames, TDotsRef } from 'types';

type Props = {
  viewModel: IResizeAvatarImageComponentViewModel;
  imageRef: React.RefObject<HTMLCanvasElement>;
};

export const ResizeAvatarImageComponent = ({ viewModel, imageRef }: Props) => {
  const keys = Object.keys(EDotsNames).map((key) => key as EDotsNames);
  const dotsRef = useRef<TDotsRef>({} as TDotsRef);
  useResizeImage(viewModel, dotsRef, imageRef);

  const addRef = (element: HTMLDivElement | null, key: EDotsNames) => {
    if (element && dotsRef.current) dotsRef.current = { ...dotsRef.current, [key]: element };
  };

  return (
    <div className="resize-avatar">
      {keys.map((key) => (
        <div
          className="resize-dot"
          key={key}
          ref={(element) => addRef(element, key)}
          onMouseLeave={() => viewModel.turnOffIsMouseDown()} //maybe turn off after time?
        />
      ))}
    </div>
  );
};
