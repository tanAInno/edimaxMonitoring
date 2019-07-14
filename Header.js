import React, { Component } from 'react';
import axios from 'axios'
import './css/Header.css'
import './assets/fonts/fontface.css'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import ShoppingcartModal from './product/ShoppingcartModal'
import Shoppingcart from './product/Shoppingcart';

const customStyles = {
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

Modal.setAppElement('body')

class Header extends Component {

    constructor() {
        super()

        this.state = {
            modalIsOpen: false,
            searchInput: ''
        }
    }

    openModal(data) {
        this.setState({ modalIsOpen: true })
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
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

    renderActive(active) {
        if (active == "main")
            return (
                <div className="product-header-center">
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/service"><div>SERVICES</div></Link>
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/product/"><div>PRODUCTS</div></Link>
                    <Link className="product-header-text" style={{ textDecoration: 'none' }} to="/blog/"><div>BLOG</div></Link>
                    <div className="product-header-text">PROMOTION</div>
                    <input className="product-search-input" placeholder={"Search"} />
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/noti.jpg"} />
                    </div>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/shopping.jpg"} onClick={() => this.openModal(this.props.productReducer.products)} />
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
                    <input className="product-search-input" placeholder={"Search"} />
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/noti.jpg"} />
                    </div>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/shopping.jpg"} onClick={() => this.openModal(this.props.productReducer.products)} />
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
                    <input className="product-search-input" placeholder={"Search"} value={this.state.searchInput} onChange={e => this.handleSearchChange(e)} />
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/noti.jpg"} />
                    </div>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/shopping.jpg"} onClick={() => this.openModal(this.props.productReducer.products)} />
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
                    <input className="product-search-input" placeholder={"Search"} value={this.state.searchInput} onChange={e => this.handleSearchChange(e)} />
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/noti.jpg"} />
                    </div>
                    <div className="product-header-sub-logo-wrapper">
                        <img className="product-header-sub-logo" src={"../assets/images/shopping.jpg"} onClick={() => this.openModal(this.props.productReducer.products)} />
                        {this.renderCounter()}
                    </div>
                </div>
            )
    }

    render() {
        return (
            <div className="product-header-wrapper">
                <div className="product-header-logo-wrapper">
                    <Link className="product-header-logo" style={{ textDecoration: 'none' }} to="/"><img className="product-header-logo-img" src={"../assets/images/logo.png"} /></Link>
                </div>
                <div className="product-header-content-wrapper">
                    <div className="product-header-top">
                        <img className="product-top-logo" src={"../assets/images/help.jpg"} />
                        <div className="product-top-text">ช่วยเหลือ</div>
                        <div className="product-top-text">เขตพื้นที่ให้บริการ</div>
                        <div className="product-top-last-text">สมัครใหม่</div>
                        <div className="product-top-wall">|</div>
                        <div className="product-top-last-text">เข้าสู่ระบบ</div>
                    </div>
                    {this.renderActive(this.props.active)}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={() => this.afterOpenModal()}
                        onRequestClose={() => this.closeModal()}
                        contentLabel="ตะกร้าสินค้า"
                        style={customStyles}
                    >
                        <ShoppingcartModal />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default connect(state => state)(Header)