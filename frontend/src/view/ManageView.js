import React from 'react';
import {HeaderInfo} from "../components/HeaderInfo";
import ManageList from "../components/ManageList";
import "../css/manage.css"
import { Tabs } from 'antd';
import UserManageList from "../components/UserManageList";
import OrderList from "../components/OrderList";

const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
class ManageView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }
    render(){
        return(
            <div className="manageBack">
                <div>
                    <HeaderInfo/>
                </div>
                <div>

                </div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="图书管理" key="1">
                        <ManageList/>
                    </TabPane>
                    <TabPane tab="用户管理" key="2">
                        <UserManageList/>
                    </TabPane>
                    <TabPane tab="订单管理" key="3">
                        <OrderList/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default ManageView;