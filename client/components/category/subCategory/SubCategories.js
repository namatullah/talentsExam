import { Grid, Tooltip } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form';
import AlertMessage from '../../AlertMessage';
import Items from './Items';

const SubCategories = ({ category }) => {
    const [open, setOpen] = useState(false);

    const openForm = () => {
        setOpen(true);
    };
    const closeForm = () => {
        setOpen(false);
    };

    return (
        <>
            {open && (
                <Form open={open} closeForm={closeForm} category={category} />
            )}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Tooltip title="Add a new category" arrow placement="left">
                    <AddIcon
                        color="primary"
                        sx={{
                            mr: 3,
                            cursor: 'pointer',
                        }}
                        onClick={() => openForm()}
                    />
                </Tooltip>

                {category.sub_categories.length > 0 ? (
                    <Grid item xs container direction="row" spacing={2}>
                        {category.sub_categories.map((sub) => (
                            <Items
                                category={category}
                                subCategory={sub}
                                key={sub.id}
                            />
                        ))}
                    </Grid>
                ) : (
                    <AlertMessage
                        severity="info"
                        message="No sub category inserted"
                    />
                )}
            </div>
        </>
    );
};

export default SubCategories;
