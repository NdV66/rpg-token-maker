import { IAvatarImageComponentViewModel } from 'viewModels';
import { AvatarImageComponent } from './AvatarImageComponent';

import frame from 'data/frame.png';

type Props = {
  avatarImageComponentViewModel: IAvatarImageComponentViewModel;
};

export const MainComponent = ({ avatarImageComponentViewModel }: Props) => {
  return (
    <div
      className="area"
      onMouseLeave={() => {
        avatarImageComponentViewModel.imageOnCanvasMoveViewModel.turnOffIsMouseDown();
      }}
    >
      <AvatarImageComponent viewModel={avatarImageComponentViewModel} />
      <div className="frame" style={{ backgroundImage: `url('${frame}')` }} />
    </div>
  );
};
