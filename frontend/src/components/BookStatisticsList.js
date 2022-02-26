import React from 'react';
import { Input, DatePicker} from 'antd';
import moment from 'moment';
import { Row, Col, } from 'antd';
import './config';
import "../css/manage.css"
import PropTypes from "prop-types";
import {findOrderItemsByTime,userFindOrderItemsByTime} from "../services/orderService";

const headers = ["书籍", "数量", "单价"];

let list = []

let user = 0;
let user_type = 0;

class Excel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            search: false,
            preSearchData: null,
            user: 0,
            totalBook: 0,
            totalMoney: 0
        };
        user = localStorage.getItem("user");
        user_type = localStorage.getItem("user_type");
        this.setState({user:user});
    }

    componentDidMount() {
        this.rangeDate("0", moment().format().substring(0, 10));
    }

    sort = (e) => {
        let column = e.target.cellIndex;
        let data = this.state.data.slice();
        let descending = this.state.sortby === column && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending,
        });
    };

    toggleSearch = () => {
        if (this.state.search) {
            this.setState({
                data: this.preSearchData,
                search: false,
            });
            this.preSearchData = null;
        } else {
            this.preSearchData = this.state.data;
            this.setState({
                search: true,
            });
        }
    };

    search = (e) => {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.preSearchData});
            return;
        }
        let idx = e.target.dataset.idx;
        let searchdata = this.preSearchData.filter(function (row) {
            console.log(row[3]);
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };

    doRange = () => {
        this.preSearchData = this.state.data;
    };

    rangeDate = (min, max) => {
        console.log("user_type " + user_type + typeof user_type);
        const callback = (data) => {
            let num = 0;
            let money = 0;
            console.log("woc666");
            list.splice(0,list.length);
            for(let i in data){
                let l = [];
                num += data[i].num;
                money += data[i].num * data[i].price;
                l.push(data[i].name);
                l.push(data[i].num);
                l.push(data[i].price);
                list.push(l);
            }
            this.setState({
                data:list,
                totalBook: num,
                totalMoney: money,
            });
            console.log(list);
        };
        if(parseInt(user_type) === 0) {
            let json = new Object();
            json.minDate = min;
            json.maxDate = max;
            findOrderItemsByTime(json, callback);
        }
        else{
            console.log("just a user!");
            let json = new Object();
            json.minDate = min;
            json.maxDate = max;
            json.user_id = user;
            userFindOrderItemsByTime(json, callback);
        }
    };

    render = () => {
        return (
            <div>
                {this.renderToolbar()}
                {this.renderTable()}
            </div>
        );
    };

    renderToolbar = () => {
        return (
            <div>
                <button onClick={this.toggleSearch}>Search</button>
            </div>
        );
    };

    renderSearch = () =>  {
        if (!this.state.search) {
            return null;
        }
        return (
            <tr onChange={this.search}>
                {this.props.headers.map(function (ignore, idx) {
                    return <td key={idx}><input type="text" data-idx={idx} placeholder="请输入"/></td>;
                })}
            </tr>
        );
    };

    renderTable = () => {
        return (
            <div>

                <table  border={"1"} border={"1"}  style={{width:800,marginLeft:0}}>
                    <thead onClick={this.sort}>
                    <tr>{
                        this.props.headers.map(function (title, idx) {
                            if (this.state.sortby === idx) {
                                title += this.state.descending ? ' \u2191' : ' \u2193';
                            }
                            return <th key={idx}>{title}</th>;
                        }, this)
                    }</tr>
                    </thead>
                    <tbody>
                    {this.renderSearch()}
                    {this.state.data.map(function (row, rowidx) {
                        return (
                            <tr key={rowidx}>{
                                row.map(function (cell, idx) {
                                    let content = cell;
                                    return <td key={idx} data-row={rowidx}>{content}</td>;
                                }, this)}
                            </tr>
                        );
                    }, this)}
                    </tbody>
                </table>
                <Row>
                    <Col span = {10}>
                        <span>购买总数：<span>{this.state.totalBook}个</span></span>
                    </Col>
                    <Col>
                        <span>总金额：<span>￥{this.state.totalMoney}</span></span>
                    </Col>
                </Row>
                <div>
                    <Input.Group compact>
                        <DatePicker.RangePicker
                            style={{ width: '40%' }}
                            onChange={(e)=>{
                                let min = e[0].format("YYYY-MM-DD").toString();
                                let max = e[1].format("YYYY-MM-DD").toString();
                                console.log(min);
                                console.log(max);
                                this.preSearchData = this.state.data;
                                this.rangeDate(min, max);
                            }}
                        />
                    </Input.Group>
                    <br/>
                </div>
            </div>
        );
    }
};

Excel.propTypes = {
    headers: PropTypes.arrayOf(
        PropTypes.string
    ),
    initialData: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.string
        )
    ),
};

export class BookStatisticsList extends React.Component{
    render(){
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: []
            })
        );
    }
}


export default BookStatisticsList;
