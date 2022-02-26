import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../css/login.css';
import * as userService from '../services/userService'

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                userService.login(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="field-group">
                    <Form.Item>
                        <div  className="retract">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    placeholder="用户名"
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
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    type="password"
                                    placeholder="密码"
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

                    <div></div>
                    <Link to={'/RegisterView'}> 注册</Link>
                    <a className="login-form-forgot" href="">
                        忘记密码
                    </a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm


