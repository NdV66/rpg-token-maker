import { IAvatarImageComponentViewModel } from 'viewModels';
import { AvatarFrameComponent } from './AvatarFrameComponent';
import { AvatarImageComponent } from './AvatarImageComponent';

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
      <AvatarFrameComponent viewModel={avatarImageComponentViewModel} />
    </div>
  );
};
