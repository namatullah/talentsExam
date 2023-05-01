import React, { Fragment, useState } from 'react'
import { useGet, usePost, usePut } from '../../hooks/ApiServices';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField} from '@mui/material';
//import CloseIcon              from '@mui/icons-material/Close';

export default function AddForm({add,closeAdd,ed}) 
{
    console.log("Edit",ed);
    const [params, setParams]               = useState({question:ed?.question,category:ed?.category_id, subCategory:ed?.sub_category_id})
    const {data}                            = useGet('category')
    const {data:subCategories}              = useGet(`subCategoryOfCategory/${params?.category}`)
    const {postData,data:addResult}         = usePost();
    const {putData,data:editResult}         = usePut();
    
    const handleSubmit=e=>{
        e.preventDefault();
        if(ed)
        {
            putData('question/update',{...params,questionId:ed?.id})
        }    
        else
        {
            postData('question/add',params)
        }
    }

    //console.log('add result',addResult);
    if(addResult?.success || editResult?.success)closeAdd();

    return (<Dialog open={add} fullWidth>
        <form onSubmit={handleSubmit}>
            <DialogTitle>
                {ed?'Update':'Add'} Question
                {/* <CloseIcon color="primary" onClick={closeAdd} /> */}
            </DialogTitle>
            <DialogContent>
                <TextField
                    size='small'
                    margin="dense"
                    id="category"
                    select
                    label="Select Category"
                    variant="outlined"
                    onChange={e=>setParams({...params,category:e.target.value})}
                    value={params?.category}
                    fullWidth
                    required
                >
                    {data && data?.categories?.map(c=>
                        (ed?.category_id===c?.id)?
                        <MenuItem key={c?.id} selected value={c?.id}> {c?.name} </MenuItem>:
                        <MenuItem key={c?.id} value={c?.id}> {c?.name} </MenuItem>
                    )}
                </TextField>

                <TextField
                    size='small'
                    required
                    margin="dense"
                    id="sub-category"
                    select
                    label="Select Sub-Category"
                    variant="outlined"
                    fullWidth
                    value={params?.subCategory}
                    onChange={e=>setParams({...params,subCategory:e.target.value})}
                >
                    {subCategories ? subCategories?.subCategory?.map(sc=>
                        (ed?.sub_category_id===sc?.id)?
                        <MenuItem key={sc?.id} value={sc?.id}> {sc?.name} </MenuItem>:
                        <MenuItem selected key={sc?.id} value={sc?.id}> {sc?.name} </MenuItem>
                    ):<MenuItem value={0}>Select Sub-Category</MenuItem>}
                </TextField>
                <TextField
                    required
                    margin="dense"
                    label="Question..."
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    onChange={e=>setParams({...params,question:e.target.value})}
                    value={params?.question}
                />
            </DialogContent>
            <DialogActions style={{ padding: '0 25px 20px 20px' }}>
                <Button variant="contained" size="small" type="submit">
                    {ed?'Update':'Add'}
                </Button>
                <Button variant="contained" size="small" color="error" onClick={closeAdd}>
                    Cancel
                </Button>
            </DialogActions>
        </form>
    </Dialog>);
}
