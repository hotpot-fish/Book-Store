import React from 'react';
import {List, Button} from 'antd';
import {Link } from 'react-router-dom';
import ShoppingListCard from "./ShoppingListCard";
import './config';
import {getItems} from "../services/cartService";
import * as cartService from "../services/cartService";

export class ShoppingList extends React.Component{
    delArray = [];
    isChanged = true;

    callback=(total)=>{
        this.setState({total});
    }

    handleClick = e =>{
        //e.preventDefault();
        let user_id = this.state.user;
        let json = new Object();
        json.id = this.delArray;
        json.user_id = user_id;
        const callback = (data) => {
            console.log("call  " + data);
        }
        cartService.deleteItem(json, callback);
    }

    constructor(props) {
        super(props);
        global.totalmoney = 0;
        global.buy =[];
        global.checked =[];
        console.log("已清空", global.buy);
        this.state = {
            total: global.totalmoney,
            items:[],
            user: 0,
        }
        let user = localStorage.getItem("user");
        console.log("user  " + user + typeof user);
        this.state.user = parseInt(user);
        console.log("user  " + this.state.user);
    }

    componentDidMount() {
        const callback = (data) => {
            this.setState({items:data});
            console.log(data);
        }
        this.timerID = setInterval(
            () => {
                if(this.isChanged == true) {
                    let user_id = this.state.user;
                    let json = new Object();
                    json.user_id = user_id;
                    console.log("suadaw  " +this.state.user);
                    getItems(json, callback);
                    this.setState({dataSource: this.state.items});
                    this.isChanged = false;
                    global.buy =[];
                    global.checked =[];
                }
            },
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                    <span style={{fontSize:30 ,color:"#778899"}}>购物车</span>
                <div>
                    <List
                        grid={{column: 1}}
                        dataSource={this.state.items}
                        renderItem={item => (
                            global.book.push(item),
                                <List.Item>
                                    <ShoppingListCard callback={this.callback} info={item}/>
                                </List.Item>
                        )}
                    />
                    <div>
                        <br></br>
                            <div style={{fontSize:20,float:"right",marginRight:200}}>
                                总价：<span className="cal">￥{this.state.total}</span>
                            </div>
                        <br></br>
                        <br></br>
                        <div style={{float:"left",marginLeft:300}}>
                            <Button onClick={onClick=>
                            {
                                let i, j;
                                for(j = 0; j < global.checked.length; j++) {
                                    for (i = 0; i < global.book.length; i++) {
                                        if (global.book[i].name === global.checked[j].name) {
                                            this.delArray.push(global.book[i].book_id);
                                            global.book.splice(i, 1);
                                            global.checked.splice(j, 1);
                                            j--;
                                            break;
                                        }
                                    }
                                }
                                this.handleClick();
                                this.delArray=[];
                                this.isChanged = true;
                            }}>删除</Button>
                        </div>
                        <div style={{float:"right",marginRight:300}}>
                            <Link to={'/SubmitView'}>
                                <Button onClick={onClick=>
                                {
                                    global.buy = global.checked;
                                    this.isChanged = true;
                                }}>结算</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoppingList;
