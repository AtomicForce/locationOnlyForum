import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory} from 'react-router';
import CreateThread from './components/createThread';
import Homepage from './components/homepage';


navigator.geolocation.getCurrentPosition((function(position) {
    localStorage.setItem('lat', position.coords.latitude);
    localStorage.setItem('lon', position.coords.longitude);
}).bind(this));

const routes = (
    <Router history={hashHistory}>
        <Route path='/' component={Homepage}/>
        <Route path='create-thread' component={CreateThread}/>
    </Router>
);

render(routes, document.getElementById('app'));
