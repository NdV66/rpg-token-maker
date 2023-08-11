import { useRef } from 'react';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';
import { useResizeImage } from './useResizeImage';
import { EDotsNames, TDotsRef } from 'types';

type Props = {
  viewModel: IResizeAvatarImageComponentViewModel;
};

export const ResizeAvatarImageComponent = ({ viewModel }: Props) => {
  const keys = Object.keys(EDotsNames).map((key) => key as EDotsNames);
  const dotsRef = useRef<TDotsRef>({} as TDotsRef);
  useResizeImage(viewModel, dotsRef);

  const addRef = (element: HTMLDivElement | null, key: EDotsNames) => {
    if (element && dotsRef.current) dotsRef.current = { ...dotsRef.current, [key]: element };
  };

  return (
    <div className="resize-avatar">
      {keys.map((key) => (
        <div className="resize-dot" key={key} ref={(element) => addRef(element, key)} />
      ))}
    </div>
  );
};
