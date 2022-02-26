import React from 'react';
import {HeaderInfo} from "../components/HeaderInfo";
import {ShoppingList} from "../components/ShoppingList";
import {Layout} from "antd";
const { Header, Content, Footer } = Layout;

class shoppingCartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items:null};
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    render(){
        return(
        <Layout className="layout">
            <HeaderInfo />
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <ShoppingList />
                    <br></br>
                    <br></br>
                </Content>
            </Layout>
        </Layout>
        )
    }
}

export default shoppingCartView;