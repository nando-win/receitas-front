import React, { Component } from 'react';
import './recipes.css';

import {
    BrowserRouter as Router, Switch, Route,
    Link, useHistory, useLocation, Redirect
  } from "react-router-dom";


export class Recipes extends Component {

    componentDidMount = () => {
        fetch("​https://receitas.devari.com.br/api/v1/category", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'token': localStorage.getItem('token')
            },
        })
        .then(function(response) {
            console.log(response);
        }).catch(function (response) {
            console.log(response);
        });
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