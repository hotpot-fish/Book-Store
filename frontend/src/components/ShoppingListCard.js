import React from 'react';
import {Card, Row, Col, Checkbox, List} from 'antd';
import "../css/shoppingCart.css"
import NumberBox from "./NumberBox";
import ShoppingList from "./ShoppingList";
import {Link} from "react-router-dom";
import CartBuy from "./CartBuy";
import Check from "./Check";

const { Meta } = Card;

/*function onChange(e) {
    console.log(`checked = info.name`);
}*/

export class ShoppingListCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            total: global.totalmoney,
        }
    }

    componentDidMount() {
        console.log("woc");

    }

    render() {
        const {info} = this.props;
        return (
            <Row>
                <Col span={16}>
                    <CartBuy info={info}/>
                </Col>
                <Col span={8}>
                    <div className="cartCheck">
                        <Check callback={this.props.callback} info={info}/>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ShoppingListCard;

