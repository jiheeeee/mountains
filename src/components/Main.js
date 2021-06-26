import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import Content from "./Content";
import store from '../store';
import { withStyles } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import {
    Button, InputAdornment , Grid, TextField, Fab,
    Dialog, DialogActions, DialogContent, DialogTitle,
  } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  root:{
    width: "100%",
    marginTop: "20px",
  },
  appBarSpacer: theme.mixins.toolbar,
  button: {
    margin: theme.spacing(1),
  },
  fab:{
    position:"fixed", bottom:"3rem", right:"3rem"
  },
});
let idx = 0;

const Main = (props) => {
  const {classes} = props;
  const [openmodal, setOpenmodal] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [titletmp, setTitletmp] = useState('');
  const [desctmp, setDesctmp] = useState('');
  const [duetmp, setDuetmp] = useState('');
  
  let baseUrl = "http://localhost:8000"
  useEffect(() => {
    axios
      .get(baseUrl+'/api/todolist/readdb')
      .then((rspn)=>{
        console.log(rspn.data);
        store.dispatch({
          type:'initializecontent',
          todoList: rspn.data,
        });
        idx = rspn.data.length;
      });
    store.subscribe(()=>{
      const todoListfromStore = store.getState().todoList;
      for(let i=0; i<todoListfromStore.length; i++){
        setTodoList(todoListfromStore);
      }
    })
  }, []);

  const handleWriteTodoList = () => {
    setOpenmodal(true);
  };
  const handleConfirm = () => {
    setOpenmodal(false);
    store.dispatch({
      type:'addcontent',
      todoList:{
        id: idx,
        author: store.getState().user,
        title: titletmp,
        description: desctmp,
        due: duetmp,
      },
    });
    idx = idx + 1;
  };
  const handleCancel = () => {
    setOpenmodal(false);
  };
  const handleDelete = (id) => {
    store.dispatch({
      type:'deletecontent',
      id:{
        id:id,
      },
    });
    axios
      .get(baseUrl+'/api/todolist/readdb')
      .then((rspn)=>{
        console.log(rspn.data);
        store.dispatch({
          type:'initializecontent',
          todoList: rspn.data,
        });
        idx = rspn.data.length;
      });
  };
  
  return(
    <main>
      <div className={classes.appBarSpacer}/>
      <Container>
        <Dialog open={openmodal} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">할 일이 태산</DialogTitle>
          <DialogContent>
            <TextField
              id="titleinput" label="Title" fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setTitletmp(e.target.value)}
            />
            <TextField
              id="descinput" label="Description" fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setDesctmp(e.target.value)}
            />
            <TextField
              id="dueinput" label="Due Day" fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setDuetmp(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm} color="primary">Add</Button>
            <Button onClick={handleCancel} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
        {todoList.map(e=>{
          return(
            <Content
              id={e.id} author={e.author} title={e.title} description={e.description} due={e.due}
              delete={handleDelete}
            />);
        })}
      </Container>
      <Fab
        className={classes.fab}
        color="primary"
        onClick={handleWriteTodoList}>
        <EditIcon/>
      </Fab>
    </main>
  );
}

export default withStyles(styles)(Main);