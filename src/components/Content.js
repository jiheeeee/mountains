import React, { Component, useEffect, useState } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import {
    Button, IconButton,
    Card, CardHeader, CardContent, CardActions, Collapse,
    List, ListItem, ListItemText, ListItemAvatar,
    Avatar, Divider, Badge, Menu, MenuItem
  } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import jhahn from "../jhahn.jpg";
import jhjeon from "../jhjeon.jpg";
import ykpark from "../ykpark.jpg";

const styles = theme => ({
  root:{
    width: "100%",
  },
  card:{
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "0px",
    marginRight: "0px",
  },
  button: {
    margin: theme.spacing(1),
  },
  smallavatar:{
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  expand:{
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

const Content = (props) => {
  const {classes} = props;
  const [cardExpand, setCardExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const id = props.id;
  var participants = [];
  useEffect(() => {
    var participantsArray = props.participants.split(';');
    for(let i=0; i<participantsArray.length-1; i++){
      participants = [...participants, participantsArray[i]];
    }
    participants.map(e=>{
      console.log(e);
    });
  }, []);

  const handleJoin = () => {
    props.join(id);
  };
  const handleLeave = () => {
    props.leave(id);
  };
  const handleExpand = () => {
    setCardExpand(!cardExpand);
  };
  const handleDelete = () =>{
    props.delete(id);
  }
  const handleTest = () => {
    alert('TEST');
  };
  const handleOptionMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  }
  const getUserIconAvatar = (name) => {
    switch(name){
      case 'JA':
        return <Badge badgeContent='JHyun' color="primary"><Avatar src={jhahn}/></Badge>;
      case 'JJ':
        return <Badge badgeContent='Jihee' color="secondary"><Avatar src={jhjeon}/></Badge>;
      case 'YP':
        return <Badge badgeContent='YongQ' color="primary"><Avatar src={ykpark}/></Badge>;
      default:
        return <Avatar/>;
    }
  };
  const getParticipantIconAvatar = (name) => {
    switch(name){
      case 'JA':
        return <Badge badgeContent={<FavoriteIcon fontSize="inherit"/>} color="secondary"><Avatar src={jhahn} className={classes.smallavatar}/></Badge>;
      case 'JJ':
        return <Badge badgeContent={<FavoriteIcon fontSize="inherit"/>} color="secondary"><Avatar src={jhjeon} className={classes.smallavatar}/></Badge>;
      case 'YP':
        return <Badge badgeContent={<FavoriteIcon fontSize="inherit"/>} color="secondary"><Avatar src={ykpark} className={classes.smallavatar}/></Badge>;
      default:
        return <Avatar/>;
    }
  };
  
  return(
    <Card className={classes.card} elevation={1}>
      <CardHeader
        title={props.title}
        action={
          <div style={{display:'flex'}}>
            {getUserIconAvatar(props.author)}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: cardExpand,
              })}
              onClick={handleExpand}
            ><ExpandMoreIcon/></IconButton>
            <IconButton
              onClick={handleOptionMenuOpen}
            ><MoreVertIcon/></IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleOptionMenuClose}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem onClick={()=>handleDelete()}>Delete</MenuItem>
            </Menu>
          </div>
        }
      />
      <Collapse in={cardExpand} timeout="auto" unmountOnExit>
        <CardContent>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.smallavatar}>
                  <WorkIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={props.description}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.smallavatar}>
                  <EventIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText secondary={props.due} />
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
      <CardActions style={{justifyContent:'flex-end'}}>
        {participants.map(e=>{
          return(getParticipantIconAvatar(e));
        })}
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<ThumbUpAltIcon/>}
          className={classes.button}
          onClick={()=>{handleJoin();}}>Join</Button>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<ThumbDownAltIcon/>}
          className={classes.button}
          onClick={()=>{handleLeave();}}>Leave</Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(Content);