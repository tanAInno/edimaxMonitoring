import React, {Component} from 'react';
import axios from 'axios'
import '../css/App.css'
import { Tabs,TabLink,TabContent } from 'react-tabs-redux'
import Monitor from './Monitor'
import History from './History'
import { Link,Redirect } from 'react-router-dom';

class App extends Component {
    
    render () {
        if(0 == 1)
        return (
            <Tabs className="app-container"
                activeLinkStyle={{borderBottom: "5px solid #f9f9f9"}}>
                <div className="app-wrapper">
                    <div className="app-banner-wrapper">
                    <div className="app-banner">
                        <TabLink className="header-text-wrapper" to="monitor">
                            Monitor
                        </TabLink>
                        <TabLink className="header-text-wrapper" to="history">
                            History
                        </TabLink>
                    </div>
                    </div>
                    <TabContent for="monitor">
                        <Monitor/>
                    </TabContent>
                    <TabContent for="history">
                        <History/>
                    </TabContent>
                </div>
            </Tabs>
        )
        else
            return(
                <Redirect to='/product'/>
            )
    }
}

export default App