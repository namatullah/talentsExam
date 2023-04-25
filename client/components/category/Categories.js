import { Grid, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SubCategories from './subCategory/SubCategories';
import { deleteCategory } from '../../hooks/category';
import DeleteDialog from '../DeleteDialog';
import Form from './Form';

const Categories = ({ category, index }) => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleEdit = () => {
        setOpen(true);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    };
    const closeForm = () => {
        setOpen(false);
    };

    return (
        <>
            {open && (
                <Form open={open} closeForm={closeForm} category={category} />
            )}
            {openDelete && (
                <DeleteDialog
                    id={category.id}
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    handleDelete={deleteCategory}
                    title={
                        'Are you sure to delete (' +
                        category.name +
                        ') category ?'
                    }
                    description="Note: after deletion all sub categories and related question will be lost."
                />
            )}
            <TableRow>
                <TableCell align="left" width="5%">{index + 1}</TableCell>
                <TableCell align="left" width="30%">
                    <Grid item xs container direction="row">
                        <Grid item>
                            <Typography
                                sx={{
                                    cursor: 'pointer',
                                    m: '5px 5px 0px 0px',
                                }}
                                variant="body2"
                            >
                                <Tooltip
                                    title="Edit category detail"
                                    arrow
                                    placement="top"
                                >
                                    <EditIcon
                                        color="primary"
                                        sx={{
                                            mr: 1,
                                            width: 16,
                                            height: 16,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleEdit()}
                                    />
                                </Tooltip>
                                <Tooltip
                                    title="Delete category"
                                    arrow
                                    placement="top"
                                >
                                    <DeleteIcon
                                        color="error"
                                        sx={{
                                            mr: 1,
                                            width: 16,
                                            height: 16,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            handleOpenDelete(category)
                                        }
                                    />
                                </Tooltip>
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                            >
                                {category.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </TableCell>
                <TableCell align="left">
                    <SubCategories category={category} />
                </TableCell>
            </TableRow>
        </>
    );
};

export default Categories;
