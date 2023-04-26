import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { addCategory, updateCategory } from '../../hooks/category';

const Form = ({ open, closeForm, category = null }) => {
    const [name, setName] = useState(category?.name ?? '');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            setError(true);
            setErrorText('This field is required');
        } else {
            if (category) {
                console.log(name);
                const res = await updateCategory(category.id, { name: name });
                console.log(res);
            } else {
                await addCategory({ name })
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
            }
            handleCancel();
        }
    };

    const handleCancel = () => {
        setName('');
        closeForm();
    };

    return (
        <Dialog open={open} fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add Category</DialogTitle>
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
                    <Button variant="contained" size="small" color="error" onClick={handleCancel}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default Form;
