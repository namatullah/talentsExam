import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Footer from '../Footer';
import DrawerHeader from './DrawerHeader';
import Nav from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Nav handleDrawerOpen={handleDrawerOpen} open={open} />
            <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
