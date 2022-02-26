import React from 'react';
import { Card } from 'antd';
import "../css/index.css"
import {showAllBooks} from "../services/bookService";

class Chatroom extends React.Component {
    constructor(props) {
        super(props);
        this.onMessage = this.onMessage.bind(this);
        this.connect = this.connect.bind(this);
        this.sendJoin = this.sendJoin.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getTarget = this.getTarget.bind(this);
        this.cleanTarget = this.cleanTarget.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.state = {
            websocket : null,
            textarea : "",
            userlist : "",
            wsconsole : "",
            name : "",
            input : "",
            ifjoin : false
        }
        this.connect();
    }
    componentDidMount(){
        let username = localStorage.getItem("user_name");
        this.setState({name:username});
    }

    connect() {
        this.state.websocket = new WebSocket("ws://localhost:8080/websocketbot");
        this.state.websocket.onmessage = this.onMessage
    }

    /* Callback function for incoming messages
    * evt.data contains the message
    * Update the chat area, user's area and Websocket console */
    onMessage(evt) {
        let line = "";
        /* Parse the message into a JavaScript object */
        let msg = JSON.parse(evt.data);
        if (msg.type === "chat") {
            line = msg.name + ": ";
            if (msg.target.length > 0)
                line += "@" + msg.target + " ";
            line += msg.message + "\n";
            /* Update the chat area */
            this.setState({
                textarea : this.state.textarea + line
            })
        } else if (msg.type === "info") {
            line = "[--" + msg.info + "--]\n";
            /* Update the chat area */
            this.setState({
                textarea : this.state.textarea + line
            })
        } else if (msg.type === "users") {
            line = "Users:\n";
            for (let i=0; i < msg.userlist.length; i++)
                line += "-" + msg.userlist[i] + "\n";
            /* Update the user list area */
            this.setState({
                userlist : line
            })
        }
        /* Update the Websocket console area */
        this.setState({
            wsconsole : this.state.wsconsole + "-> " +  evt.data + "\n"
        })
    }

    /* Send a join message to the server */
    sendJoin() {
        let name = this.state.name;
        console.log(localStorage)
        let jsonstr;
        if (name.length > 0) {
            /* Create a message as a JavaScript object */
            let joinMsg = {type:"join", name:name};
            /* Convert the message to JSON */
            jsonstr = JSON.stringify(joinMsg);
            /* Send the JSON text */
            this.state.websocket.send(jsonstr);
            /* Update the Websocket console area */
            this.setState({
                wsconsole : this.state.wsconsole + "<- " + jsonstr + "\r\n",
                ifjoin : true
            })
        }
    }

    /* Send a chat message to the server (press ENTER on the input area) */
    sendMessage(evt) {
        let input = this.state.input
        let jsonstr;
        if (evt.keyCode === 13 && input.length > 0) {
            /* Create a chat message as a JavaScript object */
            let chatMsg = {type : "chat", name : this.state.name,
                target : this.getTarget(input.replace(/,/g, "")),
                message : this.cleanTarget(input).replace(/(\r\n|\n|\r)/gm,"")};
            /* Convert the object to JSON */
            jsonstr = JSON.stringify(chatMsg);
            /* Send the message as JSON text */
            this.state.websocket.send(jsonstr);
            /* Update the Websocket console area */
            this.setState({
                wsconsole : this.state.wsconsole + "<- " + jsonstr + "\r\n",
                input : ""
            })
        }
    }

    /* Get the @User (target) for a message */
    getTarget(str) {
        let arr = str.split(" ");
        let target = "";
        for (let i=0; i < arr.length; i++) {
            if (arr[i].charAt(0) === '@') {
                target = arr[i].substring(1,arr[i].length);
                target = target.replace(/(\r\n|\n|\r)/gm,"");
            }
        }
        return target;
    }

    /* Remove the @User (target) from a message */
    cleanTarget(str) {
        let arr = str.split(" ");
        let cleanstr = "";
        for (let i=0; i < arr.length; i++) {
            if (arr[i].charAt(0) !== '@')
                cleanstr += arr[i] + " ";
        }
        return cleanstr.substring(0,cleanstr.length-1);
    }

    updateInput(e) {
        this.setState({
            input : e.target.value
        })
    }

    render() {
        let joinButton,inputBox
        if(this.state.ifjoin){
            joinButton = null
            inputBox =
                <input className={"chatroom-input-box"} value={this.state.input} placeholder={"请输入聊天内容"} onKeyDown={this.sendMessage} onChange={this.updateInput}/>
        }
        else {
            joinButton =
                <button className={"join-button"} onClick={this.sendJoin}>加入聊天室</button>
            inputBox = null
        }
        return (
                <div>
                        {joinButton}
                        {inputBox}
                        <div>
                            <textarea readOnly={true} style={{cols:70, rows:20,height:500,width:300}} value={this.state.textarea}/>
                            <textarea readOnly={true} style={{cols:70, rows:20,height:500,width:300}} value={this.state.userlist}/>
                            <textarea readOnly={true} style={{cols:70, rows:20,height:500,width:300}} value={this.state.wsconsole}/>
                        </div>
                </div>
        );
    }
}

export default Chatroom;
