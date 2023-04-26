import { Grid, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { deleteCategory } from '../../hooks/category';
import DeleteDialog from '../DeleteDialog';
import Form from './Form';
import SubCategories from './subCategory/SubCategories';

const Categories = ({ category, index }) => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSubList, setOpenSubList] = useState(false);

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
            {openSubList && (
                <SubCategories
                    category={category}
                    openSubList={openSubList}
                    setOpenSubList={setOpenSubList}
                />
            )}
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
                <TableCell align="left" width="5%">
                    {index + 1}
                </TableCell>
                <TableCell align="left" width="30%">
                    {category.name}
                </TableCell>
                <TableCell align="left">
                    <Tooltip title="Sub categories list" arrow placement="top">
                        <PlaylistAddIcon
                            color="primary"
                            sx={{
                                mr: 2,
                                width: 20,
                                height: 20,
                                cursor: 'pointer',
                            }}
                            onClick={() => setOpenSubList(true)}
                        />
                    </Tooltip>
                    <Tooltip title="Edit category detail" arrow placement="top">
                        <EditIcon
                            color="primary"
                            sx={{
                                mr: 2,
                                width: 16,
                                height: 16,
                                cursor: 'pointer',
                            }}
                            onClick={() => handleEdit()}
                        />
                    </Tooltip>
                    <Tooltip title="Delete category" arrow placement="top">
                        <DeleteIcon
                            color="error"
                            sx={{
                                mr: 2,
                                width: 16,
                                height: 16,
                                cursor: 'pointer',
                            }}
                            onClick={() => handleOpenDelete(category)}
                        />
                    </Tooltip>
                </TableCell>
            </TableRow>
        </>
    );
};

export default Categories;
