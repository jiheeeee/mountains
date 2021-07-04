import React, { useEffect, useState } from "react";
import axios from 'axios';
import Content from "./Content";
import store from '../store';
import {
  withStyles, Container, Button, InputAdornment, TextField,
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
  textField:{
    marginBottom: "30px",
  },
});
let idx = 0;

const Main = (props) => {
  const {classes} = props;
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [idtmp, setIdtmp] = useState('');
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
    setOpenCreateModal(true);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDuetmp(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
  };
  const handleCreateConfirm = () => {
    setOpenCreateModal(false);
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
  const handleEditConfirm = (id) => {
    setOpenEditModal(false);
    axios.post(
      baseUrl+'/api/todolist/edit',
      {
        id: id,
        author: store.getState().user,
        title: titletmp,
        description: desctmp,
        due: duetmp,
      }
    ).then(()=>{
      resyncDB();
    });
  };
  const handleEdit = (id) => {
    if(todoList[id] !== undefined){
      setIdtmp(id);
      setTitletmp(todoList[id].title);
      setDesctmp(todoList[id].description);
      setDuetmp(todoList[id].due.replace('. ','-').replace('. ','-').replace('.',''));
    }
    setOpenEditModal(true);
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
          baseUrl+'/api/todolist/updateparticipant',
          {user:rspn.data[id].participants+store.getState().user+";", id:id}
        ).then(()=>{
          resyncDB();
        });
      }
    });
  };
  const handleLeave = (id) => {
    axios.get(
      baseUrl+'/api/todolist/getparticipant'
    ).then((rspn)=>{
      if(rspn.data[id].participants.includes(store.getState().user)){
        axios.post(
          baseUrl+'/api/todolist/updateparticipant',
          {user:rspn.data[id].participants.replace(store.getState().user+';',''), id:id}
        ).then(()=>{
          resyncDB();
        });
      }
    });
  };
  
  return(
    <main>
      <div className={classes.appBarSpacer}/>
      <Container>
      {todoList.map(e=>{
          return(
            <Content
              id={e.id} author={e.author} title={e.title}
              description={e.description} due={e.due} participants={e.participants}
              edit={handleEdit} delete={handleDelete} join={handleJoin} leave={handleLeave}
            />);
        })}
        <Dialog open={openCreateModal} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">할 일이 태산</DialogTitle>
          <DialogContent>
            <TextField
              id="titleinput" label="Title" fullWidth
              className={classes.textField}
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
              className={classes.textField}
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
            <Button onClick={handleCreateConfirm} color="primary">Add</Button>
            <Button onClick={()=>{setOpenCreateModal(false)}} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEditModal} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">할 일이 태산</DialogTitle>
          <DialogContent>
            <TextField
              id="titleinput" label="Title" fullWidth
              className={classes.textField}
              defaultValue={titletmp}
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
              className={classes.textField}
              defaultValue={desctmp}
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
            <Button onClick={()=>{handleEditConfirm(idtmp)}} color="primary">Edit</Button>
            <Button onClick={()=>{setOpenEditModal(false)}} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
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