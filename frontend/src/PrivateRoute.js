import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "./services/userService"
import {message} from "antd";

export default class PrivateRoute extends React.Component{
    constructor(props) {
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
            console.log("ccdata    " +data);
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
            console.log("no"),
                this.state.isAuthed ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: {from: props.location}
                    }}/>
                )
        )}/>
    }
}

