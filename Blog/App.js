import React, { Component } from 'react';
import '../css/Blog.css'
import '../assets/fonts/fontface.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import IAQ from './IAQ'
import Air from './Air'
import Filter from './Filter'
import Home from './Home'

class App extends Component {

    render() {
        return (
            <div className="blog-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Home}/>
                <Route exact path={`${this.props.match.path}/iaq`} component={IAQ} />
                <Route exact path={`${this.props.match.path}/filter`} component={Filter} />
                <Route exact path={`${this.props.match.path}/air`} component={Air} />
            </div>
        )
    }

}

export default App