import './styles.css';
import { IMoveImageAreaViewModel } from 'viewModels';
import { AvatarImageComponent } from './AvatarImageComponent/AvatarImageComponent';

type Props = {
  moveImageAreaViewModel: IMoveImageAreaViewModel;
};

export const MainComponent = ({ moveImageAreaViewModel }: Props) => {
  return (
    <div className="main-component">
      <AvatarImageComponent viewModel={moveImageAreaViewModel} />
    </div>
  );
};
