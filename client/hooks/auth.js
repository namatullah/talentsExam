import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import API from '../lib/api';
export const useAuth = ({ middleware } = {}) => {
    const router = useRouter();

    // Loading
    const [isLoading, setIsLoading] = useState(false);

    // User
    const {
        data: user,
        error,
        mutate,
    } = useSWR('/user', () =>
        API.get('user')
            .then((response) => response.data.data)
            .catch((error) => {
                if (error.response.status !== 409) throw error;
            })
    );

    // CSRF
    const csrf = () => API.get('/sanctum/csrf-cookie');

    // Login
    const login = async ({ setErrors, ...props }) => {
        setErrors([]);
        await csrf();
        API.post('login', props)
            .then(() => mutate() && router.push('/dashboard'))
            .catch((error) => {
                if (error.response.status != 422) throw error;
                setErrors(Object.values(error.response.data.errors).flat());
            });
    };

    // Logout
    const logout = async () => {
        await API.post('logout');
        mutate(null);
        router.push('/');
    };

    useEffect(() => {
        if (user || error) {
            setIsLoading(false);
        }

        if (middleware == 'guest' && user) router.push('/');
        if (middleware == 'auth' && error) router.push('/login');
    }, []);

    return {
        user,
        csrf,
        isLoading,
        login,
        logout,
    };
};
