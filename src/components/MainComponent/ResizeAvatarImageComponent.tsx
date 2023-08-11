import { useRef } from 'react';
import { IResizeAvatarImageComponentViewModel } from 'viewModels';
import { useResizeImage } from './useResizeImage';
import { EDotsNames, TDotsRef } from 'types';

type Props = {
  viewModel: IResizeAvatarImageComponentViewModel;
};

export const ResizeAvatarImageComponent = ({ viewModel }: Props) => {
  const dotsRef = useRef<TDotsRef>({} as TDotsRef);
  useResizeImage(viewModel, dotsRef);

  const addRef = (element: HTMLDivElement | null, key: EDotsNames) => {
    if (element && dotsRef.current) dotsRef.current = { ...dotsRef.current, [key]: element };
  };

  return (
    <div className="resize-avatar">
      <div className="resize-dot" key="A" ref={(element) => addRef(element, EDotsNames.A)} />
      <div className="resize-dot" key="B" ref={(element) => addRef(element, EDotsNames.B)} />
      <div className="resize-dot" key="C" ref={(element) => addRef(element, EDotsNames.C)} />
      <div className="resize-dot" key="D" ref={(element) => addRef(element, EDotsNames.D)} />
    </div>
  );
};
