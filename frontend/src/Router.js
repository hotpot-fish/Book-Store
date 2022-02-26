import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LoginRoute from  './LoginRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import {history} from "./utils/history";
import BookView from "./view/BookView";
import ShoppingCartView from "./view/ShoppingCartView";
import SubmitView from "./view/SubmitView";
import ManageView from "./view/ManageView";
import ManageUserView from "./view/ManageUserView";
import ManageOrderView from "./view/ManageOrderView";
import OrderView from "./view/OrderView";
import UserOrderView from "./view/UserOrderView";
import BookStatisticsView from "./view/BookStatisticsView";
import UserStatisticsView from "./view/UserStatisticsView";
import RegisterView from "./view/RegisterView";
import ChatroomView from "./view/ChatroomView";

class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <LoginRoute exact path='/' component={LoginView}/>
                    <PrivateRoute exact path='/HomeView' component={HomeView}/>
                    <Route exact path='/BookView' component={BookView}/>
                    <Route exact path='/ShoppingCartView' component={ShoppingCartView}/>
                    <Route exact path='/LoginView' component={LoginView}/>
                    <Route exact path='/SubmitView' component={SubmitView}/>
                    <Route exact path='/ManageView' component={ManageView}/>
                    <Route exact path='/ManageUserView' component={ManageUserView}/>
                    <Route exact path='/ManageOrderView' component={ManageOrderView}/>
                    <Route exact path='/OrderView' component={OrderView}/>
                    <Route exact path='/UserOrderView' component={UserOrderView}/>
                    <Route exact path='/ChatroomView' component={ChatroomView}/>
                    <Route exact path='/BookStatisticsView' component={BookStatisticsView}/>
                    <Route exact path='/UserStatisticsView' component={UserStatisticsView}/>
                    <Route exact path='/UserStatisticsView' component={UserStatisticsView}/>
                    <Route exact path='/RegisterView' component={RegisterView}/>
                </Switch>
            </Router>
        )
    }
}

export default BasicRoute;