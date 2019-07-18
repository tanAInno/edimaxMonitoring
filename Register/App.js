import React, { Component } from 'react';
import '../css/Register.css'
import '../assets/fonts/fontface.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Register from './Register'
import RegisterConfirm from './RegisterConfirm'

class App extends Component {

    render() {
        return (
            <div className="blog-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Register} />
                <Route exact path={`${this.props.match.path}/done`} component={RegisterConfirm} />
            </div>
        )
    }

}

export default App