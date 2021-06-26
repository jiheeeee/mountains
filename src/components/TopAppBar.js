import React, { Component, useEffect, useState } from "react";
import store from '../store';
import { withStyles } from "@material-ui/core";
import {
  Container, AppBar, Toolbar, Typography, Button, IconButton,
  Avatar, Menu, MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import jhahn from "../jhahn.jpg";
import jhjeon from "../jhjeon.jpg";
import ykpark from "../ykpark.jpg";
import userEvent from "@testing-library/user-event";

const styles = theme => ({
  root:{
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

const TopAppBar = (props) => {
  const {classes} = props;
  const [user, setUser] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  const handleChangeUser = (name) => {
    setUser(name);
    store.dispatch({
      type:'changeuser',
      user:name,
    });
    setAnchorEl(null);
  }
  const getUserAvatar = (name) => {
    switch(name){
      case 'JA':
        return <Avatar src={jhahn}></Avatar>;
      case 'JJ':
        return <Avatar src={jhjeon}></Avatar>;
      case 'YP':
        return <Avatar src={ykpark}></Avatar>;
      default:
        return <Avatar/>
    }
  };
  
  return(
    <Container disableGutters="true">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Mountains
          </Typography>
          <Button onClick={handleUserMenuOpen}>
            {getUserAvatar(user)}
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={()=>handleChangeUser('JA')}>안재현</MenuItem>
            <MenuItem onClick={()=>handleChangeUser('JJ')}>전지희</MenuItem>
            <MenuItem onClick={()=>handleChangeUser('YP')}>박용규</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default withStyles(styles)(TopAppBar);