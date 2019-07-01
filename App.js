import React, {Component} from 'react';
import axios from 'axios'
import './css/Main.css'
import { Tabs,TabLink,TabContent } from 'react-tabs-redux'
import Monitor from './containers/Monitor'
import History from './containers/History'
import { Link,Redirect } from 'react-router-dom';
class App extends Component {
    
    render () {
        return (
            <div className="main-container">
            </div>
        )
    }
}

export default App