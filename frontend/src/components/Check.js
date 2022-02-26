import React from 'react';
import {Row, Col, Checkbox } from 'antd';
import "../css/shoppingCart.css"
import "./config"

export class Check extends React.Component {
    constructor(props){
        super(props);
        this.state={
            total: global.totalmoney,
            count: 1,
            isChecked: false,
        }
        global.totalmoney = 0;
    }

    render() {
        const {info} = this.props;
        info.num = this.state.count;
        return(
            <div style={{marginRight:150}}>
                <Row>
                    <Col span={16}>
                        <div>
                            <button onClick={onSub=> {
                                var pastCount = this.state.count;
                                this.setState(prevState=>{
                                    return {
                                        count: prevState.count>0?prevState.count-1:0
                                    };
                                });
                                if(this.state.count > 0)
                                    info.num = this.state.count - 1;
                                else
                                    info.num = 0;
                                console.log(info.num);
                                if(this.state.isChecked === true && this.state.count > 0){
                                    if(pastCount < info.num) {
                                        global.totalmoney += info.price;
                                    }
                                    else{
                                        global.totalmoney -= info.price;
                                    }
                                    this.props.callback(global.totalmoney);
                                }
                            }}size={"small"}>-</button>
                            <span>{this.state.count}</span>
                            <button onClick={tonAdd=>{
                                var pastCount = this.state.count;
                                this.setState({
                                    count:this.state.count+1
                                });
                                info.num = this.state.count + 1;
                                console.log("info.number  ", info.num);
                                if(this.state.isChecked === true){
                                    if(pastCount < info.num) {
                                        global.totalmoney += info.price;
                                    }
                                    else{
                                        global.totalmoney -= info.price;
                                    }
                                    this.props.callback(global.totalmoney);
                                }
                                //console.log(this.state.count);
                            }}size={"small"}>+</button>
                        </div>
                    </Col>
                    <Col span={8}>
                        <Checkbox defaultChecked ={false} onChange={
                            summ=>{
                                console.log("awadawd");
                                console.log(this.checked);
                                let i;
                                if(this.state.isChecked === true){
                                    this.setState({isChecked: false});
                                    if(global.checked.length !== 0) {
                                        console.log("global.checked   " + global.checked.length);
                                        console.log(global.checked);
                                        global.totalmoney -= (info.price * global.checked[0].num);
                                        global.checked.splice(i, 1);
                                        console.log(global.totalmoney);
                                        console.log("删除");
                                        this.setState({total: global.totalmoney});
                                        console.log("现价  ", this.state.total);
                                        this.props.callback(global.totalmoney);
                                    }
                                }

                                if(this.state.isChecked === false){
                                    this.setState({isChecked: true});
                                    global.totalmoney += (info.price * info.num);
                                    console.log("price: " + info.price + "  num: " + info.num);
                                    console.log("info.number  ",info.num);
                                    global.checked.push(info);
                                    console.log("the number  ", global.checked);
                                    console.log(global.totalmoney);
                                    console.log("添加");
                                    this.setState({total: global.totalmoney});
                                    console.log("现价  ", this.state.total);
                                    this.props.callback(global.totalmoney);
                                }
                                console.log("totalMoney!!!");
                                console.log(global.totalmoney);
                            }
                        }>
                        </Checkbox>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Check;

