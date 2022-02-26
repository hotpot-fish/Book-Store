import {postRequest} from "../utils/ajax";

export const updateBook = (data, callback) => {
    const url = 'http://localhost:8080/updateBook';
    postRequest(url, data, callback);
};

export const showAllUsers = (data, callback) => {
    const url = 'http://localhost:8080/showAllUsers';
    postRequest(url, data, callback);
};

export const updateUserType = (data, callback) => {
    const url = 'http://localhost:8080/updateUserType';
    postRequest(url, data, callback);
};

export const manageAddBook = (data, callback) => {
    const url = 'http://localhost:8080/manageAddBook';
    postRequest(url, data, callback);
};

export const manageDeleteBook = (data, callback) => {
    const url = 'http://localhost:8080/manageDeleteBook';
    postRequest(url, data, callback);
};

export const getTopUser = (data, callback) => {
    const url = 'http://localhost:8080/getTopUser';
    postRequest(url, data, callback);
};