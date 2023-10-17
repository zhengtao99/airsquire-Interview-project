import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import * as React from 'react';


const ConnectionError = () => {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Unable to connect to the server. Please contact me at <strong>zhengtaolim@gmail.com</strong> if you need any assistance.
        </Alert>
    )
}

export default ConnectionError;