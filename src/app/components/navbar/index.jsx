import React from 'react';
import { BrowserRouter, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from "@material-ui/core/Grid";

import logo from "./assets/ac_logo_24.png";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "10vh",
        boxShadow: "0 2px 12px 6px rgba($color: #000000, $alpha: 0.1)",
        position: "relative",
        padding: "24px 12px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: "2",
        background: "#FFFFFF",
        
    },
    menuButton: {
        marginLeft: theme.spacing(2),
        paddingTop: '0',
        color: '#02111B',
        
    },
    menuList: {
        color: '#005C97',
    },
}));

export default function NavBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <AppBar position="fixed" className={classes.root}> 
                <Toolbar>
                    <Grid
                        justify="space-between"
                        container
                        spacing={4}
                    >
                        <Grid item>
                            <img src={logo} alt="Above Curve" data-testid="ac-footer-logo"></img>
                        </Grid>
                        <Grid item>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <BrowserRouter>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <Typography  variant="h6">
                                        <MenuItem className={classes.menuList} onClick={handleClose} component={Link} to="/country">Country View</MenuItem>
                                        <MenuItem className={classes.menuList} onClick={handleClose} component={Link} to="/state">State View</MenuItem>
                                        <MenuItem className={classes.menuList} onClick={handleClose} component={Link} to="/saved">My Saved Reports</MenuItem>
                                        <MenuItem className={classes.menuList} onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
                                    </Typography>
                                </Menu> 
                            </BrowserRouter>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
