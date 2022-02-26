import React from 'react';
import  '../css/submit.css';
import {HeaderInfo} from "../components/HeaderInfo";
import SubmitForm from "../components/SubmitForm"

class SubmitView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({user:user});
    }
    render(){
        return(
            <div className="submit-bg">
                <div>
                    <HeaderInfo/>
                </div>
                <div className="submit-box">
                    <SubmitForm/>
                </div>
            </div>
        )
    }
}

export default SubmitView;