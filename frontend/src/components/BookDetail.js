import React from 'react';
import { Button } from 'antd';
import {Link } from 'react-router-dom';
import {CartBuy} from './CartBuy'
import './config';
import * as cartService from "../services/cartService";
import * as orderService from "../services/orderService";

export class BookDetail extends React.Component{
    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    handleSubmit = e => {
        e.preventDefault();
        let num = 1;
        let user_id = this.state.user;
        let json = new Object();
        json.id = this.props.info.id;
        json.user_id = user_id;
        console.log(json.price);
        const callback = (data) => {
            console.log("callback " + data);
            if(data === false){
                window.alert("不可重复添加！");
            }
            else{
                window.alert("已成功添加！");
            }
        };
        cartService.addItem(json, callback);
    };

    handleClick2 = e =>{
        //e.preventDefault();
        let user_id = this.state.user;
        let json = new Object();
        json.user_id = user_id;
        json.totalmoney = this.props.info.price;
        json.book_id = this.props.info.id;
        json.num = 1;
        const callback = (data) => {
            console.log("call  " + data);
        }
        orderService.addOrderOne(json, callback);
    }

    render() {
        global.totalmoney = 0;
        global.buy =[];
        const {info} = this.props;
        if(info == null){
            return null;
        }
        console.log("ccc " + info);
        console.log("ccc " + info.id);

        info.number = 0;
        const addition={
            card:<CartBuy info={info}/>,
            information: info
        }

        return (
            <div style={{marginTop:70}}>
                    <section style={{float:"left" ,width:600,marginLeft:-60}}>
                        <div>
                            <img  alt="image" src={info.img} style={{width:"400px", height:"400px"}}/>
                        </div>
                    </section>
                    <section style={{float:"right",width:600,marginRight:90,marginTop:40}}>
                            <span style={{display:"block",fontSize:30}}>{info.name}</span>
                            <span style={{display:"block",fontSize:16}}>作者：{info.author}</span>
                        <span style={{display:"block",fontSize:18,width:350}}>{info.description}</span>
                        <span style={{display:"block",fontSize:16,color:"#FFA500"}}>有货 库存{info.inventory}件</span>
                            <span style={{display:"block",fontSize:34,color:	"#FF0000"}}>{'¥' + info.price}</span>

                        <br></br>

                        <br></br>
                        <div>
                            <Button type="danger" icon="shopping-cart" size={"large"}
                                    htmlType="submit" onClick={this.handleSubmit}
                            >
                                加入购物车
                            </Button>

                            <Link to={'/SubmitView'}>
                                <Button type="danger" icon="pay-circle" size={"large"} style={{marginLeft:"15%"}}ghost
                                        onClick={onclick=>{
                                            info.num = 1;
                                            global.totalmoney = info.price;
                                            global.buy.push(info);
                                            this.handleClick2();
                                        }}
                                >
                                    立即购买
                                </Button>
                            </Link>
                        </div>
                </section>
            </div>
        )
    }
}