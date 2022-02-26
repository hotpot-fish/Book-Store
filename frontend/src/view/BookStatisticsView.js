import React from 'react';
import '../css/detail.css'
import '../css/search.css'
import {BookStatisticsList} from "../components/BookStatisticsList";
import {HeaderInfo} from "../components/HeaderInfo";

class BookStatisticsView extends React.Component{
    constructor(props) {
        super(props);
        console.log(11);

        this.state = {order_items:null};
    }

    componentWillMount(){
        let user = localStorage.getItem("user");
        this.setState({user:user});
        const query = this.props.location.search;
        const arr = query.split('&');
        const order_id = arr[0].substr(4);
        console.log("order_id  " + order_id);
        this.setState({ id: order_id});
    }

    render(){
        console.log("this.state.info");
        return(
            <div>
                <div>
                    <HeaderInfo/>
                </div>
                <div  className="detail-layout">
                    <div className="home-content">
                        <BookStatisticsList info={ this.state.id } />
                    </div>
                </div>
            </div>
        );
    }
}

export default BookStatisticsView;