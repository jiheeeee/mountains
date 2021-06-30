import React, { useEffect, useState } from "react";
import axios from 'axios';
import Content from "./Content";
import store from '../store';
import {
  withStyles, Container, Button, InputAdornment , Grid, TextField,
  Fab, Dialog, DialogActions, DialogContent, DialogTitle,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duetmp, setDuetmp] = useState(selectedDate.getFullYear()+'-'+(selectedDate.getMonth()+1)+'-'+selectedDate.getDate());
  
  let baseUrl = "http://localhost:8000"
  useEffect(() => {
    resyncDB();
    store.subscribe(()=>{
      const todoListfromStore = store.getState().todoList;
      for(let i=0; i<todoListfromStore.length; i++){
        setTodoList(todoListfromStore);
      }
    })
  }, []);

  const resyncDB = () => {
    axios
      .get(baseUrl+'/api/todolist/readdb')
      .then((rspn)=>{
        for(let i=0; i<rspn.data.length; i++){
          let dateObj = new Date(rspn.data[i].due);
          rspn.data[i].due = dateObj.toLocaleDateString("ko-KR", {timeZone: "Asia/Seoul"});
        }
        store.dispatch({
          type:'initializecontent',
          todoList: rspn.data,
        });
        idx = rspn.data.length;
      });
  }
  const handleWriteTodoList = () => {
    setOpenmodal(true);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleConfirm = () => {
    setOpenmodal(false);
    axios.post(
      baseUrl+'/api/todolist/insert',
      {
        id: idx,
        author: store.getState().user,
        title: titletmp,
        description: desctmp,
        due: duetmp,
      }
    ).then(()=>{
      resyncDB();
    });
  };
  const handleCancel = () => {
    setOpenmodal(false);
  };
  const handleDelete = (id) => {
    axios.post(
      baseUrl+'/api/todolist/delete', {id:id}
    ).then(()=>{
      resyncDB();
    });
  };
  const handleJoin = (id) => {
    axios.get(
      baseUrl+'/api/todolist/getparticipant'
    ).then((rspn)=>{
      if(!rspn.data[id].participants.includes(store.getState().user)){
        axios.post(
          baseUrl+'/api/todolist/joinparticipant', {user:store.getState().user, id:id}
        ).then(()=>{
          resyncDB();
        });
      }
    });
  };
  const handleLeave = (id) => {
    axios.post(
      baseUrl+'/api/todolist/leaveparticipant', {id:id}
    ).then(()=>{
      resyncDB();
    })
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
              multiline rows={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e)=>setDesctmp(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Due Day"
                disableToolbar
                variant="inline"
                format="yyyy / MM / dd"
                margin="normal"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirm} color="primary">Add</Button>
            <Button onClick={handleCancel} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
        {todoList.map(e=>{
          return(
            <Content
              id={e.id} author={e.author} title={e.title}
              description={e.description} due={e.due} participants={e.participants}
              delete={handleDelete} join={handleJoin} leave={handleLeave}
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