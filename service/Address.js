import React, { Component } from 'react';
import dateFns from "date-fns";
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Address.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setServices, setTotalPrice, setAddress } from '../actions/service'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Address extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        name: "",
        phone: "",
        addressNumber: "",
        housing: "",
        road: "",
        subdistrict: "",
        district: "",
        province: ""
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    handleChangeWithKey = (key, e) => {
        if (key == "name")
            this.setState({ name: e.target.value })
        if (key == "phone")
            this.setState({ phone: e.target.value })
        if (key == "addressNumber")
            this.setState({ addressNumber: e.target.value })
        if (key == "road")
            this.setState({ road: e.target.value })
        if (key == "housing")
            this.setState({ housing: e.target.value })
        if (key == "province")
            this.setState({ province: e.target.value })
        if (key == "district")
            this.setState({ district: e.target.value })
        if (key == "subdistrict")
            this.setState({ subdistrict: e.target.value })
    }

    setAddress() {
        this.props.dispatch(setAddress({
            name: this.state.name,
            phone: this.state.phone,
            addressNumber: this.state.addressNumber,
            housing: this.state.housing,
            road: this.state.road,    
            subdistrict: this.state.subdistrict,
            district: this.state.district,
            province: this.state.province
        }))
    }

    renderChoosenItems() {
        return (
            this.props.serviceReducer.services.map((data, index) => {
                return (
                    <div className="service-booking-reserve-item-wrapper">
                        <div className="service-booking-reserve-item-header">{data.name}</div>
                        <div className="service-booking-reserve-item">
                            <button className="service-booking-reserve-item-minus" onClick={() => this.minus(data)}>-</button>
                            <div className="service-booking-reserve-item-amount">{data.amount}</div>
                            <button className="service-booking-reserve-item-plus" onClick={() => this.plus(data)}>+</button>
                            <button className="service-booking-reserve-item-delete" onClick={() => this.delete(data)}>ลบ</button>
                        </div>
                    </div>
                )
            })
        )
    }

    plus(data) {
        let services = this.props.serviceReducer.services
        services[services.indexOf(data)].amount += 1
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalPrice(this.props.serviceReducer.totalprice + data.price))
    }

    minus(data) {
        let services = this.props.serviceReducer.services
        let index = services.indexOf(data)
        services[index].amount -= 1
        if (services[index].amount == 0)
            services.splice(index, 1)
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalPrice(this.props.serviceReducer.totalprice - data.price))
    }

    delete(data) {
        let services = this.props.serviceReducer.services
        let index = services.indexOf(data)
        services.splice(index, 1)
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalPrice(this.props.serviceReducer.totalprice - (data.price * data.amount)))
    }

    render() {
        const format = "D MMMM YYYY"
        let th = require('date-fns/locale/th')
        return (
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-address-wrapper">
                    <div className="service-booking-img-group">
                        <img className="service-booking-img" src={"../assets/images/air_1.jpg"} />
                        <img className="service-booking-img" src={"../assets/images/air_2.jpg"} />
                    </div>
                    <div className="service-booking-header">ล้างแอร์</div>
                    <div className="service-booking-order">
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/booking">
                            <div className="service-booking-order-circle-active">1</div>
                            <div className="service-booking-order-text">รายการ</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/datetime">
                            <div className="service-booking-order-circle-active">2</div>
                            <div className="service-booking-order-text">วันเวลา</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/addition">
                            <div className="service-booking-order-circle-active">3</div>
                            <div className="service-booking-order-text">เพิ่มเติม</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/address">
                            <div className="service-booking-order-circle-active">4</div>
                            <div className="service-booking-order-text">ที่อยู่</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/payment">
                            <div className="service-booking-order-circle">5</div>
                            <div className="service-booking-order-text">ชำระเงิน</div>
                        </Link>
                    </div>
                    <div className="service-address-header">เพิ่มที่อยู่ใหม่</div>
                    <div className="service-address-content">
                        <div className="service-address-info">
                            <div className="service-address-input-wrapper">
                                <div className="service-address-input-header">ชื่อ-นามสุกล</div>
                                <input className="service-address-input"
                                    value={this.state.name}
                                    onChange={e => this.handleChangeWithKey("name", e)} />
                            </div>
                            <div className="service-address-input-wrapper">
                                <div className="service-address-input-header">เบอร์โทรศัพท์</div>
                                <input className="service-address-input"
                                    value={this.state.phone}
                                    onChange={e => this.handleChangeWithKey("phone", e)} />
                            </div>
                            <div className="service-address-input-wrapper">
                                <div className="service-address-input-header">บ้านเลขที่ / เลขที่ห้อง</div>
                                <input className="service-address-input"
                                    value={this.state.addressNumber}
                                    onChange={e => this.handleChangeWithKey("addressNumber", e)} />
                            </div>
                            <div className="service-address-input-wrapper">
                                <div className="service-address-input-header">ชื่อหมู่บ้าน / อาคาร / คอนโด</div>
                                <input className="service-address-input"
                                    value={this.state.housing}
                                    onChange={e => this.handleChangeWithKey("housing", e)} />
                            </div>
                            <div className="service-address-input-wrapper">
                                <div className="service-address-input-header">ถนน</div>
                                <input className="service-address-input"
                                    value={this.state.road}
                                    onChange={e => this.handleChangeWithKey("road", e)} />
                            </div>
                            <div className="service-address-input-wrapper">
                                <div className="service-address-input-header">แขวง / ตำบล</div>
                                <input className="service-address-input"
                                    value={this.state.subdistrict}
                                    onChange={e => this.handleChangeWithKey("subdistrict", e)} />
                            </div>
                            <div className="service-address-input-wrapper">
                                <div className="service-address-input-header">เขต / อำเภอ</div>
                                <input className="service-address-input"
                                    value={this.state.district}
                                    onChange={e => this.handleChangeWithKey("district", e)} />
                            </div>
                            <div className="service-address-input-wrapper">
                                <div className="service-address-input-header">จังหวัด</div>
                                <input className="service-address-input"
                                    value={this.state.province}
                                    onChange={e => this.handleChangeWithKey("province", e)} />
                            </div>
                        </div>
                        <div className="service-booking-reserve">
                            <div className="service-booking-reserve-box">
                                <div className="service-booking-reserve-header">ล้างแอร์</div>
                                {this.renderChoosenItems()}
                                <div className="service-booking-reserve-date-wrapper">
                                    <div className="service-booking-reserve-date-header">วันที่</div>
                                    <div className="service-booking-reserve-date">{dateFns.format(this.props.serviceReducer.selectedDate, format, { locale: th })}</div>
                                </div>
                                <div className="service-booking-reserve-date-wrapper">
                                    <div className="service-booking-reserve-date-header">เวลา</div>
                                    <div className="service-booking-reserve-date">{this.props.serviceReducer.selectedTime}</div>
                                </div>
                                <div className="service-booking-reserve-total-wrapper">
                                    <div className="service-booking-reserve-total-header">รวมยอด</div>
                                    <div className="service-booking-reserve-total">{this.props.serviceReducer.totalprice} บาท</div>
                                </div>
                            </div>
                            <Link className="service-booking-reserve-button-wrapper" style={{ textDecoration: 'none' }} to="/service/payment">
                                <button className="service-booking-reserve-button" onClick={() => this.setAddress()}>ดำเนินการต่อ</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAL6S4-IXfF5T_QXPHGckbRFtyx46uSgeo"
})(connect(state => state)(Address))