import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TTranslations } from 'types';
import { IImageUploadViewModel } from 'viewModels';

type Props = {
  translations: TTranslations;
  viewModel: IImageUploadViewModel;
};

export const UploadImageComponent = ({ translations, viewModel }: Props) => (
  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
    {translations.uploadAvatar}
    <VisuallyHiddenInput type="file" onChange={(event) => viewModel.uploadImage(event?.target?.files?.[0])} />
  </Button>
);

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
