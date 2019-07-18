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
import { setServices, setTotalServicePrice } from '../actions/service'
import { setUser } from '../actions/user'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'

class Payment extends Component {

    state = {
        bankpayment: true,
        cashpayment: false,
        imagePreviewUrl: '',
        paymentOption: '',
        coupon: '',
        couponValid: true,
        couponData: {}
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
        return this.props.serviceReducer.serviceaddress.addressNumber + " " + this.props.serviceReducer.serviceaddress.housing +
            " " + this.props.serviceReducer.serviceaddress.road + " " + this.props.serviceReducer.serviceaddress.subdistrict +
            " " + this.props.serviceReducer.serviceaddress.district + " " + this.props.serviceReducer.serviceaddress.province
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

    async updateUserService() {
        let serviceOrderList = this.props.userReducer.user.serviceOrderList
        let paymentStage = ''
        if(this.state.imagePreviewUrl == '')
            paymentStage = "unpaid"
        if(this.state.imagePreviewUrl != '')
            paymentStage = "processing"
        serviceOrderList.push({ serviceList: this.props.serviceReducer.services, paymentImage: this.state.imagePreviewUrl, paymentStage: paymentStage, coupon: this.state.coupon})
        await axios.put(route + "userservice/" + this.props.userReducer.user._id, {
            serviceOrderList: serviceOrderList
        }).catch(error => console.log(error))
        let user = this.props.userReducer.user
        user.serviceOrderList = serviceOrderList
        this.props.dispatch(setUser(user))
    }

    handleChange(e) {
        this.setState({coupon: e.target.value})
    }

    async useCoupon() {
        await axios.get(route + "couponbycode/" + this.state.coupon).then(
            response => {
                if(response.data.status == "ok"){
                    this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice - 100))
                    this.setState({couponValid: true})
                    this.setState({couponData: response.data.data})
                }
                if(response.data.status == "undefined")
                    this.setState({couponValid: false})
            }).catch(error => console.log(error))
    }

    renderCaution(){
        if(this.state.couponValid == false)
            return <div className="service-payment-caution">รหัสคูปองไม่ถูกต้อง หรือคูปองได้ถูกใช้งานไปแล้ว</div>
        if(this.state.couponValid == true)
            return <div/>
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
                    <img className="service-payment-bank-img" src={"../assets/images/tmb.jpg"}/>
                    <div className="service-payment-bank">
                        <div className="service-payment-bank-text">ช่องทางธนาคาร</div>
                        <div className="service-payment-bank-text">ธนาคารทหารไทยจำกัด มหาชน</div>
                    </div>
                    <div className="service-payment-bank">
                        <div className="service-payment-bank-text">เลขที่บัญชี</div>
                        <div className="service-payment-bank-text">069-2-64698-7</div>
                    </div>
                    <div className="service-payment-bank">
                        <div className="service-payment-bank-text">ชื่อบัญชี</div>
                        <div className="service-payment-bank-text">บริษัท อินโนเวชั่น เทคโนโลยี จำกัด</div>
                    </div>
                    <div className="payment-text-detail">(รูปสลิปหลักฐานการโอนเงินสามารถ Upload ในภายหลังได้ในหน้าการสั่งซื้อของคุณ)</div> 
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
                        <div className="service-payment-box-price-text">฿ {this.props.serviceReducer.totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">ภาษีมูลค่าเพิ่ม (VAT) 7 %</div>
                        <div className="service-payment-box-price-text">฿ {vatPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">รวมเป็นจำนวนเงินที่ต้องชำระ</div>
                        <div className="service-payment-box-price-text">฿ {(this.props.serviceReducer.totalprice + vatPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>
                    <div className="service-payment-box-coupon-wrapper">
                        <input className="service-payment-coupon-input"
                            value={this.state.coupon}
                            onChange={e => this.handleChange(e)}/>
                        <button className="service-payment-coupon-button" onClick={() => this.useCoupon()}>ใช้งานคูปอง</button>
                    </div>
                    {this.renderCaution()}
                </div>
            )
        if (this.state.cashpayment)
            return (
                <div className="service-payment-box-content">
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">ราคาค่าบริการทั้งหมด</div>
                        <div className="service-payment-box-price-text">฿ {this.props.serviceReducer.totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">ภาษีมูลค่าเพิ่ม (VAT) 7 %</div>
                        <div className="service-payment-box-price-text">฿ {vatPrice}</div>
                    </div>
                    <div className="service-payment-box-price-row">
                        <div className="service-payment-box-price-header">รวมเป็นจำนวนเงินที่ต้องชำระ</div>
                        <div className="service-payment-box-price-text">฿ {(this.props.serviceReducer.totalprice + vatPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>
                    <div className="service-payment-box-coupon-wrapper">
                        <input className="service-payment-coupon-input"
                            value={this.state.coupon}
                            onChange={e => this.handleChange(e)}/>
                        <button className="service-payment-coupon-button" onClick={() => this.useCoupon()}>ใช้งานคูปอง</button>
                    </div>
                    {this.renderCaution()}
                </div>
            )
    }

    plus(data) {
        let services = this.props.serviceReducer.services
        services[services.indexOf(data)].amount += 1
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice + data.price))
    }

    minus(data) {
        let services = this.props.serviceReducer.services
        let index = services.indexOf(data)
        if (services[index].amount > 1){
            services[index].amount -= 1
            this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice - data.price))
        }
    }

    delete(data) {
        let services = this.props.serviceReducer.services
        let index = services.indexOf(data)
        services.splice(index, 1)
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice - (data.price * data.amount)))
    }

    async updateCoupon() {
        await axios.put(route + "usedcoupon/" + this.state.couponData._id,{
            used: "used"
        }).catch(error => console.log(error))
    }

    async sendRequest() {
        if (this.props.serviceReducer.services.length > 0) {
            await axios.post(route + "services", {
                name: this.props.serviceReducer.serviceaddress.name,
                phone: this.props.serviceReducer.serviceaddress.phone,
                address: this.renderAddress(),
                totalprice: this.props.serviceReducer.totalprice,
                date: this.props.serviceReducer.selectedDate,
                time: this.props.serviceReducer.selectedTime,
                services: this.props.serviceReducer.services,
                addition: this.props.serviceReducer.addition,
                image: this.state.imagePreviewUrl,
                paymentOption: this.state.paymentOption
            }).catch(error => console.log(error))
            this.updateUserService()
            if(this.state.couponData != {})
                this.updateCoupon()
        }
        this.props.dispatch(setServices([]))
        this.props.dispatch(setTotalServicePrice(0))
    }

    render() {
        const format = "D MMMM YYYY"
        let th = require('date-fns/locale/th')
        let vatPrice = Math.ceil(this.props.serviceReducer.totalprice * 7 / 100)
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
                                    <div className="service-booking-reserve-total">{(this.props.serviceReducer.totalprice + vatPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
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