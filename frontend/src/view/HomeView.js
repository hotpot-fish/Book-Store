import React from 'react';
import "../css/index.css"
import '../css/search.css'
import {Layout} from 'antd'
import {HeaderInfo} from "../components/HeaderInfo";
import Chatroom from "../components/Chatroom";
import {Input} from "antd";
import {searchBooks} from "../services/bookService";
import eventProxy from "../utils/eventProxy";
import SearchBox from "../components/SearchBar";
import {BookList} from "../components/BookList";
const { Content } = Layout;
const { Search } = Input;
class HomeView extends React.Component{
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
                            <div className="descriptionSearchInput">
                                <Search
                                    placeholder={"请输入书籍关键词，我们将使用全文搜索"}
                                    size="large"
                                    enterButton="Search"
                                    onSearch={value=>{
                                        let json = {
                                            keyWord: value,
                                            page: 1
                                        }
                                        let callback = data =>{
                                            data.keyWord = value;
                                            eventProxy.trigger("search", data)
                                        }
                                        searchBooks(json, callback);
                                    }}
                                />
                                <SearchBox></SearchBox>
                            </div>
                            <BookList/>
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

export default HomeView;