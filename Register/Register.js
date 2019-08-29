import React, { Component } from 'react';
import axios from 'axios'
import '../css/Register.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import route from '../api';
import Header from '../Header'
import Footer from '../Footer'
import Cookies from 'js-cookie'
import { setUser } from '../actions/user'
import FacebookLogin from 'react-facebook-login';

class Register extends Component {

    state = {
        username: '',
        Password: '',
        name: '',
        surname: '',
        email: '',
        company: '',
        address: '',
        subdistrict: '',
        district: '',
        province: '',
        zipcode: '',
        phone: '',
        isRegistered: false,
        message: '',
        isLoggedIn: false,
        isFailed: false,
    }

    async createUser() {
        await axios.post(route + "users", {
            username: this.state.username,
            password: this.state.password,
            type: "user",
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            company: this.state.company,
            address: this.state.address,
            subdistrict: this.state.subdistrict,
            district: this.state.district,
            province: this.state.province,
            zipcode: this.state.zipcode,
            phone: this.state.phone
        }).then(response => {
            if (response.data.status == "success")
                this.setState({ isRegistered: true })
            if (response.data.status == "failed") {
                this.setState({ isRegistered: false })
                this.setState({ message: response.data.message })
            }
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
                this.setState({ usernamefb: res.userID })
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

    handleChangeWithKey = (key, e) => {
        if (key == "username")
            this.setState({ username: e.target.value })
        if (key == "password")
            this.setState({ password: e.target.value })
        if (key == "name")
            this.setState({ name: e.target.value })
        if (key == "surname")
            this.setState({ surname: e.target.value })
        if (key == "email")
            this.setState({ email: e.target.value })
        if (key == "company")
            this.setState({ company: e.target.value })
        if (key == "address")
            this.setState({ address: e.target.value })
        if (key == "subdistrict")
            this.setState({ subdistrict: e.target.value })
        if (key == "district")
            this.setState({ district: e.target.value })
        if (key == "province")
            this.setState({ province: e.target.value })
        if (key == "zipcode")
            this.setState({ zipcode: e.target.value })
        if (key == "phone")
            this.setState({ phone: e.target.value })
    }

    render() {
        if (this.props.userReducer.user.name != undefined)
            return <Redirect to="/" />
        if (this.state.isRegistered)
            return <Redirect to="/register/done" />
        const responseFacebook = (response) => {
            this.loginFacebook(response)
        }
        return (
            <div className="register-container">
                <Header active="main" />
                <div className="register-wrapper">
                    <div className="register-header">สมัครสมาชิก</div>
                    <div className="register-input-row">
                        <div className="register-input-group">
                            <div className="register-input-header">Username</div>
                            <input className="register-input"
                                value={this.state.username}
                                onChange={e => this.handleChangeWithKey("username", e)} />
                        </div>
                        <div className="register-input-group">
                            <div className="register-input-header">Password</div>
                            <input className="register-input"
                                value={this.state.password}
                                onChange={e => this.handleChangeWithKey("password", e)}
                                type="password" />
                        </div>
                    </div>
                    <div className="register-input-row">
                        <div className="register-input-group">
                            <div className="register-input-header">ชื่อ *</div>
                            <input className="register-input"
                                value={this.state.name}
                                onChange={e => this.handleChangeWithKey("name", e)} />
                        </div>
                        <div className="register-input-group">
                            <div className="register-input-header">นามสกุล *</div>
                            <input className="register-input"
                                value={this.state.surname}
                                onChange={e => this.handleChangeWithKey("surname", e)} />
                        </div>
                    </div>
                    <div className="register-input-row">
                        <div className="register-input-group">
                            <div className="register-input-header">email *</div>
                            <input className="register-input"
                                value={this.state.email}
                                onChange={e => this.handleChangeWithKey("email", e)} />
                        </div>
                        <div className="register-input-group">
                            <div className="register-input-header">บริษัท *</div>
                            <input className="register-input"
                                value={this.state.company}
                                onChange={e => this.handleChangeWithKey("company", e)} />
                        </div>
                    </div>
                    <div className="register-input-row">
                        <div className="register-input-group">
                            <div className="register-input-header">บ้านเลขที่</div>
                            <input className="register-input"
                                value={this.state.address}
                                onChange={e => this.handleChangeWithKey("address", e)} />
                        </div>
                        <div className="register-input-group">
                            <div className="register-input-header">ตำบล</div>
                            <input className="register-input"
                                value={this.state.subdistrict}
                                onChange={e => this.handleChangeWithKey("subdistrict", e)} />
                        </div>
                    </div>
                    <div className="register-input-row">
                        <div className="register-input-group">
                            <div className="register-input-header">อำเภอ</div>
                            <input className="register-input"
                                value={this.state.district}
                                onChange={e => this.handleChangeWithKey("district", e)} />
                        </div>
                        <div className="register-input-group">
                            <div className="register-input-header">จังหวัด</div>
                            <input className="register-input"
                                value={this.state.province}
                                onChange={e => this.handleChangeWithKey("province", e)} />
                        </div>
                    </div>
                    <div className="register-input-row">
                        <div className="register-input-group">
                            <div className="register-input-header">รหัสไปรษณีย์</div>
                            <input className="register-input"
                                value={this.state.zipcode}
                                onChange={e => this.handleChangeWithKey("zipcode", e)} />
                        </div>
                        <div className="register-input-group">
                            <div className="register-input-header">โทรศัพท์มือถือ *</div>
                            <input className="register-input"
                                value={this.state.phone}
                                onChange={e => this.handleChangeWithKey("phone", e)} />
                        </div>
                    </div>
                </div>
                <div className="register-message">{this.state.message}</div>
                <button className="register-button" onClick={() => this.createUser()}>Register</button>
                <FacebookLogin
                    appId="339758753558333"
                    autoLoad={false}
                    fields="name,email"
                    onClick={<div />}
                    callback={responseFacebook}
                    isMobile={true}
                    disableMobileRedirect={true}
                    icon="fa-facebook"
                    />
                <div className="facebook-login-margin"/>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(Register)