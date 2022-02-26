import React from 'react';
import {Card, Input, Button,DatePicker} from 'antd';
import {Link } from 'react-router-dom';
import './config';
import "../css/manage.css"
import PropTypes, {array} from "prop-types";
import {showAllOrders ,OneStatisics} from "../services/orderService";
const { Search } = Input;

const headers = ["订单号", "用户",  "时间", "书籍","总金额", "详情"];

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
            edit: null,
            search: false,
            preSearchData: null,
            user: 0,
        };
        user = localStorage.getItem("user");
        user_type = localStorage.getItem("user_type");
        this.setState({user:user});
    }

    componentDidMount() {
        const callback = (data) => {
            list.splice(0,list.length);
            for(let i in data){
                let l = [];
                l.push(data[i].order_id);
                l.push(data[i].user_id);
                l.push(data[i].time);
                l.push(data[i].books);
                l.push(data[i].totalmoney);
                console.log((data[i].booktonum));
                list.push(l);
            }
            this.setState({data:list});
            console.log(list);
        };
        if(user_type === "0") {
            showAllOrders({"search": null}, callback);
        }
        else{
            console.log("just a user!");
            let json = new Object();
            json.user_id = user;
            OneStatisics(json, callback);

        }
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

    save = (e) => {
        e.preventDefault();
        let input = e.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data,
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
        let searchdata = this.preSearchData.filter(function (row) {
            let str = row[3].toString().substring(0, 10);
            if(str >= min && str <= max){
                return true;
            }
            else{
                return false;
            }
        });
        this.setState({data: searchdata});
    };

    render = () => {
        return (
            <div style={{margin:0,marginTop:50}}>
                {this.renderTable()}
            </div>
        );
    };

    renderToolbar = () => {
        return (
            <div >
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
            <div >
                <table  border={"1"} style={{width:1200,marginLeft:200}}>
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
                    {this.renderToolbar()}
                    {this.state.data.map(function (row, rowidx) {
                        return (
                            <tr key={rowidx}>{
                                row.map(function (cell, idx) {
                                    let content = cell;
                                    return <td key={idx} data-row={rowidx}>{content}</td>;
                                }, this)}
                                <td>
                                    <Link to={{pathname:'/OrderView', search: "?id=" + list[rowidx][0]}}
                                          target = "_blank">
                                        <Button>
                                            查看
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    }, this)}
                    </tbody>
                </table>
                <div>
                    <Input.Group compact style={{marginLeft:'25%'}}>
                        <DatePicker.RangePicker style={{ width: '40%' }}
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

export class OrderList extends React.Component{
    render(){
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: []
            })
        );
    }
}


export default OrderList;
