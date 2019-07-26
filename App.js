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
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Player } from 'video-react';
import "./node_modules/video-react/dist/video-react.css";

library.add(faArrowCircleLeft, faArrowCircleRight)

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
                        <div className="main-banner-button-wrapper" onClick={() => this.back()}><FontAwesomeIcon icon="arrow-circle-left" className="main-banner-button" /></div>
                        <div className="main-banner-button-wrapper" onClick={() => this.next()}><FontAwesomeIcon icon="arrow-circle-right" className="main-banner-button" onClick={() => this.next()} /></div>
                    </div>
                    {this.renderCircle()}
                </div>
                <div className="main-content">
                    <div className="main-video-player">
                    <Player
                        playsInline
                        poster="./assets/images/poster.png"
                        src="./assets/videos/airmaskvideo.mp4"
                        playing={true}
                        loop={true}
                        muted={true}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default App