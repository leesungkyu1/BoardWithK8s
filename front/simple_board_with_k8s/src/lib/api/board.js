import asyncRequestBase from "./asyncRequestBase";

export const boardList = (page) => {
    return asyncRequestBase("GET", `/post?page=${page}`);
};

export const boardDetail = (seq) => {
    return asyncRequestBase("GET", `/post/${seq}`);
};

export const boardInsert = ({title, content}) => {
    return asyncRequestBase("POST", `/post`, {title, content});
};

export const boardUpdate = ({seq, title, content}) => {
    return asyncRequestBase("PUT", `/post/${seq}`, {title, content});
};

export const boardDelete = (seq) => {
    return asyncRequestBase("DELETE", `/post/${seq}`);
};