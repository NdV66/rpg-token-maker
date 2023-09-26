import { useRef } from 'react';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';
import { useResizeImage } from './useResizeImage';
import { EDotsNames, TDotsRef } from 'types';

type Props = {
  viewModel: IResizeAvatarImageComponentViewModel;
  imageRef: React.RefObject<HTMLCanvasElement>;
};

export const ResizeAvatarImageComponent = ({ viewModel, imageRef }: Props) => {
  const values = Object.values(EDotsNames).map((key) => key as EDotsNames);
  const dotsRef = useRef<TDotsRef>({} as TDotsRef);
  useResizeImage(viewModel, dotsRef, imageRef);

  const addRef = (element: HTMLDivElement | null, key: EDotsNames) => {
    const finalKey = key;
    if (element && dotsRef.current) dotsRef.current = { ...dotsRef.current, [finalKey]: element };
  };

  return (
    <div className="resize-avatar">
      {values.map((key) => (
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
