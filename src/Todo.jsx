import React from 'react'

import { ACTIONS } from './App';

function Todo({name, id, completed, dispatch}){

    

    
    function handleDelete(event){
        const targetId = event.target.parentElement.parentElement.id;
        dispatch({type: ACTIONS.DELETE_TASK, payload: {id:targetId}});
    }

    function handleToggle(event){
        const targetId = event.target.parentElement.parentElement.id;
        dispatch({type: ACTIONS.TOGGLE_TASK, payload: {id:targetId }});
       
        
    }
   
      
        return(
            <li id={id} className = {completed}>
                <div className="text">{name}</div>
                <div className="task-controls">
                <button onClick={handleToggle} className="completion-toggle-btn btn">&#x2713;</button>
                <button onClick={handleDelete}  className="delete-task-btn btn">X</button>
                </div>
             </li>
        );
    
    
    
}

export default Todo;