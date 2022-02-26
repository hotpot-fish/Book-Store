import React from 'react';
import "../css/index.css"
import '../css/search.css'
import {SearchBar} from '../components/SearchBar'
import {Layout, Carousel} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import Chatroom from "../components/Chatroom";
const { Header, Content, Footer } = Layout;
class ChatroomView extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }

    render(){
        return(
            <Layout className="layout">
                <HeaderInfo />
                <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <div className="home-content">
                            <div className={"foot-wrapper"}>
                                <Chatroom/>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default ChatroomView;