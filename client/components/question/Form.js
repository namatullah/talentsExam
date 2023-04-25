import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { addQuestion } from '../../hooks/question';

const Form = ({ open, closeForm, categories }) => {
    const [category, setCategory] = useState('');

    const { sub_categories } = categories.categories.find(
        (cate) => cate.id === category
    ) ?? { sub_categories: null };
    const [subCategory, setSubCategory] = useState('');
    const [question, setQuestion] = useState('');

    const [errors, setErrors] = useState({
        category: false,
        subCategory: false,
        question: false,
    });
    const [errorTexts, setErrorTexts] = useState({
        category: '',
        subCategory: '',
        question: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(category, subCategory, question);
        if (!category) {
        console.log('here');

            setErrors({ category: true });
            setErrorTexts({ category: 'This field is required' });
        } else if (!subCategory) {
        console.log('here2');

            setErrors({ subCategory: true });
            setErrorTexts({ subCategory: 'This field is required' });
        } else if (!question) {
        console.log('here3');

            setErrors({ question: true });
            setErrorTexts({ question: 'This field is required' });
        } else {
            console.log(category, subCategory, question);
            addQuestion({ category, subCategory, question })
                .then((res) => console.log(res))
                .catch((error) => console.log(error));
            handleCancel();
        }
    };

    const handleCancel = () => {
        setCategory('');
        setSubCategory('');
        setQuestion('');
        closeForm();
    };

    return (
        <Dialog open={open} fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add Question</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="outlined-select-currency"
                        select
                        label="Select Category"
                        variant="outlined"
                        value={category}
                        fullWidth
                        error={errors.category}
                        helperText={errorTexts.category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.categories.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    {sub_categories && (
                        <TextField
                            margin="dense"
                            id="outlined-select-currency"
                            select
                            label="Select Sub Category"
                            variant="outlined"
                            value={subCategory}
                            fullWidth
                            error={errors.category}
                            helperText={errorTexts.category}
                            onChange={(e) => setSubCategory(e.target.value)}
                        >
                            {sub_categories.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}

                    <TextField
                        error={errors.question}
                        margin="dense"
                        label="Question"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        value={question}
                        helperText={errorTexts.question}
                        onChange={(e) => setQuestion(e.target.value)}
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
