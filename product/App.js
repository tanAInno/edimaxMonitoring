import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Product from './Product'

class App extends Component {

    render() {
        return (
            <Tabs className="product-container"
                activeLinkStyle={{ borderBottom: '5px solid #FEEB34' }}>
                <div className="product-wrapper">
                    <div className="product-banner-wrapper">
                        <div className="product-banner">
                            <div className="logo">
                                <img className="logo-img" src={"../assets/images/karcher.png"} />
                            </div>
                            <div className="tab-row">
                                <TabLink className="product-text-wrapper" to="product">
                                    Product
                                </TabLink>
                                <TabLink className="product-text-wrapper" to="about">
                                    About
                                </TabLink>
                            </div>
                        </div>
                    </div>
                    <TabContent for="product">
                        <Product />
                    </TabContent>
                    <TabContent for="about">
                    </TabContent>
                </div>
            </Tabs>
        )
    }

}

export default App