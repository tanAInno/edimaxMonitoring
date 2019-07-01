import React, { Component } from 'react';
import dateFns from "date-fns";
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Datetime.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setServices, setTotalPrice, setSelectedDate, setSelectedTime } from '../actions/service'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft, faArrowRight)

class Datetime extends Component {

    state = {
        currentMonth: new Date()
    }

    componentDidMount() {
        this.props.dispatch(setSelectedDate(new Date()))
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

    renderMonth() {
        const dateFormat = "MMMM YYYY"
        return (
            <div className="service-datetime-calendar-month-wrapper">
                <div className="service-datetime-calendar-arrow" onClick={() => this.prevMonth()}>
                    <FontAwesomeIcon icon="arrow-left" className="calendar-arrow-icon" />
                </div>
                <div className="service-datetime-calendar-month">{dateFns.format(this.state.currentMonth, dateFormat)}</div>
                <div className="service-datetime-calendar-arrow" onClick={() => this.nextMonth()}>
                    <FontAwesomeIcon icon="arrow-right" className="calendar-arrow-icon" />
                </div>
            </div>
        )
    }

    nextMonth() {
        this.setState({ currentMonth: dateFns.addMonths(this.state.currentMonth, 1) })
    }

    prevMonth() {
        this.setState({ currentMonth: dateFns.subMonths(this.state.currentMonth, 1) })
    }

    onDateClick = day => {
        this.props.dispatch(setSelectedDate(day))
    };

    renderDay() {
        const currentMonth = this.state.currentMonth
        const selectedDate = this.props.serviceReducer.selectedDate
        const monthStart = dateFns.startOfMonth(currentMonth)
        const monthEnd = dateFns.endOfMonth(monthStart)
        const startDate = dateFns.startOfWeek(monthStart)
        const endDate = dateFns.endOfWeek(monthEnd)
        const dateFormat = "D"
        const rows = []
        let days = []
        let day = startDate
        let formattedDate = ""
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat)
                const cloneDay = day
                if (!dateFns.isSameMonth(day, monthStart))
                    days.push(<div className="service-datetime-day-disable"
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>{formattedDate}</div>)
                else if (dateFns.isSameDay(day, selectedDate))
                    days.push(<div className="service-datetime-day-selected"
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>{formattedDate}</div>)
                else
                    days.push(<div className="service-datetime-day"
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>{formattedDate}</div>)
                day = dateFns.addDays(day, 1)
            }
            rows.push(
                <div className="service-datetime-day-row" key={day}>
                    {days}
                </div>
            )
            days = []
        }
        return <div className="service-datetime-day-body">{rows}</div>
    }

    renderButton(data) {
        if (this.props.serviceReducer.selectedTime == data)
            return <button className="service-datetime-timepicker-button-selected" onClick={() => this.props.dispatch(setSelectedTime(data))}>{data}</button>
        else
            return <button className="service-datetime-timepicker-button" onClick={() => this.props.dispatch(setSelectedTime(data))}>{data}</button>
    }

    render() {
        const format = "D MMMM YYYY"
        let th = require('date-fns/locale/th')
        return (
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-datetime-wrapper">
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
                            <div className="service-booking-order-circle">3</div>
                            <div className="service-booking-order-text">เพิ่มเติม</div>
                        </Link>
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle">4</div>
                            <div className="service-booking-order-text">ที่อยู่</div>
                        </div>
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle">5</div>
                            <div className="service-booking-order-text">ชำระเงิน</div>
                        </div>
                    </div>
                    <div className="service-datetime-header">ระบุช่วงเวลาที่ต้องการ</div>
                    <div className="service-datetime-content">
                        <div className="service-datetime-calendar">
                            <div className="service-datetime-calendar-header">เลือกวันที่</div>
                            <div className="service-datetime-calendar-content-wrapper">
                                {this.renderMonth()}
                                <div className="service-datetime-calendar-day-header">
                                    <div className="service-datetime-calendar-day">Su</div>
                                    <div className="service-datetime-calendar-day">Mo</div>
                                    <div className="service-datetime-calendar-day">Tu</div>
                                    <div className="service-datetime-calendar-day">We</div>
                                    <div className="service-datetime-calendar-day">Th</div>
                                    <div className="service-datetime-calendar-day">Fr</div>
                                    <div className="service-datetime-calendar-day">Sa</div>
                                </div>
                                {this.renderDay()}
                            </div>
                        </div>
                        <div className="service-booking-reserve">
                            <div className="service-booking-reserve-box">
                                <div className="service-booking-reserve-header">ล้างแอร์</div>
                                {this.renderChoosenItems()}
                                <div className="service-booking-reserve-date-wrapper">
                                    <div className="service-booking-reserve-date-header">วันที่</div>
                                    <div className="service-booking-reserve-date">{dateFns.format(this.props.serviceReducer.selectedDate, format, {locale: th})}</div>
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
                            <Link className="service-booking-reserve-button-wrapper" style={{ textDecoration: 'none' }} to="/service/addition">
                                <button className="service-booking-reserve-button">ดำเนินการต่อ</button>
                            </Link>
                        </div>
                    </div>
                    <div className="service-datetime-timepicker">
                        {this.renderButton("9.00 - 12.00 น.")}
                        {this.renderButton("12.00 - 16.00 น.")}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(Datetime)