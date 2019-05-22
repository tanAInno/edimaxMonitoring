import React, { Component } from 'react';
import axios from 'axios'
import '../css/Admin.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import route from '../api'
import { setCustomerList } from '../actions/product';
import { convertArrayToCSV } from 'convert-array-to-csv';

class Admin extends Component {

    componentDidMount() {
        this.getList()
    }

    export() {
        let exportList = []
        for(let i=0;i < this.props.productReducer.customerList.length; i++){
            let data = this.props.productReducer.customerList[i]
            let productList = this.props.productReducer.customerList[i].productList
            for(let j=0; j < productList.length; j++){
                let exportdata = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    department: data.department,
                    workplace: data.workplace,
                    product: productList[j].name,
                    amount: productList[j].amount,
                    paymentOption: data.paymentOption
                }
                exportList.push(exportdata)
            }
        }
        let csv = convertArrayToCSV(exportList)
        var fileDownload = require('js-file-download');
        fileDownload(csv, 'history.csv')
    }

    async getList() {
        await axios.get(route + "products").then(
            response => {
                console.log(response)
                const customerList = response.data.data.map(c => {
                    return ({
                        _id: c._id,
                        name: c.name,
                        email: c.email,
                        phone: c.phone,
                        department: c.department,
                        workplace: c.workplace,
                        productList: c.productList,
                        paymentOption: c.paymentOption
                    })
                })
                this.props.dispatch(setCustomerList(customerList))
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="admin-container">
                <div className="admin-header">รายชื่อการสั่งซื้อสินค้า</div>
                <button onClick={() => this.export()} className="admin-export-button">Export to CSV</button>
                <div className="admin-table">
                    <div className="admin-table-header">
                        <div className="admin-table-header-name">
                            ชื่อ-นามสกุล
                        </div>
                        <div className="admin-table-header-email">
                            email
                        </div>
                        <div className="admin-table-header-phone">
                            เบอร์โทร
                        </div>
                        <div className="admin-table-header-department">
                            ฝ่าย
                        </div>
                        <div className="admin-table-header-workplace">
                            โครงการ
                        </div>
                        <div className="admin-table-header-product">
                            สินค้าที่สั่งซื้อ
                        </div>
                        <div className="admin-table-header-payment">
                            วิธีการชำระเงิน
                        </div>
                    </div>
                    {this.props.productReducer.customerList.map((data, index) => {
                        return (
                            <div className="admin-table-row">
                                <div className="admin-table-row-name">{data.name}</div>
                                <div className="admin-table-row-email">{data.email}</div>
                                <div className="admin-table-row-phone">{data.phone}</div>
                                <div className="admin-table-row-department">{data.department}</div>
                                <div className="admin-table-row-workplace">{data.workplace}</div>
                                <div className="admin-table-row-product">
                                    {data.productList.map((data,index) => {
                                        return(
                                            <div className="admin-table-productlist-row">
                                                <img className="admin-table-productlist-img" src={data.img}/>
                                                <div className="admin-table-productlist-name">{data.name}</div>
                                                <div className="admin-table-productlist-amount">{data.amount}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="admin-table-row-payment">{data.paymentOption}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default connect(state => state)(Admin)