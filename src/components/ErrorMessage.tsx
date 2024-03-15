import React, { useEffect, useState } from 'react';
import { Alert, Slide } from '@mui/material';

interface Props {
    message: string;
    status: number;
}

const ErrorMessage: React.FC<Props> = ({ message, status }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setOpen(false);
        if (status === 1) setOpen(true);
        else setOpen(false);


    }, [status]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Alert
                    variant="filled"
                    severity="error"
                    sx={{
                        position: 'absolute',
                        bottom: '2rem',
                        right: '1rem',
                    }}
                    onClose={handleClose}
                >
                    {message}
                </Alert>
            </Slide>
        </div>
    );
};

export default ErrorMessage;
