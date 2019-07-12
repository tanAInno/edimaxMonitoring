import React, { Component } from 'react';
import dateFns from "date-fns";
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Payment.css'
import route from '../api'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setServices, setTotalPrice } from '../actions/service'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'

class Payment extends Component {

    state = {
        bankpayment: true,
        cashpayment: false,
        imagePreviewUrl: '',
        paymentOption: ''
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ image: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ imagePreviewUrl: url }));
    };

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

    renderAddress() {
        return this.props.serviceReducer.address.addressNumber + " " + this.props.serviceReducer.address.housing +
            " " + this.props.serviceReducer.address.road + " " + this.props.serviceReducer.address.subdistrict +
            " " + this.props.serviceReducer.address.district + " " + this.props.serviceReducer.address.province
    }

    renderBankButton() {
        if (this.state.bankpayment)
            return <button className="service-payment-button-left-active" onClick={() => this.setPaymentOption("bank")}>โอนผ่านธนาคาร</button>
        else
            return <button className="service-payment-button-left" onClick={() => this.setPaymentOption("bank")}>โอนผ่านธนาคาร</button>
    }

    renderCashButton() {
        if (this.state.cashpayment)
            return <button className="service-payment-button-right-active" onClick={() => this.setPaymentOption("cash")}>ชำระด้วยเงินสด</button>
        else
            return <button className="service-payment-button-right" onClick={() => this.setPaymentOption("cash")}>ชำระด้วยเงินสด</button>
    }

    setPaymentOption(type) {
        if (type == "bank") {
            this.setState({ bankpayment: true })
            this.setState({ cashpayment: false })
            this.setState({ paymentOption: "โอนผ่านธนาคาร" })
        }
        if (type == "cash") {
            this.setState({ bankpayment: false })
            this.setState({ cashpayment: true })
            this.setState({ imagePreviewUrl: null })
            this.setState({ paymentOption: "ชำระด้วยเงินสด" })
        }
    }

    cancelUpload() {
        this.setState({ imagePreviewUrl: null })
    }

    renderPaymentContent() {
        let vatPrice = Math.ceil(this.props.serviceReducer.totalprice * 7 / 100)
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className="previewImage" src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">อัพโหลดรูปภาพหลักฐานการชำระเงิน</div>);
        }
        if (this.state.bankpayment)
            return (
                <div className="service-payment-box-content">
                    <img className="service-payment-bank-img" src={"../assets/images/scb.png"}/>
                    <div className="service-payment-bank">
                        <div className="service-payment-bank-text">ช่องทางธนาคาร</div>
                        <div className="service-payment-bank-text">ไทยพาณิชย์</div>
                    </div>
                    <div className="service-payment-bank">
                        <div className="service-payment-bank-text">เลขที่บัญชี</div>
                        <div className="service-payment-bank-text">154-5-15462-3</div>
                    </div>
                    <div className="service-payment-bank">
                        <div className="service-payment-bank-text">ชื่อบัญชี</div>
                        <div className="service-payment-bank-text">บริษัท อินโนเวชั่น เทคโนโลยี จำกัด</div>
                    </div>
                    <div className="service-previewcomponent">
                        <div className="service-imgPreview">
                            {$imagePreview}
                        </div>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <FileUploader
                                className="service-fileInput"
                                accept="image/*"
                                name="image"
                                randomizeFilename
                                storageRef={firebase.storage().ref("images")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                            />
                        </form>
                        <button className="service-cancelInput" onClick={() => this.cancelUpload()}>ยกเลิกการ Upload รูปภาพ</button>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">ราคาค่าบริการทั้งหมด</div>
                        <div className="service-payment-box-price-text">฿ {this.props.serviceReducer.totalprice}</div>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">ภาษีมูลค่าเพิ่ม (VAT) 7 %</div>
                        <div className="service-payment-box-price-text">฿ {vatPrice}</div>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">รวมเป็นจำนวนเงินที่ต้องชำระ</div>
                        <div className="service-payment-box-price-text">฿ {this.props.serviceReducer.totalprice + vatPrice}</div>
                    </div>
                </div>
            )
        if (this.state.cashpayment)
            return (
                <div className="service-payment-box-content">
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">ราคาค่าบริการทั้งหมด</div>
                        <div className="service-payment-box-price-text">฿ {this.props.serviceReducer.totalprice}</div>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">ภาษีมูลค่าเพิ่ม (VAT) 7 %</div>
                        <div className="service-payment-box-price-text">฿ {vatPrice}</div>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">รวมเป็นจำนวนเงินที่ต้องชำระ</div>
                        <div className="service-payment-box-price-text">฿ {this.props.serviceReducer.totalprice + vatPrice}</div>
                    </div>
                </div>
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

    async sendRequest() {
        if (this.props.serviceReducer.services.length > 0) {
            await axios.post(route + "services", {
                name: this.props.serviceReducer.address.name,
                phone: this.props.serviceReducer.address.phone,
                address: this.renderAddress(),
                totalprice: this.props.serviceReducer.totalprice,
                date: this.props.serviceReducer.selectedDate,
                time: this.props.serviceReducer.selectedTime,
                services: this.props.serviceReducer.services,
                addition: this.props.serviceReducer.addition,
                image: this.state.imagePreviewUrl,
                paymentOption: this.state.paymentOption
            }).catch(error => console.log(error))
        }
    }

    render() {
        const format = "D MMMM YYYY"
        let th = require('date-fns/locale/th')
        return (
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-payment-wrapper">
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
                            <div className="service-booking-order-circle-active">5</div>
                            <div className="service-booking-order-text">ชำระเงิน</div>
                        </Link>
                    </div>
                    <div className="service-payment-header">เลือกช่องทางการชำระเงิน</div>
                    <div className="service-payment-content">
                        <div className="service-payment-box">
                            <div className="service-payment-box-header">ช่องทางการชำระเงิน</div>
                            <div className="service-payment-box-text">หลังจากชำระเงินเรียบร้อยแล้ว ข้อมูลจึงส่งถึงผู้ให้บริการ</div>
                            <div className="service-payment-box-text">กรุณาชำระเงินภายใน 24 ชั่วโมง มิฉะนั้นระบบจะยกเลิกคำสั่งอัตโนมัติ</div>
                            <div className="service-payment-box-check-wrapper">
                                <img className="service-payment-box-check" src={"../assets/images/check.png"} />
                                <div className="service-payment-box-check-text">ค่าบริการรวมค่าเดินทางของผู้ให้บริการเรียบร้อยแล้ว</div>
                            </div>
                            <div className="service-payment-box-check-wrapper">
                                <img className="service-payment-box-check" src={"../assets/images/check.png"} />
                                <div className="service-payment-box-check-text">อาจมีค่าใช้จ่ายเพิ่มเติมหน้างาน หากมีคำขอเพิ่มเติมจากลูกค้า</div>
                            </div>
                            <div className="service-payment-box-check-wrapper">
                                <img className="service-payment-box-check" src={"../assets/images/check.png"} />
                                <div className="service-payment-box-check-text">เพื่อความสะดวกของลูกค้า กรุณาชำระเงินพอดีกับยอดเรียกเก็บ</div>
                            </div>
                            <div className="service-payment-button-group">
                                {this.renderBankButton()}
                                {this.renderCashButton()}
                            </div>
                            {this.renderPaymentContent()}
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
                                <div className="service-booking-reserve-date-wrapper">
                                    <div className="service-booking-reserve-date-header">สถานที่</div>
                                    <div className="service-booking-reserve-date">{this.renderAddress()}</div>
                                </div>
                                <div className="service-booking-reserve-total-wrapper">
                                    <div className="service-booking-reserve-total-header">รวมยอด</div>
                                    <div className="service-booking-reserve-total">{this.props.serviceReducer.totalprice} บาท</div>
                                </div>
                            </div>
                            <Link className="service-booking-reserve-button-wrapper" style={{ textDecoration: 'none' }} to="/service/thanks">
                                <button className="service-booking-reserve-button" onClick={() => this.sendRequest()}>ยืนยันการจองบริการ</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(Payment)