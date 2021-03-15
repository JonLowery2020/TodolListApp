import  React, {useState}  from "react";
import {Button, Container, Form , Row, Col} from 'react-bootstrap';

const TaskForm = (props) =>{

    const [name,setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
      if (name !== " "){
        e.preventDefault();
        props.addTask(name);
        setName(" ");
      }else{
        e.preventDefault();
        setName(" ");
        alert("Oop! You forgot to enter a task.");
      }
      
    }

    return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <Form onSubmit={handleSubmit} className="inputform">
            <Form.Control
              type="text"
              id="new-todo-input"
              className="input"
              name="text"
              autoComplete="off"
              placeholder = "New Task..."
              value = {name}
              onChange= {handleChange}
            />
            <Button type="submit" className="btn addTask" block >
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    );
}

export default TaskForm;