import React, { Component } from 'react';
import axios from 'axios'
import '../css/ProfileNav.css'
import '../assets/fonts/fontface.css'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { setMenu } from '../actions/user'

class ProfileNav extends Component {

    componentDidMount(){
        this.props.dispatch(setMenu("profile"))
    }

    setMenu(menu){
        this.props.dispatch(setMenu(menu))
    }

    renderMenu(){
        if(this.props.userReducer.menu == "profile" || this.props.userReducer.menu == "edit")
         return (
                <div>
                <div className="profile-nav-menu-active" onClick={() => this.setMenu("profile")}>บัญชีของฉัน</div>
                <div className="profile-nav-menu" onClick={() => this.setMenu("history")}>คำสั่งซื้อของฉัน</div>
                </div>)
        if(this.props.userReducer.menu == "history")
        return (
               <div>
               <div className="profile-nav-menu" onClick={() => this.setMenu("profile")}>บัญชีของฉัน</div>
               <div className="profile-nav-menu-active" onClick={() => this.setMenu("history")}>คำสั่งซื้อของฉัน</div>
               </div>)
    }

    render() {
        const user = this.props.userReducer.user
        return(
            <div className="profile-nav-container">
                <div className="profile-nav-header">
                    {user.name} {user.surname}
                </div>
                {this.renderMenu()}
            </div>
        )
    }

}

export default connect(state => state)(ProfileNav)