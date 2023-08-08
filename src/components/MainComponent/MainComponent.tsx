import { IMoveImageAreaViewModel } from 'viewModels';
import { MoveImageArea } from './MoveImageArea';

type Props = {
  moveImageAreaViewModel: IMoveImageAreaViewModel;
};

export const MainComponent = ({ moveImageAreaViewModel }: Props) => {
  return (
    <div>
      <MoveImageArea viewModel={moveImageAreaViewModel} />
    </div>
  );
};
