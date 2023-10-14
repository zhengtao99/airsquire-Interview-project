
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Button, { ButtonProps } from '@mui/material/Button';

const OrangeButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
}));

export default OrangeButton;