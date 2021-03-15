import React from "react";
import {Button, Container, Row, Col, ButtonGroup} from 'react-bootstrap';

const FilterButton = (props) => {
    return (
        <Button
          type="button" 
          className="toggle-btn  bg-transparent" 
          aria-pressed={props.isPressed}
          onClick= {()=> props.setFilter(props.name)}
          style={{border: 0 }}>
          <span className="visually-hidden">Show </span>
          <span>{props.name}</span>
          <span className="visually-hidden"> tasks</span>
        </Button>
        
    );
}

export default FilterButton;