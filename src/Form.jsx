import React from 'react';

import { ACTIONS } from './App';


function Form({todo, dispatch,value, setvalue, setfilterFlag}){
    
   
    
    function handleSubmit(e){
        e.preventDefault();
        if(value === "") return;
        dispatch({type: ACTIONS.ADD_TASK, payload: value}); 
        setvalue("");  
       
    }

    function handleValueChange(e){
        setvalue(e.target.value);
    }

    function handleFilter(e){
        const selectedText = e.target.selectedOptions[0].text
        switch(selectedText){
            case "All":
                setfilterFlag(ACTIONS.FILTER_ALL);
                break;
            case "Incomplete":
                setfilterFlag(ACTIONS.FILTER_PENDING);
                break;
            case "Completed": 
                setfilterFlag(ACTIONS.FILTER_COMPLETED);
                break;
            default: dispatch({type: ACTIONS.FILTER_ALL});
        }
    }
    return(
        <section className="form-section">
            <form onSubmit={handleSubmit} className="add-task-form">
                <input
                 type="text"
                 name="Add task" 
                 id="Add-task-input" 
                 placeholder="Add new Task"
                 value={value}
                 onChange={handleValueChange}
                 autoFocus
                 />
                 <button type= "submit" className="submit-btn">+</button>
            </form>
            <div className="filter-container">
                <select name="filter-options" id="filter-options" onChange={handleFilter}>
                    <option value="All">All</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                </select>
                <span className="custom-arrow"></span>
            </div>
        </section>
    );
}

export default Form;