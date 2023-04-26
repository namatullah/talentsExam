import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
const initialState = {
    email: '',
    password: '',
};
import styles from '../../styles/auth.module.css';
import Input from '../../components/Input';
import Link from 'next/link';
// import { useAuth } from '../../hooks/auth';
import Errors from '../../components/Errors';
import axios from 'axios';
import API from '../../lib/api';
const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPasswrod] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState([]);

    // const { login, isLoading, user } = useAuth({ middleware: 'guest' });

    const handleShowPassword = () => setShowPasswrod((showPassword) => !showPassword);
    const handleSubmit = async (e) => {
        e.preventDefault();

        API.get('/sanctum/csrf-cookie').then((response) => {
            API.post('/login', formData)
                .then((response) => {
                    if (response.status === 204) {
                        console.log('success');
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        console.log('errror');
                    } else {
                        console.log('unkown error');
                    }
                });
        });
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={styles.paper} elevation={3}>
                <Avatar className={styles.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Sign In</Typography>

                <Errors errors={errors} />

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submit}>
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button>
                                <Link href="/auth/register">Don't have an acount? Sign Up</Link>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
