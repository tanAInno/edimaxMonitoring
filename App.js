import React, { Component } from 'react';
import axios from 'axios'
import './css/Main.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Monitor from './containers/Monitor'
import History from './containers/History'
import Header from './Header'
import Footer from './Footer'
import { Link, Redirect } from 'react-router-dom';
import './assets/fonts/fontface.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft, faArrowRight)

class App extends Component {

    state = {
        banner: 1
    }

    renderBanner() {
        if (this.state.banner == 1)
            return <img className="main-banner-img" src={"./assets/images/banner1.jpg"} />
        if (this.state.banner == 2)
            return <img className="main-banner-img" src={"./assets/images/banner2.jpg"} />
        if (this.state.banner == 3)
            return <img className="main-banner-img" src={"./assets/images/banner3.jpg"} />
    }

    back() {
        if (this.state.banner - 1 <= 0)
            this.setState({ banner: 3 })
        else
            this.setState({ banner: this.state.banner - 1 })
    }

    next() {
        if (this.state.banner + 1 > 3)
            this.setState({ banner: 1 })
        else
            this.setState({ banner: this.state.banner + 1 })
    }

    renderCircle() {
        if (this.state.banner == 1)
            return (
                <div className="main-banner-circle-group">
                    <div className="main-banner-circle-active" />
                    <div className="main-banner-circle" />
                    <div className="main-banner-circle" />
                </div>
            )
        if (this.state.banner == 2)
            return (
                <div className="main-banner-circle-group">
                    <div className="main-banner-circle" />
                    <div className="main-banner-circle-active" />
                    <div className="main-banner-circle" />
                </div>
            )
        if (this.state.banner == 3)
            return (
                <div className="main-banner-circle-group">
                    <div className="main-banner-circle" />
                    <div className="main-banner-circle" />
                    <div className="main-banner-circle-active" />
                </div>
            )
    }

    render() {
        return (
            <div className="main-container">
                <Header active="main" />
                <div className="main-banner-wrapper">
                    {this.renderBanner()}
                    <div className="main-banner-button-group">
                        <div className="main-banner-button-wrapper" onClick={() => this.back()}><FontAwesomeIcon icon="arrow-left" className="main-banner-button" /></div>
                        <div className="main-banner-button-wrapper" onClick={() => this.next()}><FontAwesomeIcon icon="arrow-right" className="main-banner-button" onClick={() => this.next()} /></div>
                    </div>
                    {this.renderCircle()}
                </div>
                <div className="main-content">
                    <div className="main-content-header">INNOCARE Solution</div>
                    <div className="main-content-solution">
                        <div className="main-content-solution-header">ลมหายใจของบ้าน</div>
                        <div className="main-content-solution-text">ระบบระบายอากาศสำหรับบ้านนั้นสำคัญอย่างมาก ระบบระบายอากาศที่ดีจะทำให้ผู้อาศัยภายในบ้าน สดชื่นและสุขภาพดี</div>
                        <div className="main-content-solution-text">คุณรู้หรือไม่ กว่า 30% อากาศภายในอาคาร/บ้าน เป็นพิษมากกว่าภายนอกถึง 100 เท่า</div>
                        <div className="main-content-solution-text">INNOCARE IAQ SOLUTION เพื่อคุณภาพอากาศที่ดีกว่า</div>
                        <Link className="main-content-solution-text" style={{ textDecoration: 'none' }} to="/blog"><div>( คลิ้ก )</div></Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default App