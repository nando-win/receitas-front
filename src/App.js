import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router, Switch, Route,
  Link, useHistory, useLocation
} from "react-router-dom";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
      login: {}
    }
  };

  // Function to bind writed data in input screen
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
      this.setState({isAuthenticated: true})
      this.setState({login: res})

      // localStorage.setItem('token', this.state.login.token)
      // Passing a data as string by key in storage to call in all application
      localStorage.setItem('login', JSON.stringify(res))
      console.log(this.state.login)
      // console.log(localStorage.getItem('token'))
      // Parsing data to show in screen as in a call function
      console.log(JSON.parse(localStorage.getItem('login')))
      this.logbutton()
    })
    .catch(error => console.error(error));
  };

  // testAPI() {
  //   fetch("https://receitas.devari.com.br/authentication/", {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json;charset=UTF-8'
  //     },
  //     body: JSON.stringify({'username': 'fernando.wcb@gmail.com', 'password': '88y9ihfu'})
  //   })
  //   .then( res => res.json())
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch(error => console.error(error));
  // };

  // componentDidMount() {
  //   this.testAPI();
  // };

  logOut() {
    this.setState({isAuthenticated: false})
    localStorage.removeItem('login')
  }

  logbutton() {
    // let history = useHistory();
  
    return this.state.isAuthenticated ? (
      <button onClick={
        // () => {
        this.logOut(
          // () => history.push("/")
          )
        // }
      }>Sair</button>)
        :
        console.log("teste")
    
      
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="header">
              <p>DEV Food</p>
            </div>
            {/* <div className='logButton'> */}
              <logbutton/>
            {/* </div> */}
          </header>
          <body>
            <Switch>
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
              <button className="enterButton" type="primary" onClick={() => this.onSubmit()}>
                <Link className="link" to="./Views/home.jsx">Entrar</Link></button>
            </div>
            </Switch>
          </body>
        </div>
      </Router>
    )
  }
}

export default App;
