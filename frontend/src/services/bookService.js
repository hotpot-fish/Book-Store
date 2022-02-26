import {postRequest, postRequest_v2} from "../utils/ajax";

export const getBooks = (data, callback) => {
    const url = 'http://localhost:8080/listBooks';
    postRequest(url, data, callback);
};

export const showAllBooks = (data, callback) => {
    const url = 'http://localhost:8080/showAllBooks';
    postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = 'http://localhost:8080/getBook';
    postRequest_v2(url, data, callback);
};
export const searchBooks=(data,callback)=>{
    const url = `http://localhost:8080/searchBooks`;
    postRequest(url,data,callback);
}
