import { MainComponent } from './MainComponent/MainComponent';
import { IMainComponentViewModel } from 'viewModels';

type Props = {
  mainComponentViewModel: IMainComponentViewModel;
};

export const HomePage = ({ mainComponentViewModel }: Props) => {
  return (
    <div>
      <MainComponent mainComponentViewModel={mainComponentViewModel} />
    </div>
  );
};
