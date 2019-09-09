import React, { Component } from 'react';
import axios from 'axios'
import '../css/Admin.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import {Link, Redirect} from 'react-router-dom';
import route from '../api';
import Cookies from 'js-cookie'

class AdminLogin extends Component {

    state = {
        isLoggedIn: false,
        username: '',
        password: '',
    }

    componentDidMount(){
        let cookie = Cookies.get('access_token')
        if(cookie != undefined && cookie != '')
            this.setState({isLoggedIn : true})
    }

    async login(){
        await axios.post(route+"loginadmin",{
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            if (response.data.status == "login success"){
                Cookies.set('access_token', response.data.accessToken, {expires:1})
                this.setState({isLoggedIn: true})
            }
        }).catch(error=> {
            this.setState({isLoggedIn : false})
        })
    }

    _onChange(key,value) {
        if(key == "username")
            this.setState({username: value})
        if(key == "password")
            this.setState({password: value})
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') 
            this.login()
    }

    render() {
        if (this.state.isLoggedIn){
            return <Redirect to="/admin/adminmain" />
        }
        return(
            <div className="login-container">
                <div className="login-box">
                    <div className="login-header">Admin Login</div>
                    <div className="login-input-container">
                        <div className="login-input-header">Admin Username</div>
                        <input type="text" 
                            className="login-input" 
                            onKeyPress={this._handleKeyPress}
                            onChange={e => this._onChange("username",e.target.value)}
                            value={this.state.username}/>
                        <div className="login-input-header">Admin Password</div>
                        <input type="password" 
                            className="login-input" 
                            onKeyPress={this._handleKeyPress}
                            onChange={e => this._onChange("password",e.target.value)}
                            value={this.state.password}/>
                    </div>
                    <button className="admin-login-button" onClick={() => this.login()}>Login</button>
                </div>
            </div>
        )
    }

}

export default AdminLogin