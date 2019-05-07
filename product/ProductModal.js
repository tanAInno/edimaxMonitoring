import React, { Component } from 'react';
import axios from 'axios'
import '../css/ProductModal.css'
import { setProducts, setChoosenProduct } from '../actions/product';
import { connect } from 'react-redux'

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

    renderDialog(){
        if(this.state.addCart)
            return(
                <div className="dialog-text">เพิ่มสินค้าเข้าไปยังรายการสั่งซื้อเรียบร้อย</div>
            )
    }

    render() {
        return (
            <div className="product-modal-container">
                <div className="product-modal-left">
                    <img className="product-modal-img" src={this.props.img} />
                    <div className="product-modal-name">{this.props.name}</div>
                </div>
                <div className="product-modal-right">
                    <div className="product-modal-amount">
                        <button className="product-modal-button-minus" onClick={() => this.minus()}>-</button>
                        <input
                            className="product-modal-content-amount"
                            value={this.state.amount}
                            type="number"
                            min="0"
                            onChange={e => this.handleChangeWithKey("amount", e)}
                        />
                        <button className="product-modal-button-plus" onClick={() => this.plus()}>+</button>
                    </div>
                    <button className="product-modal-confirm-button" onClick={() => this.addToCart()}>หยิบใส่รถเข็น</button>
                    {this.renderDialog()}
                </div>
            </div>
        )
    }

}

export default connect(state => state)(ProductModal)