import React, { Component } from 'react';
import axios from 'axios'
import '../css/LoginModal.css'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import route from '../api';
import Cookies from 'js-cookie'
import { setUser } from '../actions/user'
import FacebookLogin from 'react-facebook-login';

class LoginModal extends Component {

    state = {
        username: '',
        usernamefb: '',
        password: '',
        isLoggedIn: false,
        isFailed: false,
    }

    handleChangeWithKey = (key, e) => {
        if (key == "username")
            this.setState({ username: e.target.value })
        if (key == "password")
            this.setState({ password: e.target.value })
    }

    async Login() {
        await axios.post(route + "login", {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            if (response.data.status == "login success") {
                Cookies.set('access_token', response.data.accessToken, { expires: 1 })
                Cookies.set('id', response.data.id, { expires : 1 })
                this.setState({ isLoggedIn: true })
                this.getUser(response.data.id)
                location.reload()
            }
            if (response.data.status == "login failed")
                this.setState({ isFailed: true })
        }).catch(error => {
            this.setState({ isLoggedIn: false })
        })
    }

    async getUser(id) {
        await axios.get(route + "users/" + id).then(response => {
            const data = response.data.data
            const user = {
                username: data.username,
                password: data.password,
                type: data.type,
                name: data.name,
                surname: data.surname,
                email: data.email,
                company: data.company,
                address: data.address,
                province: data.province,
                district: data.district,
                subdistrict: data.subdistrict,
                phone: data.phone,
                zipcode: data.zipcode,
                productOrderList: data.productOrderList,
                serviceOrderList: data.serviceOrderList,
            }
            this.props.dispatch(setUser(user))
        }).catch(error => console.log(error))
    }

    async loginFacebook(res) {
        await axios.post(route + "loginfacebook", {
            name: res.name,
            email: res.email,
            username: res.userID,
            accessToken: res.accessToken
        }).then(response => {
            if (response.data.status == "login success") {
                Cookies.set('access_token', res.accessToken, { expires: 1 })
                Cookies.set('id', response.data.id, { expire: 1 })
                this.setState({ usernamefb: res.userID})
                this.setState({ isLoggedIn: true })
                location.reload()
            }
            if (response.data.status == "login failed")
                this.setState({ isFailed: true })
                location.reload()
        }).catch(error => {
            this.setState({ isLoggedIn: false })
            location.reload()
        })
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter')
            this.Login()
    }

    renderCaution() {
        if (this.state.isFailed == true)
            return <div className="login-caution">login ไม่สำเร็จ username หรือ password ไม่ถูกต้อง โปรดลองใหม่อีกครั้ง</div>
    }

    render() {
        const responseFacebook = (response) => {
            this.loginFacebook(response)
        }
        return (
            <div className="login-modal-container">
                <div className="login-modal-header">เข้าสู่ระบบ</div>
                <div className="login-modal-content">
                    <div className="login-modal-input-header">Username</div>
                    <input className="login-modal-input"
                        value={this.state.username}
                        onKeyPress={this._handleKeyPress}
                        onChange={e => this.handleChangeWithKey("username", e)} />
                    <div className="login-modal-input-header">Password</div>
                    <input className="login-modal-input"
                        value={this.state.password}
                        onKeyPress={this._handleKeyPress}
                        onChange={e => this.handleChangeWithKey("password", e)}
                        type="password" />
                </div>
                {this.renderCaution()}
                <button className="login-modal-button" onClick={() => this.Login()}>Login</button>
                <Link to="/register" className="login-modal-text">สมัครใหม่</Link>
                {/* <FacebookLogin
                    appId="339758753558333"
                    autoLoad={true}
                    fields="name,email"
                    onClick={<div/>}
                    callback={responseFacebook}
                    icon="fa-facebook" />, */}
            </div>
        )
    }

}

export default connect(state => state)(LoginModal)