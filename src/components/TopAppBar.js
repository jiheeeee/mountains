import React, { useEffect, useState } from "react";
import store from '../store';
import { withStyles } from "@material-ui/core";
import {
  Container, AppBar, Toolbar, Typography, Button, IconButton,
  Avatar, Menu, MenuItem, Snackbar, Slide, Card
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import jhahn from "../jhahn.jpg";
import jhjeon from "../jhjeon.jpg";
import ykpark from "../ykpark.jpg";
import { CalendarOutlined } from '@ant-design/icons';
import CalendarAntd from "./CalendarAntd";

const styles = theme => ({
  root:{
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  snackbar:{
    position: 'absolute',
    top: '88px',
    left: '80vw',
    width: '100%',
    marginRight: '1000px',
  },
  hide: {
    display: "none",
  },
  drawer: {
    margin: 10,
  }
});
const Alert = React.forwardRef((props, ref) => 
  <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />
);
function SlideTransition(props) {
  return <Slide {...props} direction="down"/>;
}

const TopAppBar = (props) => {
  const {classes} = props;
  const [user, setUser] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loginSnackbar, setLoginSnackbar] = useState(true);
  const [visible, setvisible] = useState(false);
  
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  const handleChangeUser = (user) => {
    setUser(user);
    store.dispatch({
      type: 'changeuser',
      user: user,
    });
    setAnchorEl(null);
    setOpenSnackbar(true);
    setTimeout(()=>{setOpenSnackbar(false)},3000);
  }
  const showDrawer = () => {
    if (visible === true) {
      setvisible(false);
    }
    else {
      setvisible(true);
    }
  }
  const getUserAvatar = (user) => {
    switch(user){
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
  const getLoginMessage = (user) => {
    switch(user){
      case 'JA':
        return 'Welcome 재현!';
      case 'JJ':
        return 'Welcome 즤!';
      case 'YP':
        return 'Welcome 용규!';
      default:
        return 'Please Login First!'
    }
  }
  
  return(
    <Container disableGutters={true}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            할 일이 태산
            <CalendarOutlined onClick={showDrawer} style={{ padding: 20 }} />
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
          <Snackbar
            className={classes.snackbar}
            open={openSnackbar}
            TransitionComponent={SlideTransition}
          >
            <Alert severity="success">{getLoginMessage(user)}</Alert>
          </Snackbar>
          <Snackbar
            className={classes.snackbar}
            open={loginSnackbar}
            onClose={()=>setLoginSnackbar(false)}
            autoHideDuration={3000}
            TransitionComponent={SlideTransition}
          >
            <Alert severity="info">{getLoginMessage(user)}</Alert>
          </Snackbar>
        </Toolbar>
        <Card className={visible ? classes.drawer : classes.hide}>
          <CalendarAntd />
        </Card>
      </AppBar>
    </Container>
  );
}

export default withStyles(styles)(TopAppBar);
