import React from 'react';
import { Card } from 'antd';
import "../css/index.css"
import {Link } from 'react-router-dom';
const { Meta } = Card;

export class Book extends React.Component{
    render() {
        const {info} = this.props;
        console.log(info.author);
        return (
            <div>
                <Link to={{pathname:'/BookView', search: "?id=" + info.id}}
                      target = "_blank">
                    <Card
                        hoverable
                        style={{width: 200}}
                        cover={<img alt="image" src={info.img} className={"img"}/>}
                        className="home-cart-grid"
                    >
                        <Meta title={
                            <div>
                                <span style={{display:"block"}}>{info.name}</span>
                                <span style={{color:"#A9A9A9",fontSize:13}}>{info.author}</span>
                            </div>
                        }
                              description={<span style={{fontSize:20}}>{'¥' + info.price}</span>}/>
                    </Card>
                </Link>
            </div>
        );
    }
}

