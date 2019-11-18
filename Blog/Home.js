import React, { Component } from 'react';
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Blog.css'
import Blogrow from './Blogrow'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return(
            <div className="blog-wrapper">
                <Header active="blog"/>
                <div className="blog-content">
                    <Blogrow/>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Home