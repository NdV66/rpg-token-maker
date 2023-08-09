import './styles.css';
import { IMoveImageAreaViewModel } from 'viewModels';
import { AvatarImageComponent } from './AvatarImageComponent/AvatarImageComponent';

import img from 'data/testImg.jpg';

const DRAW_WIDTH_PX = 280; //TODO env

type Props = {
  moveImageAreaViewModel: IMoveImageAreaViewModel;
};

export const MainComponent = ({ moveImageAreaViewModel }: Props) => {
  return (
    <div className="main-component">
      <AvatarImageComponent imgSrc={img} defaultDrawWidth={DRAW_WIDTH_PX} />
    </div>
  );
};
