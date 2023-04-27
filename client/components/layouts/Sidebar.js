import React from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Dashboard } from '@mui/icons-material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DrawerHeader from './DrawerHeader';
import Link from 'next/link';
// import useStyles from "../styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const Sidebar = ({ handleDrawerClose, open }) => {
    const theme = useTheme();
    const drawerComponents = [
        {
            path: '/',
            name: 'Dashboard',
            icon: <Dashboard />,
        },
        {
            path: '/exam',
            name: 'Exam',
            icon: <LocalLibraryIcon />,
        },
        {
            path: '/question',
            name: 'Question',
            icon: <LocalLibraryIcon />,
        },
        {
            path: '/category',
            name: 'Category',
            icon: <LocalLibraryIcon />,
        },
    ];
    const drawerAdmin = [
        {
            path: '/admin',
            name: 'Admin',
            icon: <AdminPanelSettings />,
        },
    ];
    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader style={{ justifyContent: 'space-between', display: 'flex' }}>
                <PsychologyIcon fontSize="large" sx={{ ml: 1 }} color="primary" />
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {drawerComponents.map((item, index) => (
                    <Link
                        href={item.path}
                        passHref
                        style={{
                            textDecoration: 'none',
                            color: 'rgba(0, 0, 0, 0.54)',
                        }}
                        key={item.name}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                ))}
                <Divider />
                {drawerAdmin.map((item, index) => (
                    <Link
                        href={item.path}
                        passHref
                        style={{
                            textDecoration: 'none',
                            color: 'rgba(0, 0, 0, 0.54)',
                        }}
                        key={item.name}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </Drawer>
    );
};
export default Sidebar;
