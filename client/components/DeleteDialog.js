import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteDialog = ({ id, openDelete, setOpenDelete, handleDelete, title, description = null }) => {
    const onDelete = async () => {
        const { data } = await handleDelete(id);
        handleCloseDelete();
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    return (
        <Dialog
            maxWidth="xs"
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            half="true"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                {description && <DialogContentText id="alert-dialog-description">{description}</DialogContentText>}
            </DialogContent>
            <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                <Button variant="contained" size="small" color="error" onClick={onDelete}>
                    yes
                </Button>
                <Button variant="contained" size="small" onClick={handleCloseDelete}>
                    no
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default DeleteDialog;
