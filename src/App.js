import React, { useState, useEffect } from "react";
import {Container, Row, Col, ButtonGroup, ListGroup } from 'react-bootstrap';
import Todo from "./components/Todo";
import TaskForm from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES  = Object.keys(FILTER_MAP);
function App(props) {


const[filter,setFilter] = useState('All');
const [tasks, setTasks] = useState(props.tasks);
const [darkMode, setDarkMode] = useState(false);

//persisting dark mode using local storage. Check to see if client was previously in darkMode using useEffect hook
useEffect(()=>{
  const json = localStorage.getItem("todo-dark-mode");
  const currentMode =JSON.parse(json);

  if(currentMode){
      setDarkMode(true);
  } else{
      setDarkMode(false);
  }
},[]);

// apply a dark class to the body's classList with useEffect
useEffect(()=>{
  if (darkMode) {
      document.body.classList.add("dark");
  } else {
      document.body.classList.remove("dark");

  } 
},[darkMode]);

  const addTask = (name) => {
    const newTask = {
      id: "todo-" + nanoid(),
      name: name,
      completed:false
    };
    
    setTasks([...tasks,newTask]);

  }
    

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id){
        //use spread operator to make a new object
        //whose 'completed' property has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);

  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);

  }

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task =>{
      if (id === task.id ){
        return {...task, name:newName}
      }
      return task
    })
    setTasks(editedTaskList);
  }
const taskList = tasks
.filter(FILTER_MAP[filter])
.map(task => (
    <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask ={deleteTask}
        editTask= {editTask}
      />
));

const filterList = FILTER_NAMES.map(name => (
  <FilterButton 
      key= {name} 
      name={name}
      isPressed= {name === filter}
      setFilter = {setFilter}
   />
));


   
   const tasksNoun = taskList.length !==1 ? 'tasks' : 'task'

   const headingText = `${taskList.length} ${tasksNoun} `;

  

  return (

    <Container className="todoapp ">
      <Row className="justify-content-center title">
        <Col xs={"auto"}>
          <h1>T o D o</h1>
        </Col>
        <Col xs={"auto"}>
          <i className=" fa fa-lightbulb-o" onClick={() => setDarkMode(!darkMode)}></i>
        </Col>
      </Row>
      <Row className=" Approws">
        <Col className="Appcols">
          <TaskForm addTask={addTask} />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center Approws">
        <Col xs={10} md={8} lg={6}>
        <ListGroup
          className="todo-list "
          aria-labelledby="list-heading"
        >
          {taskList}
        </ListGroup>
        </Col>
      </Row>
      <Row className="filters  d-flex justify-content-center Approws">      
          <ButtonGroup className="btn-group">
            {filterList}
          </ButtonGroup>
      </Row>
      <Row className="d-flex justify-content-center   Approws">
          <p id="list-heading">
            {headingText}
          </p>
      </Row>
    </Container>
  );
}


export default App;
