import React from 'react';
import '../css/detail.css'
import '../css/search.css'
import {OrderDetail} from "../components/OrderDetail";
import {HeaderInfo} from "../components/HeaderInfo";

class OrderView extends React.Component{
    constructor(props) {
        super(props);

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
        console.log(this.state.id);
        return(
            <div>
                <div>
                    <HeaderInfo/>
                </div>
                <div  className="detail-layout">
                    <div className="home-content" >
                        <OrderDetail info={ this.state.id } />
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderView;