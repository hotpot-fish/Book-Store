import React from 'react';
import LoginForm from "../components/LoginForm";

class LoginView extends React.Component{
    render(){
        return(
            <div className="main">
                <div className="bottom-grid">
                    <div className="logo">
                        <h1> 登录</h1>
                    </div>
                </div>
                <div className="login-content">
                    <div className="content-bottom">
                        <LoginForm/>
                    </div>

                </div>
            </div>
        );

    }
}

export default LoginView;