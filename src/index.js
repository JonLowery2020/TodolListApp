import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const DATA = [];


ReactDOM.render(
    <App tasks= {DATA} />,
  document.getElementById('root')
);

