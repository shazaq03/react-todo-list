import { useReducer, useState, useEffect  } from "react";
import { nanoid } from "nanoid";

//importing Components
import Form from "./Form";
import Todolist from "./Todolist";

let INITIAL = JSON.parse(localStorage.getItem("TODO"));




export const ACTIONS = {
  ADD_TASK: "add-task",
  DELETE_TASK: "delete-task",
  TOGGLE_TASK: "toggle-task",
  FILTER_ALL: "show-all-tasks",
  FILTER_COMPLETED: "show-completed-tasks",
  FILTER_PENDING: "show-pending-tasks",
  LOAD_FROM_LOCAL: "load-from-local"
};


function reducer(todo, {type, payload}){

  switch(type){
    case ACTIONS.ADD_TASK:
      return[
        ...todo,
        {name:payload, id: nanoid(), completed:"incomplete"},
      ]
    case ACTIONS.DELETE_TASK:
      const temp = todo.filter(singletodo => singletodo.id !== payload.id)
      return temp;
    case ACTIONS.TOGGLE_TASK:
      const tamp = todo.map(singletodo => {
        if(singletodo.id === payload.id){
          if(singletodo.completed === "incomplete"){
            return{
              ...singletodo,
              completed: "completed"
            }
          }
          else if(singletodo.completed === "completed"){
            return{
              ...singletodo,
              completed: "incomplete"
            }
          }
        }
        else{
          return {
            ...singletodo
          }
        }
      })
      return tamp;
    
    case ACTIONS.LOAD_FROM_LOCAL:
      let temp4 = payload;
      
      return [
        ...temp4
      ]
    default: return todo;
      
  }
}


function App() {
  
  const [todo, dispatch] = useReducer(reducer, []);
  const[value, setvalue] = useState("");
  const [fliterFlag, setfilterFlag] = useState(ACTIONS.FILTER_ALL);
  const [filteredList, setfilteredList] = useState(todo);

  window.onbeforeunload = (e) =>{
    if(todo.length ==0){
      localStorage.setItem("TODO", JSON.stringify([]));
    }
  }

  useEffect(() => {
    getFilteredList(fliterFlag);
    
  }, [todo,fliterFlag]);

  useEffect(() =>{
    saveToLocal(todo);
  },[todo]);

  useEffect(() =>{
    getFromLocal();
  },[])

  function saveToLocal(todo){

    let flag =0;
    
    
      if(todo.length > 0){

        localStorage.setItem("TODO", JSON.stringify(todo));
        if(todo.length == 1){
          flag = 1;
          
        }else{
          flag = 0;
        }
      }
      else if(flag == 1 && todo.length == 0){
        
        localStorage.setItem("TODO", JSON.stringify([]));
      }
      
    
  }

  function getFromLocal(){
    if(localStorage.getItem("TODO") === null){
      dispatch({type:ACTIONS.LOAD_FROM_LOCAL, payload: []});
    }else{
      let temp3 = JSON.parse(localStorage.getItem("TODO")); 
     
      dispatch({type:ACTIONS.LOAD_FROM_LOCAL, payload: temp3});
    }
  }
  
  function getFilteredList(fliterFlag){

    
    switch(fliterFlag){
      case ACTIONS.FILTER_ALL:
        setfilteredList(todo);
        break;
      case ACTIONS.FILTER_COMPLETED:
        let temp1 = todo.filter(single => single.completed === "completed");
        setfilteredList(temp1);
        break;
      case ACTIONS.FILTER_PENDING:
        let temp2 = todo.filter(single1 => single1.completed === "incomplete");
        setfilteredList(temp2);
        break;
    }
  }  
  
  
  
  
  
  return (
    <div className="main-container">
      <Form 
      todo = {todo} 
      dispatch = {dispatch} 
      value={value} 
      setvalue={setvalue} 
      setfilterFlag={setfilterFlag}
      />
      <ul className="tasks-container">
         
          <Todolist filteredList={filteredList} dispatch={dispatch}/>
          
         
      </ul>
    </div>
  );
}

export default App;
