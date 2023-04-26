import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Form from './Form';
import AlertMessage from '../../AlertMessage';

const SubCategories = ({ category, openSubList, setOpenSubList }) => {
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
            <Dialog open={openSubList} fullWidth>
                <DialogTitle>SubCategories</DialogTitle>
                <DialogContent>
                    <TableContainer
                        component={Paper}
                        raised="true"
                        elevation={6}
                    >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        style={{ fontWeight: 'bold' }}
                                        align="left"
                                    >
                                        <Tooltip
                                            title="Add a new category"
                                            arrow
                                            placement="left"
                                        >
                                            <AddIcon
                                                color="primary"
                                                onClick={() => setOpen(true)}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        style={{ fontWeight: 'bold' }}
                                        align="left"
                                    >
                                        #
                                    </TableCell>
                                    <TableCell
                                        style={{ fontWeight: 'bold' }}
                                        align="left"
                                    >
                                        Sub category
                                    </TableCell>
                                    <TableCell
                                        style={{ fontWeight: 'bold' }}
                                        align="left"
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.sub_categories.length > 0 ? (
                                    category.sub_categories.map(
                                        (sub, index) => (
                                            <TableRow>
                                                <TableCell align="left">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {sub.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Tooltip
                                                        title="Edit category detail"
                                                        arrow
                                                        placement="top"
                                                    >
                                                        <EditIcon
                                                            color="primary"
                                                            sx={{
                                                                mr: 2,
                                                                width: 16,
                                                                height: 16,
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() =>
                                                                handleEdit()
                                                            }
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
                                                                mr: 2,
                                                                width: 16,
                                                                height: 16,
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() =>
                                                                handleOpenDelete(
                                                                    category
                                                                )
                                                            }
                                                        />
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell align="left">
                                            <AlertMessage
                                                severity="info"
                                                message="No sub category inserted"
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2 }}>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => setOpenSubList(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SubCategories;
