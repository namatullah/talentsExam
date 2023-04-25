import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { addSubCategory } from '../../../hooks/category';

const Form = ({ open, closeForm, category }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setError(true);
            setErrorText('This field is required');
        } else {
            addSubCategory({ name, id: category.id })
                .then((res) => console.log(res.data.message))
                .catch((error) => console.log(error));
        }
        handleCancel();
    };

    const handleCancel = () => {
        setName('');
        closeForm();
    };

    return (
        <Dialog open={open} fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    Add Sub Category for <b>{category.name}</b>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        error={error}
                        margin="dense"
                        label="Category name"
                        fullWidth
                        variant="outlined"
                        value={name}
                        helperText={errorText}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                    <Button variant="contained" size="small" type="submit">
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default Form;
