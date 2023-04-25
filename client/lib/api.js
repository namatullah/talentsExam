import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    // },
    // withCredentials: true,
});

export default API;
