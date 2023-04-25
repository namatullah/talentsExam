import { Alert } from '@mui/material';

const AlertMessage = ({ severity, message }) => {
    return <Alert severity={severity}>{message}</Alert>;
};

export default AlertMessage;
