import { IAvatarImageComponentViewModel } from 'viewModels';
import { AvatarImageComponent } from './AvatarImageComponent';

type Props = {
  avatarImageComponentViewModel: IAvatarImageComponentViewModel;
};

export const MainComponent = ({ avatarImageComponentViewModel }: Props) => {
  return (
    <div>
      <AvatarImageComponent viewModel={avatarImageComponentViewModel} />
    </div>
  );
};
