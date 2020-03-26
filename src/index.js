import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Views/home'
import Recipes from './Views/recipes'


ReactDOM.render((
    <BrowserRouter>
    <div>
        <Route path="/" component={Home} exact/>
        <Route path="/recipes" component={Recipes} />
    </div>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
