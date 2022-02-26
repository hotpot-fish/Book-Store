import React from 'react';
import '../css/detail.css'
import '../css/search.css'
import {BookDetail} from "../components/BookDetail";
import {HeaderInfo} from "../components/HeaderInfo";
import {SearchBar} from "../components/SearchBar";
import {getBook} from "../services/bookService";

class BookView extends React.Component{
    constructor(props) {
        super(props);

        this.state = {books:null};
    }

    componentDidMount(){
        let user = localStorage.getItem("user");
        console.log("user  " + user);
        this.setState({user:user});
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        console.log("???" , bookId);
        console.log(arr);
        getBook(bookId, (data) => {console.log("dwadwa  " +data.id);
            this.setState({ info: data})})
    }

    render(){
        console.log("this.state.info");
        console.log(this.state.info);
        return(
            <div>
                <div>
                    <HeaderInfo/>
                </div>
                <div  className="detail-layout">
                    <div className="home-content">
                        <BookDetail info={ this.state.info } />
                    </div>
                </div>
            </div>
        );
    }
}

export default BookView;