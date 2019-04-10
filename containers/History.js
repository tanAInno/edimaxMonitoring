import React, { Component } from 'react';
import axios from 'axios'
import '../css/App.css'
import '../css/History.css'
import { connect } from 'react-redux'
import { setDevices, setHistories } from '../actions/edimax';
import moment from 'moment'
import { convertArrayToCSV } from 'convert-array-to-csv';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-widgets/dist/css/react-widgets.css';

class History extends Component {

    constructor() {
        super()
        this.state = {
            csv: '',
            used_log_list: [],
            log_list: [],
            name_filter_list: [],
            counter: 40,
            selectedOption: null,
            options: [],
            from_date: '',
            to_date: ''
        }
        this.handleOnScroll = this.handleOnScroll.bind(this)
    }

    componentDidMount() {
        this.getHistories()
        window.addEventListener('scroll', this.handleOnScroll);
    }

    componentWillMount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }


    async getHistories() {
        await axios.get("http://203.154.132.69:8080/api/edimaxs")
            .then(response => {
                console.log(response.data.data)
                const histories = response.data.data
                this.setOption(histories)
                this.props.dispatch(setHistories(histories))
                this.setState({ name_filter_list: this.props.edimaxReducer.histories })
                this.setState({ log_list: this.props.edimaxReducer.histories })
                this.setState({ used_log_list: this.state.log_list.slice(0, 40) })
            }).catch(error => console.log(error))
    }

    setOption(op) {
        let options = []
        for (let i = 0; i < op.length; i++) {
            if (this.find(options, op[i].name) == false) {
                options.push({ label: op[i].name, value: op[i].name })
            }
        }
        options.sort(function (a, b) {
            if (a.value < b.value) { return -1; }
            if (a.value > b.value) { return 1; }
            return 0;
        })
        this.setState({ options: options })
        console.log(this.state.options)
    }

    find(arr, name) {
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].value == name) {
                found = true;
                break;
            }
        }
        return found
    }

    export() {
        let csv = convertArrayToCSV(this.state.log_list)
        var fileDownload = require('js-file-download');
        fileDownload(csv, 'history.csv')
    }

    handleOnScroll() {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            let counter = this.state.counter
            let addList = this.state.log_list.slice(this.state.counter, this.state.counter + 40)
            this.setState({ counter: this.state.counter + 40 })
            let newList = this.state.used_log_list.concat(addList)
            this.setState({ used_log_list: newList })
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () => this.filterLog());
    }

    filterLog() {
        let histories = this.props.edimaxReducer.histories
        let filter_list = []
        console.log(this.state.selectedOption.value)
        for (let i = 0; i < histories.length; i++) {
            if (this.state.selectedOption.value == histories[i].name) {
                filter_list.push(histories[i])
            }
        }
        this.setState({ counter: 40 })
        this.setState({ name_filter_list: filter_list})
        this.setState({ log_list: filter_list })
        this.setState({ used_log_list: this.state.log_list.slice(0, 40) }, () => this.filterDate())
    }

    filterDate() {
        if (this.state.from_date == '' && this.state.to_date == '') {
            this.setState({ counter: 40 })
            this.setState({ log_list: this.state.log_list })
            this.setState({ used_log_list: this.state.log_list.slice(0, 40) })
        }
        else {
            let from_date = moment(this.state.from_date)
            let to_date = moment(this.state.to_date)
            let filter_list = []
            console.log(from_date + " : " + to_date)
            for (let i = 0; i < this.state.name_filter_list.length; i++) {
                let data = this.state.name_filter_list[i]
                if ((moment(data.date_time) >= from_date || this.state.from_date == '')
                    && (moment(data.date_time) <= to_date || this.state.to_date == ''))
                    filter_list.push(data)
            }
            console.log(filter_list)
            this.setState({ counter: 40 })
            this.setState({ log_list: filter_list })
            this.setState({ used_log_list: filter_list.slice(0, 40) })
        }
    }

    onChangeFromDate = from_date => {
        this.setState({ from_date }, () => this.filterDate())
    }

    onChangeToDate = to_date => {
        this.setState({ to_date }, () => this.filterDate())
    }

    render() {
        return (
            <div className="tab-container">
                <div className="history-container">
                    <div className="filter-container">
                        <div className="button-container">
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.options}
                                className="module-select"
                            />
                            <div className="date-text">From</div>
                            <div className="date-picker-wrapper">
                                <DatePicker
                                    className="date-picker"
                                    selected={this.state.from_date}
                                    onChange={this.onChangeFromDate}
                                    dateFormat="dd/MM/YYYY HH:mm:ss"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    placeholderText="Select initial time"
                                />
                            </div>
                            <div className="date-text">To</div>
                            <div className="date-picker-wrapper">
                                <DatePicker
                                    className="date-picker"
                                    selected={this.state.to_date}
                                    onChange={this.onChangeToDate}
                                    dateFormat="dd/MM/YYYY HH:mm:ss"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    placeholderText="Select final time"
                                />
                            </div>
                            <button className="time-button" style={{marginLeft: '2%'}}>1 Min</button>
                            <button className="time-button">15 Min</button>
                            <button className="time-button">1 Hour</button>
                        </div>
                        <div className="export-container">

                            <button
                                className="export-button"
                                onClick={() => this.export()}>Export to CSV</button>
                        </div>
                    </div>
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-header-name">Name</div>
                            <div className="table-header-area">Area</div>
                            <div className="table-header-data">PM1</div>
                            <div className="table-header-data">PM2.5</div>
                            <div className="table-header-data">PM10</div>
                            <div className="table-header-data">CO</div>
                            <div className="table-header-data">CO2</div>
                            <div className="table-header-data">TVOC</div>
                            <div className="table-header-data">HCHO</div>
                            <div className="table-header-data">Temp</div>
                            <div className="table-header-data">Humid</div>
                            <div className="table-header-date">Date</div>
                        </div>
                        {this.state.used_log_list.map((data, index) => {
                            return (
                                <div className="table-row">
                                    <div className="table-row-name">{data.name}</div>
                                    <div className="table-row-area">{data.area}</div>
                                    <div className="table-row-data">{data.pm1}</div>
                                    <div className="table-row-data">{data.pm25}</div>
                                    <div className="table-row-data">{data.pm10}</div>
                                    <div className="table-row-data">{data.co}</div>
                                    <div className="table-row-data">{data.co2}</div>
                                    <div className="table-row-data">{data.tvoc}</div>
                                    <div className="table-row-data">{data.hcho}</div>
                                    <div className="table-row-data">{data.temperature}</div>
                                    <div className="table-row-data">{data.humidity}</div>
                                    <div className="table-row-date">{data.date_time}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(History)