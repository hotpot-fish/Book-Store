import React from 'react';
import { Form, Input, Button, Checkbox, Table, Col, Row, Radio } from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import {Link} from "react-router-dom";
import * as orderService from "../services/orderService";
import * as cartService from "../services/cartService";

let dataSource = [];
function add(){
    for(var i = 0; i < global.buy.length; i++){
        let isFind = false;
        let price = global.buy[i].price, num = global.buy[i].num;
        let total = price * num;
        for(let j = 0; j < dataSource.length; j++){
            if (dataSource[j].name == global.buy[i].name){
                isFind = true;
                dataSource.splice(j, 1, {
                    name: global.buy[i].name,
                    description: global.buy[i].description,
                    price: global.buy[i].price,
                    num: global.buy[i].num,
                    total: total
                })
                console.log("name:"+ global.buy[i].name+
                    "description: "+global.buy[i].description+
                    "price: "+global.buy[i].price+
                    "num:"+ global.buy[i].num+
                    "total: "+total)
                break;
            }
        }
        if(isFind == false) {
            dataSource.push({
                name: global.buy[i].name,
                description: global.buy[i].description,
                price: global.buy[i].price,
                num: global.buy[i].num,
                total: total
            });
        }
    }
}
const columns = [
    {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '信息',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
    },
    {
        title: '小计',
        dataIndex: 'total',
        key: 'total',
    },
]


class SubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0,
            username:[],
        }
        let user = localStorage.getItem("user");
        console.log("user  " + user + typeof user);
        this.state.user = parseInt(user);
        console.log("user  " + this.state.user);
    }
    componentDidMount(){
        let username = localStorage.getItem("username");
        this.setState({username:username});
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleClick2 = e =>{
        //e.preventDefault();
        let user_id = this.state.user;
        console.log("suadaw  " +user_id);
        let json = new Object();
        json.user_id = user_id;
        json.totalmoney = global.totalmoney;
        json.books = global.checked;
        const callback = () => {
            console.log("submit");
        }
        orderService.addOrder(json, callback);
        let json2 = new Object();
        let delArray = [];
        for(let i = 0; i < global.checked.length; i++){
            let book_id = global.buy[i].book_id;
            console.log("global.buy[i]  " + book_id);
            console.log(global.buy);
            delArray.push(book_id);
        }
        json2.id = delArray;
        json2.user_id = user_id;
        const callback2 = (data) => {
            console.log("call  " + data);
        }
        cartService.deleteItem(json2, callback2);
    }

    // handleClick = e =>{
    //     console.log("submit!");
    //     window.alert("您已成功提交订单！");
    // }


    render() {
        dataSource=[];
        console.log("buy", global.buy);
        add();
        console.log(dataSource);

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="deliver-form">
                    <span style={{fontSize:20}}>
                        用户:{this.state.username}
                    </span>
                </div>
                <div className="showTable">
                    <Table dataSource={dataSource} columns={columns} />
                            <div className="submit-total">
                                合计：<span className="total">￥{global.totalmoney}</span>
                            </div>
                            <div className="submit-button">
                                <Row>
                                    <Col span={11}>
                                        <Link  to={'/ShoppingCartView'}>
                                            <Button>返回购物车</Button>
                                        </Link>
                                    </Col>
                                    <Col span={11} offset={2}>
                                        <Button onClick={handleClick=>{
                                            console.log("submit!");
                                            window.alert("您已成功提交订单！");
                                            this.handleClick2();
                                        }
                                        }>提交订单</Button>
                                    </Col>
                                </Row>
                            </div>
                </div>
            </div>
        );
    }
}

const WrappedSubmitForm = Form.create({ name: 'normal_login' })(SubmitForm);

export default WrappedSubmitForm
