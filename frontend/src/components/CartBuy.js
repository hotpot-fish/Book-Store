import React from 'react';
import {Card, Row, Col} from 'antd';
import "../css/shoppingCart.css"
import {Link} from "react-router-dom";

const { Meta } = Card;



export class CartBuy extends React.Component{
    constructor(props){
        super(props);
        this.state={
            total: global.totalmoney,
        }
    }

    render() {
        const {info} = this.props;
        return (
            console.log("got id    "+info.item_id),
                <Link to={{pathname:'/BookView', search: "?id=" + info.book_id}}
                      target = "_blank">
                    <Card
                        hoverable
                        style={{width: 1200,marginLeft:100}}
                        //onClick={this.showBookDetails.bind(this, info.bookId)}
                        className="cart-grid"
                    >
                        <Row>
                            <Col span={5}>
                                {<img alt="image" src={info.img} className={"cart-book-img"}/>}
                            </Col>
                            <Col span={5}>
                                <div  className="book-name">
                                   <span> {info.name}</span>
                                </div>

                            </Col>
                            <Col span={4}>
                                <div  className="single-price">
                                    <span style={{fontSize:28,color:"#FF0000"}}>{'¥' + info.price}</span>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Link>
        );
    }
}

export default CartBuy;

