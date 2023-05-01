import React, { Fragment,memo,useState,useEffect }    from 'react'
import AddIcon                              from '@mui/icons-material/Add';
import EditIcon                             from '@mui/icons-material/Edit';
import DeleteIcon                           from '@mui/icons-material/Delete';
import { useGet,useDelete }                 from '../../hooks/ApiServices';
import { Button,Pagination, TableFooter }   from '@mui/material';
import {Mixin,SwalConfirm}       from '../../lib/SweetAlert';
//import Swal                                 from 'sweetalert2'

import { Alert,
    TablePagination,
    Paper, 
    Table, 
    TableBody,
    TableCell, 
    TableContainer, 
    TableHead,
    TableRow, 
    Tooltip } from '@mui/material';
import AddForm from './AddForm';
function List() 
{
    const [page,setPage]        = useState(0);
    const [rowPerPage,setRowPerPage]  = useState(5);
    const [add, setAdd]         = useState(false);
    const [edit, setEdit]       = useState(false);
    const [reload,setReload]    = useState(0);
    const {deleteData,data:delResult}         = useDelete();
   
    const handleEdit=d=>{
        setAdd(true);
        setEdit(d);
    }

    const handleAdd=()=>{
        setAdd(true);
        setEdit(false)
    }
    const handleDelete=id=>{
        Mixin(SwalConfirm).then( async result=>{
            if (result.isConfirmed) 
            {
                await deleteData(`question/delete/${id}`)
                setReload(Math.random());
            }
        })
    }

    const closeAdd=()=>{
        setReload(Math.random());
        setAdd(false);
    }
    
    useEffect(()=>{
        setReload(Math.random())
    },[delResult])

    const handleChangeRowsPerPage = e => {
        setRowPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };
    
    const {data,error} = useGet(`question?page=${page+1}&limit=${rowPerPage}`,reload)
    const qus = data?.questions;
    return (<>
        {add && <AddForm add={add} closeAdd={closeAdd} ed={edit} />}
        <TableContainer component={Paper} raised="true" elevation={6}>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={5} style={{ fontWeight: 'bold' }} align="right">
                            <Tooltip title="Add a new Question" arrow placement="left">
                                <AddIcon color="primary" onClick={handleAdd} />
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                            #
                        </TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                            Category
                        </TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                            Sub Category
                        </TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                            Question
                        </TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="left">
                            Operations
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.success ? qus?.data?.map((d,i)=>
                        <TableRow key={d?.id}>
                            <TableCell align="left">{qus?.from+i}</TableCell>
                            <TableCell>{d?.category}</TableCell>
                            <TableCell>{d?.subCategory}</TableCell>
                            <TableCell align='left'>{d?.question} </TableCell>
                            <TableCell align="left">
                                <Tooltip title="Edit Question Detail" arrow placement="top">
                                    <EditIcon
                                        color="primary"
                                        sx={{
                                            mr: 2,
                                            width: 16,
                                            height: 16,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleEdit(d)}
                                    />
                                </Tooltip>
                                <Tooltip title="Delete Question" arrow placement="top">
                                    <DeleteIcon
                                        color="error"
                                        sx={{
                                            mr: 2,
                                            width: 16,
                                            height: 16,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleDelete(d?.id)}
                                    />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ):
                    <TableRow>
                        <TableCell>
                            Record is not available.
                        </TableCell>
                    </TableRow>}
                    
                </TableBody>
                <TableFooter>
                    <TableRow>
                        {data?.success && 
                        <TableCell colSpan={5} align='right'>
                            <TablePagination 
                                rowsPerPageOptions={[5,10,20]}
                                component="div"
                                count={qus?.total}
                                rowsPerPage={qus?.per_page}
                                page={page}
                                onPageChange={(e, newPage)=>setPage(newPage)}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableCell>}
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </>);
}
export default memo(List)
