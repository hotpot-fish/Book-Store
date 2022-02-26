import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "./services/userService"
import {message} from "antd";

export class LoginRoute extends React.Component{
    constructor(props) {
        console.log("begin");
        super(props);
        this.state = {
            isAuthed: global.isAu
        };
    }

    checkAuth = (data) => {
        console.log("routedata    " +data);
        if (data == true) {
            global.isAu = true;
            this.setState({isAuthed: global.isAu});
        } else {
            //localStorage.removeItem('user');
            this.setState({isAuthed: global.isAu});
        }
    };


    componentDidMount() {
        userService.checkSession(this.checkAuth);
    }


    render() {

        const {component: Component, path="/HomeView",exact=false,strict=false} = this.props;

        console.log(this.state.isAuthed);


        return <Route path={path} exact={exact} strict={strict} render={props => (
            console.log("yes  " + this.state.isAuthed),
                this.state.isAuthed ? (
                    console.log("ccccc  " + this.state.isAuthed),
                        <Redirect to={{
                            pathname: '/HomeView',
                            state: {from: props.location}
                        }}/>
                ) : (
                    <Component {...props}/>
                )
        )}/>
    }
}

export default LoginRoute