import asyncRequestBase from "./asyncRequestBase";

export const boardList = (page) => {
    return asyncRequestBase("GET", `/post?page=${page}`);
};

export const boardDetail = (id) => {
    return asyncRequestBase("GET", `/post/${id}`);
};

export const boardInsert = ({writer, postTitle, postContent}) => {
    return asyncRequestBase("POST", `/post`, {writer, postTitle, postContent});
};

export const boardUpdate = ({id, title, content}) => {
    return asyncRequestBase("PUT", `/post/${id}`, {title, content});
};

export const boardDelete = (seq) => {
    return asyncRequestBase("DELETE", `/post/${seq}`);
};