import {createStore} from 'redux'

export default createStore(function(state,action){
    if(state === undefined){
      return {
        todoList:[]
      };
    }
    switch(action.type){
      case 'addcontent':
        return {
          ...state,
          todoList: [...state.todoList, action.todoList]
        };
      case 'deletecontent':
        return {
          ...state,
          todoList: [...state.todoList, action.todoList]
        };
    }
  return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
