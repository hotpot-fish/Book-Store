import React from 'react';
import {Link } from 'react-router-dom';
import {List, Button} from 'antd'
import {Book} from './Book'
import "../css/index.css"
import {getBooks, searchBooks} from "../services/bookService";
import eventProxy from "../utils/eventProxy";

export class BookList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            page: 0,
            pageable: 0,
            isSearching: false,
            searchPages: 0,
            keyWord: "",
        };
    }

    listPageBooks=()=>{
        const callback = (data) => {
            let list = data.content;
            let result = [];
            for(let i = 0; i < list.length; i++){
                if(list[i].status === 1){
                    result.push(list[i]);
                }
            }
            this.setState({
                books:result,
                pageable: data
            });
        };
        let json = {
            page: this.state.page
        };

        getBooks(json, callback);
    }

    componentDidMount() {
        this.listPageBooks();
        eventProxy.on('search', json => {
            console.log(json);
            this.setState({
                books: json.searchResult,
                searchPages: json.totalPages,
                keyWord: json.keyWord,
                isSearching: true,
            })
        })
    }

    componentWillUnmount() {
        eventProxy.off('search', '');
    }

    doSearch=()=>{
        let json = {
            keyWord: this.state.keyWord,
            page: this.state.page
        }
        let callback = data =>{
            eventProxy.trigger("search", data)
        }
        searchBooks(json, callback);
    }

    goLastPage=() =>{
        if(this.state.page > 0) {
            this.state.page -= 1;
            console.log(this.state.page);
            if(!this.state.isSearching) {
                this.listPageBooks();
            }
            else{
                this.doSearch();
            }
        }
        else{
            window.alert("已达首页！");
        }
    }

    goNextPage=() =>{
        if(!this.state.isSearching) {
            if(this.state.page < this.state.pageable.totalPages - 1) {
                this.state.page += 1;
                console.log(this.state.page);
                this.listPageBooks();
            }
            else{
                window.alert("已达尾页！");
            }
        }
        else{
            if(this.state.page < this.state.searchPages - 1) {
                this.state.page += 1;
                console.log(this.state.page);
                this.doSearch();
            }
            else{
                window.alert("已达尾页！");
            }
        }
    }

    render() {
        return (
            console.log("this.state.books"),
                console.log(this.state.books),
                <div>
                    <div>
                        <List
                            grid={{gutter:10, column: 4}}
                            dataSource={this.state.books}
                            renderItem={item => (
                                <List.Item>
                                    <Book info={item}/>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className="pageButton">
                        <p>
                            <Button onClick={this.goLastPage}>上一页</Button>
                            当前<span>{this.state.page + 1}</span>页,总
                            <span>
                                {this.state.isSearching ? this.state.searchPages : this.state.pageable.totalPages}
                            </span>页
                            <Button onClick={this.goNextPage}>下一页</Button>
                        </p>
                    </div>
                </div>
        );
    }
}
