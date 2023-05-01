import { useState, useEffect } from "react";
import API          from '../lib/api';
import {Toast}      from '../lib/SweetAlert'

export const useGet = (route,reload)=>
{
    const [data,setData]    = useState(null);
    const [error,setError]  = useState(false);
    useEffect(()=>{
        API.get(route).then(data=>
        {
            if(data?.data?.success)setData(data?.data)
            setError(data?.data?.message);
        }).catch(err=>{
            setError(err)
        })
    },[route,reload])
    return {data,error}
}

export const useGetOnClick = ()=>
{
    const [data,setData]    = useState(null);
    const [error,setError]  = useState(false);
    const getData = (route)=>{
        try{
            API.get(route).then(data=>{
                if(data?.data?.success)setData(data?.data)
                setError(data?.data?.message);
            }).catch(err=>{
                setError(err)
            })
        }catch(err){
            setError(err)
        }
    }
    return {getData,data}
}

export const usePost = ()=>
{
    const [data,setData]    = useState(null);
    const [error,setError]  = useState(false);
    const postData = (route,params)=>{
        try{
            API.post(route,params).then(data=>
            {
                let icon = 'error'
                if(data?.data?.success)
                {   
                    setData(data?.data)
                    icon = 'success';
                }
                else
                setError(data?.data?.message);
                Toast.fire({icon,title: data?.data?.message});
            }).catch(err=>{
                setError(err)
            })
        }catch(err){
            setError(err)
        }
    }
    return {postData,data,error}
}

export const usePut = ()=>
{
    const [data,setData]    = useState(null);
    const [error,setError]  = useState(false);
    const putData = (route,params)=>{
        try{
            API.put(route,params).then(data=>
            {
                let icon = 'error'
                if(data?.data?.success)
                {
                    setData(data?.data)
                    icon = 'success';
                }
                else
                setError(data?.data?.message);
                Toast.fire({icon,title: data?.data?.message});
            }).catch(err=>{
                setError(err)
            })
        }catch(err){
            setError(err)
        }
    }
    return {putData,data,error}
}

export const useDelete = ()=>
{
    const [data,setData]    = useState(null);
    const [error,setError]  = useState(false);
    const deleteData = (route)=>{
        try{
            API.delete(route).then(data=>
            {
                let icon = 'error'
                if(data?.data?.success)
                {
                    setData(data?.data)
                    icon = 'success';
                }
                else
                setError(data?.data?.message);
                Toast.fire({icon,title: data?.data?.message});
            }).catch(err=>{
                setError(err)
            })
        }catch(err){
            setError(err)
        }
    }
    return {deleteData,data,error}
}
