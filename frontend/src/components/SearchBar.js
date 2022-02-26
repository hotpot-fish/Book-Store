import React from 'react';
import PropTypes from 'prop-types';
import '../css/search.css'
import {getBooks} from "../services/bookService";

import {Book} from './Book'
import {Link} from "react-router-dom";

const headers = ["Book"];

// const data1 = [["Java核心技术卷II",<img src={img1} className="search-img"/>],
//     ["深入理解计算机系统",<img src={img2} className="search-img"/>],
//     ["Effective C++",<img src={img3} className="search-img"/>],
//     ["小王子",<img src={img4} className="search-img"/>],
//     ["Java编程思想",<img src={img5} className="search-img"/>],
//     ["魔兽世界编年史套装(全三卷)",<img src={img6} className="search-img"/>],
//     ["三体：全三册",<img src={img7} className="search-img"/>],
//     ["悲惨世界（上中下）（精装版）",<img src={img8} className="search-img"/>],
//     ["动物农场",<img src={img9} className="search-img"/>],
//     ["机器学习",<img src={img10} className="search-img"/>],
//     ["纳尼亚传奇",<img src={img11} className="search-img"/>],
//     ["老人与海",<img src={img12} className="search-img"/>],
//     ["魔力的胎动",<img src={img13} className="search-img"/>],
//     ["我不怕这漫长黑夜",<img src={img14} className="search-img"/>],
//     ["永久记录",<img src={img15} className="search-img"/>],];

let data1 = [];

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
        };
    }

    componentDidMount() {
        const callback = (data) => {
            while(data1.length !== 0){
                data1.pop();
            }
            for(let i = 0; i < data.length; i++){
                if(data[i].status == 1){
                    let l = [];
                    l.push(data[i].name);
                    l.push(
                        <Link to={{pathname:'/BookView', search: "?id=" + data[i].id}}
                              target = "_blank">
                            <img src={data[i].img} className="search-img" />
                        </Link>);
                    data1.push(l);
                    console.log(data1);
                }
            }
            this.setState({
                initialData:data1
            })
        };
        getBooks({}, callback);
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
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };


    render = () => {
        return (
            <div>
                <p style={{color: "red"}}>
                    按书名搜索(此处非全文搜索)
                </p>
                {this.renderToolbar()}
                {this.renderTable()}
            </div>
        );
    };

    renderToolbar = () => {
        return (
            <div className="toolbar">
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
            <table>
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
                                let edit = this.state.edit;
                                if (edit && edit.row === rowidx && edit.cell === idx) {
                                    content = (
                                        <form onSubmit={this.save}>
                                            <input type="text" defaultValue={cell}/>
                                        </form>
                                    );
                                }
                                return <td key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                        </tr>
                    );
                }, this)}
                </tbody>
            </table>
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

class SearchBox extends React.Component{
    render(){
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: data1
            })
        );
    }
}

export default SearchBox;
