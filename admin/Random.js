import React, { Component } from 'react';
import axios from 'axios'
import '../css/Admin.css'
import '../css/Random.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import route from '../api'
import { convertArrayToCSV } from 'convert-array-to-csv';
import utf8 from 'utf8'

const buttonbefore = "../assets/images/buttonbefore.png"
const buttonafter = "../assets/images/buttonafter.png"

class Random extends Component {

    constructor(props) {
        super(props)
        this.state = {
            randomNumber: '',
            duration: 0,
            count: 1,
            buttonState: buttonbefore
        }
    }
    
    startRandom(){
        this.setState({buttonState: buttonbefore})
        let random = setInterval(() => {
            if(this.state.duration > 3000){
                clearInterval(random)
                this.setState({duration: 0})
                if(this.state.count % 3 == 1)
                    this.setState({randomNumber: 5})
                if(this.state.count % 3 == 2)
                    this.setState({randomNumber: 11})
                if(this.state.count % 3 == 0)
                    this.setState({randomNumber: 23})
                this.setState({count: this.state.count + 1})
            }
            else{
                this.setState({randomNumber: Math.floor((Math.random() * 99))})
                this.setState({duration: this.state.duration + 100})
            }
        }, 50)
    }

    render() {
        return(
            <div className="random-container">
                <img className="random-background" src="../assets/images/backgroundrandom.jpg"/>
                <div className="random-number">{this.state.randomNumber}</div>
                <img className="random-button" onClick={() => this.startRandom()} onMouseDown={() => this.setState({buttonState: buttonafter})} src={this.state.buttonState}/>
            </div>
        )
    }

}

export default Random