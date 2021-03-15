import React, {useState} from "react";
import { ListGroup, InputGroup, FormControl, DropdownButton, Dropdown, 
  ToggleButton, Container, Row, Col, ButtonGroup, Button, Form} from "react-bootstrap";



const Todo = (props) => {
    //hooks
    const[isEditing, setEditing] = useState(false);

    const [newName, setNewName] = useState('')
    
    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }
    // conditional rendering
    const editingTemplate = (   
        <InputGroup className="stack-small" onSubmit={handleSubmit}>
          <Form>
          <Container>
            <Row>      
              <Col xs={12}>
                <FormControl 
                    id={props.id} 
                    className="todo-text" 
                    type="text"
                    placeholder = "Update task..."
                    value = {newName}
                    onChange = {handleChange}
                    />
              </Col>
              <Col >
                <ButtonGroup className="btn-group">
                  <Button 
                      type="button" 
                      className="btn todo-cancel"
                      Variant="secondary"
                      onClick={()=> setEditing(false)}
                      >
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                  </Button>
                  <Button type="submit" className="btn btn__primary todo-edit"  >
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
          </Form>
        </InputGroup>
      );
      const viewTemplate = (
        <InputGroup className="stack-small">
         <Container> 
           <Row>
             <Col className="align-self-start" xs={2}>
               
                <input
                  className="checkbox-circle"
                  id={props.id}
                  type="checkbox"
                  defaultChecked={props.completed}
                  onChange={() => props.toggleTaskCompleted(props.id)}
                />
              
             </Col>
             <Col>
              <label className="todo-label" htmlFor={props.id}>
                  {props.name}
                </label>
             </Col>
              <DropdownButton className="bg-transparent" variant="transparant">
                <Dropdown.Item  
                  type="button" 
                  className="btn"
                  onClick ={()=> setEditing(true)}>
                  <i className="fa fa-edit"></i> Edit
                  <span className="visually-hidden">{props.name}</span>
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item
                  type="button"
                  className="btn btn__danger"
                  onClick={() => props.deleteTask(props.id)}
                >
                  <i className="fa fa-trash-o"></i> Delete
                  <span className="visually-hidden">{props.name}</span>
                </Dropdown.Item>
              </DropdownButton>
           </Row>        
         </Container>
            
        </InputGroup>
      );
    return(
        <ListGroup.Item  as="li" className= "todo">{ isEditing ? editingTemplate : viewTemplate}
        </ListGroup.Item>
    )
}

export default Todo;