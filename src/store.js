import {createStore} from 'redux';
import axios from 'axios';

export default createStore(function(state,action){
  let baseUrl = "http://localhost:8000"
  if(state === undefined){
    return {
      user:'',
      todoList:[]
    };
  }
  switch(action.type){
    case 'changeuser':
      state.user = action.user;
      return state;
    case 'initializecontent':
      state = {todoList:[]};
      for(var i=0; i<action.todoList.length; i++){
        state = {
          ...state,
          todoList: [...state.todoList, action.todoList[i]]
        };
      }
      return state;
    case 'addcontent':
      axios
        .post(baseUrl+'/api/todolist/insert', action.todoList)
        .then((rspn)=>{
          console.log(rspn);
        });
      return {
        ...state,
        todoList: [...state.todoList, action.todoList]
      };
    case 'deletecontent':
      axios
        .post(baseUrl+'/api/todolist/delete', action.id)
        .then((rspn)=>{
          console.log(rspn);
        })
      return state;
  }
  return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
