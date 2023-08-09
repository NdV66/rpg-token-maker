import { IMoveImageAreaViewModel } from 'viewModels';
import { MoveImageAreaComponent } from './MoveImageAreaComponent';

type Props = {
  moveImageAreaViewModel: IMoveImageAreaViewModel;
};

export const MainComponent = ({ moveImageAreaViewModel }: Props) => {
  return (
    <div>
      <MoveImageAreaComponent viewModel={moveImageAreaViewModel} />
    </div>
  );
};
