import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css';
import * as userService from '../services/userService'
import * as cartService from '../services/cartService'
import {history} from "../utils/history";

class RegisterForm extends React.Component {
    handleid = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
    {
                    const callback = (data1) => {
                        console.log(data1, typeof data1);
                        if(data1 == true){
                            window.alert("用户名重复！");
                            document.getElementsByName('id');
                        }
                    };
                    let json = new Object();
                    json.username = values.username;
                    userService.findNameDup(json, callback);
                }
        });
    };
    handlepassword = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            {
                const callback = (data1) => {
                    console.log(data1, typeof data1);
                    if(data1 == true){
                        window.alert("用户名重复！");
                    }
                };
                let json = new Object();
                json.username = values.username;
                userService.findNameDup(json, callback);
                if(values.password !== values.password2){
                    document.getElementsByName('password2');
                    window.alert("两次输入的密码不一致！");
                }
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.password !== values.password2){
                    window.alert("两次输入的密码不一致！");
                }
                else{
                    const callback = (data1) => {
                        console.log(data1, typeof data1);
                        if(data1 == true){
                            window.alert("用户名重复！");
                        }
                        else{
                            const callback = (data) => {
                                console.log(data, typeof data);
                                let json2 = new Object();
                                json2.user_id = data.toString();
                                console.log(json2.user_id);
                                cartService.createCart(json2);
                            };
                            userService.register(values, callback);
                            window.alert("您已成功注册，请返回登录界面！");
                        }
                    };
                    let json = new Object();
                    json.username = values.username;
                    userService.findNameDup(json, callback);
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const validateMessages = {
            required: '${label} is required!',
            types: {
                password1:'password is required!',
                password2:'password is required!',
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
        };
        return (
            <Form  validateMessages={validateMessages} onSubmit={this.handleSubmit} className="login-form">
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('username', {
                                rules:[{ required: true }],
                            })(
                                <Input
                                    name="id"
                                    placeholder="输入用户名"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                    onBlur={this.handleid}
                                />,
                            )}
                        </div>
                    </Form.Item>
                </div>
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('password', {
                                rules:[{ required: true }],
                            })(
                                <Input
                                    type="password"
                                    placeholder="请输入密码"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                />,
                            )}
                        </div>
                    </Form.Item>
                </div>
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('password2', {
                                rules:[{ required: true }],
                            })(
                                <Input
                                    name="password2"
                                    type="password"
                                    placeholder="确认密码"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                    onBlur={this.handlepassword}
                                />,
                            )}
                        </div>
                    </Form.Item>
                </div>
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('email', {
                                rules:[{ type: 'email' ,required: true }]})(
                                <Input
                                    type="email"
                                    placeholder="输入邮箱"
                                    size={"large"}
                                    style={{ width: '130%' }}
                                />,
                            )}
                        </div>
                    </Form.Item>
                </div>
                <Form.Item className="check">
                    <Button type="primary" htmlType="submit" shape={"round"} style={{width:150,marginLeft:70}}>
                        确认
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(RegisterForm);

export default WrappedLoginForm


