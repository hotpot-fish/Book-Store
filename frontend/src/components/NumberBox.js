import React from 'react';
import '../css/shoppingCart.css'

class NumberBox extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count: 0
        }
    }

    render(){
        const {info} = this.props;
        return (
            <div>
                <button onClick={onSub=> {
                    this.setState(prevState=>{
                        return {
                            count: prevState.count>0?prevState.count-1:0
                        };
                    });
                    if(this.state.count > 0)
                        info.number = this.state.count - 1;
                    else
                        info.number = 0;
                    console.log(info.number)
                    this.props.callback(info.number);
                }}size={"small"}>-</button>
                <span>{this.state.count}</span>
                <button onClick={tonAdd=>{
                    this.setState({
                        count:this.state.count+1
                    });
                    info.number = this.state.count + 1;
                    console.log(info.number);
                    this.props.callback(info.number);
                }}size={"small"}>+</button>
            </div>
        )
    }
}

export default NumberBox;