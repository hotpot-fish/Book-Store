import React from 'react';
import '../css/detail.css'
import '../css/search.css'
import {UserStatisticsList} from "../components/UserStatisticsList";
import {HeaderInfo} from "../components/HeaderInfo";
import {BookStatisticsList} from "../components/BookStatisticsList";

class UserStatisticsView extends React.Component{
    constructor(props) {
        super(props);
        console.log(11);

        this.state = {order_items:null};
    }

    componentWillMount(){
        console.log("wad");
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
                        <h2 style={{marginLeft:350,marginTop:30}}>用户统计</h2>
                        <UserStatisticsList info={ this.state.id } />
                        <h2 style={{marginLeft:350,marginTop:30}}>图书统计</h2>
                        <BookStatisticsList info={ this.state.id } />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserStatisticsView;