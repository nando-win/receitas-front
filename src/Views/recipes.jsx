import React, { Component } from 'react';
import './recipes.css';

import {
    BrowserRouter as Router, Switch, Route,
    Link, useHistory, useLocation, Redirect
  } from "react-router-dom";


export class Recipes extends Component {

    componentDidMount = () => {
        console.log(localStorage.getItem('login'))
    } 

    render() {
        return(
            <Router>
                <h1>Teste</h1>
            </Router>
        )
    }

}

export default Recipes;