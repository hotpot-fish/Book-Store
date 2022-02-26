import {postRequest, postRequest_v2} from "../utils/ajax";

export const addOrder = (data, callback) => {
    const url = 'http://localhost:8080/addOrder';
    postRequest(url, data, callback);
};

export const addOrderOne = (data, callback) => {
    const url = 'http://localhost:8080/addOrderOne';
    postRequest(url, data, callback);
};

export const showAllOrders = (data, callback) => {
    const url = 'http://localhost:8080/showAllOrders';
    postRequest(url, data, callback);
};

export const showOneOrder = (data, callback) => {
    const url = 'http://localhost:8080/showOneOrder';
    postRequest(url, data, callback);
};

export const OneStatisics = (data, callback) => {
    const url = 'http://localhost:8080/oneStatistics';
    postRequest(url, data, callback);
};

export const findOneOrder = (id, callback) => {
    const data = {id: id};
    const url = 'http://localhost:8080/findOneOrder';
    postRequest_v2(url, data, callback);
};

export const findOrderItems = (id, callback) => {
    const data = {id: id};
    const url = 'http://localhost:8080/findOrderItems';
    postRequest_v2(url, data, callback);
};

export const findOrderItemsByTime = (data, callback) => {
    const url = 'http://localhost:8080/findOrderItemsByTime';
    postRequest(url, data, callback);
};

export const userFindOrderItemsByTime = (data, callback) => {
    const url = 'http://localhost:8080/userFindOrderItemsByTime';
    postRequest(url, data, callback);
};