import { Chip, Grid } from '@mui/material';
import { useState } from 'react';
import { deleteSubCategory } from '../../../hooks/category';
import DeleteDialog from '../../DeleteDialog';


const Items = ({ category, subCategory }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    return (
        <>
            {openDelete && (
                <DeleteDialog
                    id={subCategory.id}
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    handleDelete={deleteSubCategory}
                    title={"Are you sure to delete sub category ("+ subCategory.name+") that is belongs to ("+category.name+") category ?"}
                    description="Note: after deletion all question related to this category will lost."
                />
            )}
            <Grid item>
                <Chip
                    label={subCategory.name}
                    variant="outlined"
                    onDelete={() => handleOpenDelete()}
                />
            </Grid>
        </>
    );
};

export default Items;
