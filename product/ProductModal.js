import React, { Component } from 'react';
import axios from 'axios'
import '../css/ProductModal.css'
import { setProducts, setChoosenProduct } from '../actions/product';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

class ProductModal extends Component {

    state = {
        amount: 1,
        addCart: false
    }

    handleChangeWithKey(key,e){
        if(key == "amount")
            this.setState({amount : e.target.value})
    }

    minus() {
        this.setState({amount: this.state.amount - 1})
    }

    plus() {
        this.setState({amount: this.state.amount + 1})
    }

    addToCart() {
        let products = this.props.productReducer.products
        let newobj = { img: this.props.img, 
                    name: this.props.name, 
                    desc: this.props.desc, 
                    tag: this.props.tag, 
                    amount: this.state.amount }
        let exist = false
        for (let i = 0; i < products.length; i++) {
            if (products[i].name == this.props.name) {
                products[i].amount = this.state.amount
                exist = true
            }
        }
        if (!exist)
            products.push(newobj)
        this.props.dispatch(setProducts(products))
        this.setState({addCart: true})
    }

    renderLogo(type){
        if(type == 'karcher')
            return(
                <img className="product-modal-logo" src={'../assets/images/karcher.png'}/>
            )
        if(type == 'innocare')
            return(
                <div className="product-modal-logo-text">INNOCARE</div>
            )
    }

    render() {
        return (
            <div className="product-modal-container">
                <div className="product-modal-header">
                    <div className="product-modal-header-text">เพิ่มสินค้าลงในตะกร้าเรียบร้อย</div>
                </div>
                <div className="product-modal-content">
                    <div className="product-modal-left">
                        <img className="product-modal-img" src={this.props.img} />
                    </div>
                    <div className="product-modal-right">
                        {this.renderLogo(this.props.type)}
                        <div className="product-modal-name">{this.props.name}</div>
                        <div className="product-modal-price-wrapper">
                            <div className="product-modal-price">{this.props.price}</div>
                            <div className="product-modal-price-tag"> / ชิ้น</div>
                        </div>
                        <div className="product-modal-amount">จำนวน 1</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(ProductModal)