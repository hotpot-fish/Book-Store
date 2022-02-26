import React from 'react';
import {Input} from 'antd';
import {Button, input} from 'antd';
import './config';
import "../css/manage.css"
import PropTypes, {array} from "prop-types";
import {showAllBooks} from "../services/bookService";
import * as manageService from "../services/manageService"
const { Search } = Input;

const headers = ["id", "作者", "分类", "库存", "价格", "书名", "ISBN", "封面", "概要", "状态"];

let list = []

const addition = new Array(9)

let isAdding = false;

class Excel extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.addSubmit = this.addSubmit.bind(this);
        this.deleteSubmit = this.deleteSubmit.bind(this);
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
            console.log("woc666");
            list.splice(0,list.length);
            for(let i in data){
                let l = [];
                l.push(data[i].id);
                l.push(data[i].author);
                l.push(data[i].type);
                l.push(data[i].inventory);
                l.push(data[i].price);
                l.push(data[i].name);
                l.push(data[i].isbn);
                l.push(data[i].img);
                l.push(data[i].description);
                l.push(data[i].status);
                list.push(l);
            }
            this.setState({data:list});
            console.log(list);
        };
        showAllBooks({"search":null}, callback);
    }

    add =() =>{
        isAdding = true;
        addition[0] = (list[list.length - 1][0] + 1);
        for(let i = 1; i < 9; i++){
            addition[i] = "";
        }
        console.log("add book");
        let tmp = addition;
        list.push(addition);
        this.setState({
            data: list,
        });
        console.log(this.state.data);
    }

    addSubmit=()=>{
        console.log(list);
        isAdding = false;
        let json = new Object();
        json.id = addition[0];
        json.author = addition[1];
        json.type = addition[2];
        json.inventory = addition[3];
        json.price = addition[4];
        json.name = addition[5];
        json.ISBN = addition[6];
        json.img = addition[7];
        json.description = addition[8];
        json.status = addition[9];
        console.log("you put");
        const callback = (data) => {
            console.log("call  " + data);
        }
        let arr = new Array(9);
        for(let i = 0; i < 9; i++){
            arr[i] = addition[i];
        }
        console.log(arr);
        list[list.length - 1] = arr;
        this.setState({
            data: list,
        });
        console.log(this.state.data);
        manageService.manageAddBook(json, callback);
        addition.splice(0, addition.length);
    }

    deleteSubmit=(e)=>{
        const book_id = e
        console.log(book_id);

        let json = new Object();
        json.id = book_id;
        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.manageDeleteBook(json, callback);
        for(let i = 0; i < list.length; i++){
            console.log("list[i].id " + list[i][0]);
            if(list[i][0] === parseInt(book_id)){
                list.splice(i, 1);
                break;
            }
        }
        console.log("list  " + list);
        this.setState({
            data: list,
        });
    }

    handleUpdateAuthor =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.author = arr[1];
        json.change = "author";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateType =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.type = arr[2];
        json.change = "type";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateInventory =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.inventory = arr[3];
        json.change = "inventory";
        console.log("inv");

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdatePrice =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.price = arr[4];
        json.change = "price";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateName =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.name = arr[5];
        json.change = "name";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateISBN =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.ISBN = arr[6];
        json.change = "ISBN";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateImg =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.img = arr[7];
        json.change = "img";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateDescription =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.description = arr[8];
        json.change = "description";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
    }

    handleUpdateStatus =(arr)=>{
        let json = new Object();
        json.id = arr[0];
        json.status = arr[9];
        json.change = "status";

        const callback = (data) => {
            console.log("call  " + data);
        }
        manageService.updateBook(json, callback);
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

    showEditor = (e) => {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    };

    render = () => {
        return (
            <div className="manageMain">
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
                <div style={{width:200}}>
                    <Search
                        placeholder="输入删除书籍的ID"
                        allowClear
                        enterButton="删除"
                        size="large"
                        onSearch={(e)=>this.deleteSubmit(e)}
                    />
                </div>
                <table  border={"1"}>
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
                    <tbody >
                    {this.renderSearch()}
                    {this.renderToolbar()}
                    {this.state.data.map(function (row, rowidx) {
                        return (
                            console.log("row"),
                                console.log(row),
                            <tr key={rowidx}>{
                                row.map(function (cell, idx) {
                                    let content = cell;
                                    let edit = this.state.edit;
                                    if (edit && edit.row === rowidx && edit.cell === idx) {
                                        content = (
                                            <form onSubmit={this.save}>
                                                <Input type="text" defaultValue={cell} onPressEnter={
                                                    event=>{
                                                        {
                                                            console.log("modify row  " + edit.row);
                                                            console.log(event.target.value);
                                                            let index = edit.row;
                                                            let tmpID = list[index][0];
                                                            list[edit.row][edit.cell] = event.target.value;
                                                            console.log("Now it is,  ",list[edit.row][edit.cell]);
                                                            console.log(list[edit.row][edit.cell]);

                                                            if(edit.cell === 0){
                                                                list[index].id = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    let arr = list[index];
                                                                    let json = new Object();
                                                                    json.id = arr[0];
                                                                    json.author = arr[1];
                                                                    json.name= arr[5];
                                                                    json.change = "id";
                                                                    const callback = (data) => {
                                                                        console.log("call  " + data);
                                                                        if(data === -1){
                                                                            window.alert("id不可重复，请立即还原为" + tmpID + "!")
                                                                        }
                                                                    }
                                                                    manageService.updateBook(json, callback);
                                                                }
                                                            }
                                                            if(edit.cell === 1){
                                                                console.log("list[index][0]  " +list[index][1]);
                                                                list[index][1] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdateAuthor(list[index]);
                                                                }
                                                            }
                                                            if(edit.cell === 2){
                                                                list[index][2] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdateType(list[index]);
                                                                }
                                                            }
                                                            if(edit.cell === 3){
                                                                list[index][3] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdateInventory(list[index]);
                                                                }
                                                            }
                                                            if(edit.cell === 4){
                                                                list[index][4] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdatePrice(list[index]);
                                                                }
                                                            }
                                                            if(edit.cell === 5){
                                                                list[index][5] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdateName(list[index]);
                                                                }
                                                            }
                                                            if(edit.cell === 6){
                                                                list[index][6] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdateISBN(list[index]);
                                                                }
                                                            }
                                                            if(edit.cell === 7){
                                                                list[index][7] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdateImg(list[index]);
                                                                }
                                                            }
                                                            if(edit.cell === 8){
                                                                list[index][8] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdateDescription(list[index]);
                                                                }
                                                            }
                                                            if(edit.cell === 9){
                                                                list[index][9] = event.target.value;
                                                                if(isAdding !== true || edit.row + 1!== list.length){
                                                                    this.handleUpdateStatus(list[index]);
                                                                }
                                                            }
                                                            console.log(list[index]);
                                                        }
                                                    }
                                                }/>
                                            </form>
                                        );
                                        console.log(edit);
                                    }
                                    if(idx != 0) {
                                        return <td key={idx} data-row={rowidx}
                                                   onDoubleClick={this.showEditor}>{content}</td>;
                                    }
                                    else{
                                        return <td key={idx} data-row={rowidx}>{content}</td>;
                                    }
                                }, this)}
                            </tr>
                        );
                    }, this)}
                    </tbody>
                </table>

                <div>
                    <div className="addBook">
                        <Button type="primary" onClick={onClick=>
                        {
                            this.add();
                        }}>增加书籍</Button>
                    </div>
                    <div className="addBookSubmit">
                        <Button type="primary" onClick={onClick=>
                        {
                            this.addSubmit();
                        }}>确认添加</Button>
                    </div>
                </div>
                <div className="clearFloat"></div>
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

export class ManageList extends React.Component{
    render(){
        return(
            React.createElement(Excel, {
                headers: headers,
                initialData: []
            })
        );
    }
}


export default ManageList;
