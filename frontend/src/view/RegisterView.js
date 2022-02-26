import React from 'react';
import RegisterForm from "../components/RegisterForm";
import {Link} from "react-router-dom";
import {Menu} from "antd";

class LoginView extends React.Component{
    render(){
        return(
            <div className="main">
                <div>
                    <span style={{fontSize:30,color:'#F0FFFF',textAlign:"center",display:"block"}}>注册</span>
                    <span style={{fontSize:15,color:'#F0FFFF',textAlign:"right",display:"block"}}>
                        <Link to={'/LoginView'}>
                          返回
                        </Link>
                    </span>
                </div>
                <div className="login-content">
                    <div className="content-bottom">
                        <RegisterForm/>
                    </div>
                </div>
            </div>
        );

    }
}

export default LoginView;