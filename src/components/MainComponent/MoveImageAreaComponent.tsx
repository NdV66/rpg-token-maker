import './styles.css';
import { IMoveImageAreaViewModel } from 'viewModels';
import { useMouseImageAreaViewModel } from './useMoveImageArea';

type Props = {
  viewModel: IMoveImageAreaViewModel;
};

export const MoveImageAreaComponent = ({ viewModel }: Props) => {
  const { handleMouseUp, moveRef } = useMouseImageAreaViewModel(viewModel);

  return <div className="bg-gray-200 move-image" ref={moveRef} onMouseUp={handleMouseUp}></div>;
};
