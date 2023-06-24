import { Close } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { Avatar, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Login from 'Features/Auth/components/Login';
import { logout } from 'Features/Auth/userSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Register from '../Features/Auth/components/Register';

Header.propTypes = {

};
const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
        color: "white"
    },
    closeButton: {
        position: 'absolute!important',
        top: '8px',
        right: '8px',
        width: 'fit-content'
    }
})
const MODE = {
    REGISTER: 'register',
    LOGIN: 'login'
}

function Header(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState(MODE.LOGIN)
    const loggedInUser = useSelector(state => state.user.current)
    const isloggedIn = !!loggedInUser.id
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl);
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenMenu = (event) => {
        console.log("even target", event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const action = logout()
        dispatch(action)
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <CodeIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link className={classes.link} to='/'>
                                Mc Shop
                            </Link>
                        </Typography>
                        <NavLink className={classes.link} to='/about'>  <Button color="inherit">About</Button></NavLink>
                        {!isloggedIn && <Button color="inherit" onClick={handleClickOpen}>Login</Button>}
                        {isloggedIn && <IconButton color="inherit" onClick={handleClickOpenMenu}><AccountCircleIcon /></IconButton>}
                    </Toolbar>
                </AppBar>
                <Dialog open={open} disableEscapeKeyDown onClose={handleClose}>
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <Close />
                    </IconButton>
                    <DialogContent>
                        {/* <Register registerClose={handleClose} /> */}
                        {mode === MODE.LOGIN &&
                            <>
                                <Login loginClose={handleClose} />
                                <Box textAlign='center'>
                                    <Button color='primary' onClick={() => setMode(MODE.REGISTER)}> don't have account. register here</Button>
                                </Box>
                            </>
                        }
                        {mode === MODE.REGISTER &&
                            <>
                                <Register registerClose={handleClose} />
                                <Box textAlign='center'>
                                    <Button color='primary' onClick={() => setMode(MODE.LOGIN)}> don't have account. register here</Button>
                                </Box>
                            </>
                        }

                    </DialogContent>

                </Dialog>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default Header;