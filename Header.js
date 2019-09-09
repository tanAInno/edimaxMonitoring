import React, { Component } from 'react';
import axios from 'axios'
import './css/Header.css'
import './assets/fonts/fontface.css'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import ShoppingcartModal from './product/ShoppingcartModal'
import Shoppingcart from './product/Shoppingcart';
import LoginModal from './Register/LoginModal'
import Cookies from 'js-cookie'
import route from './api';
import { setUser, setAddress, setCompany, setDistrict, setEmail, setName, setPhone, setProvince, setSubdistrict, setSurname, setUserId, setZipcode } from './actions/user'

const shoppingStyles = {
    content: {
        top: '0%',
        left: '100%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0%',
        transform: 'translate(-100%, 0%)',
        borderRadius: '0px',
        padding: 0
    }
};

const loginStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('body')

class Header extends Component {

    constructor() {
        super()

        this.state = {
            shoppingmodalIsOpen: false,
            loginmodalIsOpen: false,
            searchInput: '',
        }
    }

    componentDidMount() {
        let cookie = Cookies.get('access_token')
        let id = Cookies.get('id')
        console.log(cookie)
        if (cookie != undefined && cookie != ''){
            this.getUser(id)
        }
    }

    async getUser(id) {
        console.log(id)
        await axios.get(route + "users/" + id)
        .then(response => {
            const data = response.data.data
            const user = {
                _id: data._id,
                username : data.username,
                password : data.password,
                type : data.type,
                name : data.name,
                surname : data.surname,
                email : data.email,
                company : data.company,
                address : data.address,
                province : data.province,
                district : data.district,
                subdistrict : data.subdistrict,
                phone : data.phone,
                zipcode : data.zipcode,
                productOrderList : data.productOrderList,
                serviceOrderList : data.serviceOrderList,
            }
            this.props.dispatch(setUser(user))
            this.props.dispatch(setUserId(user._id))
            this.props.dispatch(setAddress(user.address))
            this.props.dispatch(setCompany(user.company))
            this.props.dispatch(setDistrict(user.district))
            this.props.dispatch(setEmail(user.email))
            this.props.dispatch(setName(user.name))
            this.props.dispatch(setPhone(user.phone))
            this.props.dispatch(setProvince(user.province))
            this.props.dispatch(setSubdistrict(user.subdistrict))
            this.props.dispatch(setSurname(user.surname))
            this.props.dispatch(setZipcode(user.zipcode))
        }).catch(error => console.log(error))
    }

    openshoppingModal(data) {
        this.setState({ shoppingmodalIsOpen: true })
    }

    afterOpenshoppingModal() {
    }

    closeshoppingModal() {
        this.setState({ shoppingmodalIsOpen: false })
    }

    openloginModal(data) {
        this.setState({ loginmodalIsOpen: true })
    }

    afterOpenloginModal() {
    }

    closeloginModal() {
        this.setState({ loginmodalIsOpen: false })
    }

    renderCounter() {
        if (this.props.productReducer.products.length + this.props.serviceReducer.services.length > 0)
            return <div className="product-header-sub-count">{this.props.productReducer.products.length + this.props.serviceReducer.services.length}</div>
        else
            return <div />
    }

    handleSearchChange(e) {
        this.setState({ searchInput: e.target.value })
    }

    async updateAccessToken(accessToken) {
        await axios.put(route+"updatetoken",{
            username: this.props.userReducer.user.username,
            accessToken: accessToken
        }).then(response => {
            this.getUser(accessToken)
        }).catch(error=> console.log(error))
    }

    logout() {
        Cookies.remove('access_token')
        Cookies.remove('id')
        this.props.dispatch(setUser({}))
        this.updateAccessToken('')
        location.reload()
    }

    renderActive(active) {
        if (active == "main")
            return (
                <div className="product-header-center">
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/service"><div>SERVICES</div></Link>
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/product/"><div>PRODUCTS</div></Link>
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/blog/"><div>BLOG</div></Link>
                    <div className="product-header-text">PROMOTION</div>
                    {/* <input className="product-search-input" placeholder={"Search"} /> */}
                    <div className="product-dummy"/>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/noti.jpg"} />
                    </div>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/shopping.jpg"} onClick={() => this.openshoppingModal(this.props.productReducer.products)} />
                        {this.renderCounter()}
                    </div>
                </div>
            )
        if (active == "product")
            return (
                <div className="product-header-center">
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/service"><div>SERVICES</div></Link>
                    <Link className="product-header-text-active" style={{ textDecoration: 'none' }} to="/product/"><div>PRODUCTS</div></Link>
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/blog/"><div>BLOG</div></Link>
                    <div className="product-header-text">PROMOTION</div>
                    {/* <input className="product-search-input" placeholder={"Search"} /> */}
                    <div className="product-dummy"/>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/noti.jpg"} />
                    </div>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/shopping.jpg"} onClick={() => this.openshoppingModal(this.props.productReducer.products)} />
                        {this.renderCounter()}
                    </div>
                </div>
            )
        if (active == "service")
            return (
                <div className="product-header-center">
                    <Link className="product-header-text-active" style={{ textDecoration: 'none' }} to="/service"><div>SERVICES</div></Link>
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/product"><div>PRODUCTS</div></Link>
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/blog/"><div>BLOG</div></Link>
                    <div className="product-header-text">PROMOTION</div>
                    {/* <input className="product-search-input" placeholder={"Search"} value={this.state.searchInput} onChange={e => this.handleSearchChange(e)} /> */}
                    <div className="product-dummy"/>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/noti.jpg"} />
                    </div>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/shopping.jpg"} onClick={() => this.openshoppingModal(this.props.productReducer.products)} />
                        {this.renderCounter()}
                    </div>
                </div>
            )
        if (active == "blog")
            return (
                <div className="product-header-center">
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/service"><div>SERVICES</div></Link>
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/product"><div>PRODUCTS</div></Link>
                    <Link className="product-header-text-active" style={{ textDecoration: 'none' }} to="/blog/"><div>BLOG</div></Link>
                    <div className="product-header-text">PROMOTION</div>
                    {/* <input className="product-search-input" placeholder={"Search"} value={this.state.searchInput} onChange={e => this.handleSearchChange(e)} /> */}
                    <div className="product-dummy"/>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/noti.jpg"} />
                    </div>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/shopping.jpg"} onClick={() => this.openshoppingModal(this.props.productReducer.products)} />
                        {this.renderCounter()}
                    </div>
                </div>
            )
    }

    renderUserTab() {
        if (this.props.userReducer.user.name != undefined) {
            return(
                <div className="product-top-container">
                <Link className="product-top-last-text-name" style={{ textDecoration: 'none' }} to="/profile">{this.props.userReducer.user.name} {this.props.userReducer.user.surname}</Link>
                <div className="product-top-wall">|</div>
                <button className="product-top-last-text-button" onClick={() => this.logout()}>ออกจากระบบ</button>
                </div>
            )
        }
        if (this.props.userReducer.user.name == undefined) {
            return (
                <div className="product-top-container">
                <Link className="product-top-last-text" style={{ textDecoration: 'none' }} to="/register">สมัครใหม่</Link>
                <div className="product-top-wall">|</div>
                <button className="product-top-last-text-button" onClick={() => this.openloginModal()}>เข้าสู่ระบบ</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="product-header-wrapper">
                <div className="product-header-logo-wrapper">
                    <Link className="product-header-logo" style={{ textDecoration: 'none' }} to="/"><img className="product-header-logo-img" src={"../assets/images/logo.png"} /></Link>
                </div>
                <div className="product-header-content-wrapper">
                    <div className="product-header-top">
                        {this.renderUserTab()}
                    </div>
                    {this.renderActive(this.props.active)}
                    <Modal
                        isOpen={this.state.shoppingmodalIsOpen}
                        onAfterOpen={() => this.afterOpenshoppingModal()}
                        onRequestClose={() => this.closeshoppingModal()}
                        contentLabel="ตะกร้าสินค้า"
                        style={shoppingStyles}
                    >
                        <ShoppingcartModal />
                    </Modal>
                    <Modal
                        isOpen={this.state.loginmodalIsOpen}
                        onAfterOpen={() => this.afterOpenloginModal()}
                        onRequestClose={() => this.closeloginModal()}
                        contentLabel="Login"
                        style={loginStyles}
                    >
                        <LoginModal />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Header)