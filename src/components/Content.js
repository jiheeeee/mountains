import React, { Component, useEffect, useState } from "react";
import store from "../store";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import {
    Button, IconButton,
    Card, CardHeader, CardContent, CardActions, Collapse,
    List, ListItem, ListItemText, ListItemAvatar,
    Avatar, Divider
  } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  const [user, setUser] = useState('JH');
  const [cardExpand, setCardExpand] = useState(false);

  useEffect(() => { 
    // store.subscribe(()=>{
    //   setTodoContent({
    //     title: store.getState().title,
    //     desc: store.getState().desc,
    //     due: store.getState().due,
    //   });
    // })
  }, []);
  const id = props.id;
  const handleJoin = () => {
    alert('Joined :)');
  };
  const handleLeave = () => {
    alert('Leaved :(');
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
  
  return(
    <Card className={classes.card} elevation={1}>
      <CardHeader
        title={props.title}
        action={
          <div>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: cardExpand,
              })}
              onClick={handleExpand}
            ><ExpandMoreIcon/></IconButton>
            <IconButton
              onClick={handleDelete}
            ><MoreVertIcon/></IconButton>
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
              <ListItemText primary={props.desc}/>
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