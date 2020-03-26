import React, { Component } from 'react';
import './home.css'

import './recipes'

import {
    BrowserRouter as Router, Switch, Route, Link, withRouter, Redirect, useHistory
    } from "react-router-dom";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false,
            login: {}
        }
    };

    onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    }
    
    onSubmit = async() => {
    this.loadAPI()
    }
    
    // Function then connect API to fetch post data by login access, and receive user data 
    loadAPI() {
    fetch("https://receitas.devari.com.br/authentication/", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(this.state)
    })
    .then( res => res.json())
    .then((res) => {
        console.log(res);
        this.setState({login: res})
        res ? this.setState({isAuthenticated: true}) && localStorage.setItem('login', JSON.stringify(res)) : this.setState({isAuthenticated: false})

        console.log(this.state)
    
        // localStorage.setItem('token', this.state.login.token)
        // Passing a data as string by key in storage to call in all application
        console.log(this.state.login)
        // console.log(localStorage.getItem('token'))
        // Parsing data to show in screen as in a call function
        console.log(JSON.parse(localStorage.getItem('login')))
    })
    .catch(error => console.error(error));
    };

    logOut() {
        this.setState({isAuthenticated: false})
        localStorage.removeItem('login')
    }

    // ProtectedRoute = ({ component: Component, ...rest }) => (
    //     <Route {...rest} render={(props) => (
    //         this.state.isAuthenticated === true ? 
    //         <Redirect to={{ pathname: '/recipes', state: { from: props.location }}} /> : <Redirect to={{ pathname: '/', state: { from: props.location }}} />   
    //     )} />
    // );

    PrivateRoute({ children, ...rest }) {
        return(
            <Route
                {...rest}
                render={({location}) =>
                localStorage.getItem('login') != null ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                        />
                )
            }
            />
        )
    }

    AuthButton(){
        let history = useHistory();

        return localStorage.getItem('login') != null ? (
            <button
                onClick={() => {
                    this.setState({isAuthenticated: false}) && history.push('/')
                }}
            >Sair</button>
        ) : (
            <p></p>
        )
    }

    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <div className="header">
                    <p>DEV Food</p>
                    </div>
                </header>
                <body>
                <div>
                    <h3 className="middleBanner">Entre em sua Conta</h3>
                </div>
                <div className="loginBox" >
                    <label>Email
                        <br/>
                        <input placeholder="exemplo@exemplo.com" 
                        onChange={e => this.onChange(e)} 
                        value={this.state.username} 
                        type="email" id="username" name="username"/>
                    </label>
                        <br/>
                    <label>Senha
                        <br/>
                        <input placeholder="Senha" 
                        onChange={e => this.onChange(e)} 
                        value={this.state.password} 
                        type="password" id="password" name="password"/>
                    </label>
                    <br/><br/>
                    <button className="enterButton" type="primary" 
                    onClick={() => this.onSubmit()}>
                        {/* <Link className="link" to="Recipes">Entrar</Link> */}
                        <PrivateRoute path='/recipes'>
                            <ProtectedPage/>
                        </PrivateRoute>
                    </button>
                </div>
            </body>
        </div>
        )
    }

}

export default Home;