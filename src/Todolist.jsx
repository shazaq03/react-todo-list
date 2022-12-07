import React from 'react';

import Todo from "./Todo";

function Todolist({filteredList, dispatch}){


  if(filteredList.length == 0) return;
  else{
    let todoList = filteredList.map(singletodo => {
      return <Todo 
      name= {singletodo.name} 
      id={singletodo.id} 
      key ={singletodo.id}
      completed={singletodo.completed}
      dispatch = {dispatch}
      />
    });


  return todoList;
  }


    
}

export default Todolist;