import {createStore} from 'redux';

export default createStore(function(state,action){
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
      state.todoList = [];
      for(var i=0; i<action.todoList.length; i++){
        state = {
          ...state,
          todoList: [...state.todoList, action.todoList[i]]
        };
      }
      return state;
  }
  return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
