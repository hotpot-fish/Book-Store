import React from 'react';
import {Link } from 'react-router-dom';
import { Row, Col, Menu, Input } from 'antd';
import '../css/header.css'
import './config'
import logo from '../assets/logo1.png';


export class HeaderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username:[],
            usertype:[],
        };
    }
    componentDidMount(){
        let username = localStorage.getItem("user_name");
        let usertype = localStorage.getItem("user_type");
        this.setState({username:username,usertype:usertype});
    }
    renderhead() {
        if(this.state.usertype==0)
            return (
                <div>
                    <div className="header">
                        <Row>
                            <Col span = {5}>
                                <a id="logo" href={"/"}>
                                    <img alt="logo"  className="logo" src={logo} style={{ height:45 }}/>
                                </a>
                            </Col>
                            <span style={{fontSize:13,position: "absolute",
                                bottom: 2,}} >
                                    管理员，您好！
                            </span>
                            <Menu theme="light" mode="horizontal" style={{float:"right"}}>
                                <Menu.Item key="3">
                                    <Link to={'/ManageView'}>
                                        <div>
                                            管理
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <Link to={'/UserStatisticsView'}>
                                        <div>
                                            统计
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="9">
                                    <Link to={'/ChatroomView'}>
                                        <div>
                                            聊天室
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <Link to={'/LoginView'}>
                                        <div>
                                            登出
                                        </div>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Row>

                    </div>
                    <div className="banner_red_top"></div>
                </div>
            );
        if(this.state.usertype==1)
            return (
                <div>
                    <div className="header">
                        <Row>
                            <Col span = {5}>
                                <a id="logo" href={"/"}>
                                    <img alt="logo"  className="logo" src={logo} style={{ height:45 }}/>
                                </a>
                            </Col>
                                <span style={{fontSize:13,position: "absolute",
                                    bottom: 2,}} >
                                    亲爱的用户，您好！
                                </span>
                            <Menu theme="light" mode="horizontal" style={{float:"right"}}>
                                <Menu.Item key="2">
                                    <Link to={'/ShoppingCartView'}>
                                        <div>
                                            购物车
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to={'/UserOrderView'}>
                                        <div>
                                            订单
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to={'/BookStatisticsView'}>
                                        <div>
                                            已购书籍
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="9">
                                    <Link to={'/ChatroomView'}>
                                        <div>
                                            聊天室
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <Link to={'/LoginView'}>
                                        <div>
                                            退出登录
                                        </div>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Row>

                    </div>
                    <div className="banner_red_top"></div>
                </div>
            );
    }
    render(){
        return(
            this.renderhead()
        );
    }
}