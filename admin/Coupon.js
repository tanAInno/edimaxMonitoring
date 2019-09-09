import React, { Component } from 'react';
import axios from 'axios'
import '../css/Admin.css'
import '../css/Coupon.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import route from '../api'
import { setCustomerList, setCouponList } from '../actions/product';
import { convertArrayToCSV } from 'convert-array-to-csv';
import utf8 from 'utf8'

class Coupon extends Component {

    state = {
        name: "",
        amount: 1
    }

    componentDidMount() {
        this.getCoupon()
    }

    randomAmountOfCoupon() {
        for(let i = 0; i < this.state.amount; i++){
            this.randomCoupon()
        }
    }

    async randomCoupon() {
        await axios.post(route + "coupons", {
            code: this.state.name + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9),
            type: this.state.name
        }).catch(error => console.log(error))
        location.reload()
    }

    async getCoupon() {
        await axios.get(route + "coupons").then(
            response => {
                const couponList = response.data.data.map(c => {
                    return ({
                        code: c.code,
                        used: c.used,
                        type: c.type
                    })
                })
                this.props.dispatch(setCouponList(couponList))
            }).catch(error => console.log(error))
    }

    handleChange(e) {
        this.setState({amount: e.target.value})
    }

    handleChangeName(e) {
        this.setState({name: e.target.value})
    }

    render() {
        return (
            <div className="admin-container">
                <input
                    value={this.state.name}
                    onChange={e => this.handleChangeName(e)}
                    placeholder="enter code name..."/>
                <button onClick={() => this.randomAmountOfCoupon()} className="admin-export-button">Generate</button>
                <input 
                    value={this.state.amount}
                    onChange={e => this.handleChange(e)} />
                {this.props.productReducer.couponList.map((data, index) => {
                    return (
                        <div className="coupon-row">
                            <div className="coupon-text">{data.code}</div>
                            <div className="coupon-text">{data.used}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default connect(state => state)(Coupon)