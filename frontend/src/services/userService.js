import {postRequest} from "../utils/ajax";
import React from "react";
import {history} from "../utils/history";

export const login = (data) => {
    const url = 'http://localhost:8080/login';
    const callback = (data1) => {
        let user_id = parseInt(data1.user_id);
        let user_type = parseInt(data1.user_type);
        let user_name = data1.user_name;
        console.log(data1)
        if(user_id > 0 && user_type !== -1)
        {
            localStorage.setItem("user",JSON.stringify(user_id));
            localStorage.setItem("user_type",JSON.stringify(user_type));
            localStorage.setItem("user_name",JSON.stringify(user_name));
            history.push("/HomeView");
        }
        if(user_type === -1){
            window.alert("您的账号已经被禁用！");
        }
        if(user_id === -1)
        {
            window.alert("账号密码错误，登陆失败！");
        }
    };
    postRequest(url, data, callback);
};

export const register = (data, callback) => {
    const url = 'http://localhost:8080/register';
    postRequest(url, data, callback);
};

export const findNameDup = (data, callback) => {
    const url = 'http://localhost:8080/findNameDup';
    postRequest(url, data, callback);
};

export const checkSession = (callback) => {
    const url = 'http://localhost:8080/checkSession';

    console.log("begin check");
    postRequest(url, {}, callback);
    console.log("finish check");
};

export const checkUserType = (data, callback) => {
    const url = 'http://localhost:8080/checkUserType';
    postRequest(url, data, callback);
};

export const updateTime = (data, callback) => {
    const url = 'http://localhost:8080/getTime';
    postRequest(url, data, callback);
};