import React, {useState, useEffect} from "react";
import "./App.css";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(json);
    if(loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem('todos', json);
  }, [todos]);
  
  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value;

    const newTodo = {
      id: new Date().getTime(),
      title: todo.trim(),
      completed: false
    }

    if(newTodo.title.length > 0) {
      setTodos([...todos].concat(newTodo));
    
    } else{
      alert('Please enter a valid todo');
    }
    document.getElementById('todoAdd').value = '';
  }
  
  
  // Add the deleteToDo code here
  function deleteToDo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  } 

  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: !todo.completed}
      } else {
        return todo;
      }
    }));
  }

  
  // Add the submitEdits code here
  function submitEdits(id, newTitle) {
    setEditId(id);
    document.getElementById('todoAdd').value = newTitle;
  }

  
return(
<div className ="App">
  <h1>Todo List</h1>

  <form onSubmit={handleSubmit}>
    <input type ="text" align ="right" id= 'todoAdd'/>
    <button type ="submit" >Add Todo</button>
  </form>


  {todos.map((todo) => (  
    <div id={todo.id} className="todo-item">
      <div>{todo.title}</div>
      
      <div className="todo-actions">
        <button onClick={() => deleteToDo(todo.id)}>Delete</button>
        <input type="checkbox" onChange={() => toggleComplete(todo.id)} checked={todo.completed}/>
        <button onClick={() => submitEdits(todo.id, todo.title)}>Edit</button>
      </div>
    </div>
  ))}


</div>
);
};
export default App;
