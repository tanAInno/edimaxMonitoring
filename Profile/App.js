import React, { Component } from 'react';
import '../css/Profile.css'
import '../assets/fonts/fontface.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Home from './Home'

class App extends Component {

    render() {
        return (
            <div className="profile-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Home} />
            </div>
        )
    }

}

export default App