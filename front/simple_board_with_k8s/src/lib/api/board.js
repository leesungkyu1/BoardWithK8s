import asyncRequestBase from "./asyncRequestBase";

export const boardList = (page) => {
    return asyncRequestBase("GET", ``);
};

export const boardDetail = (seq) => {
    return asyncRequestBase("GET", ``);
};

export const boardInsert = ({title, content}) => {
    return asyncRequestBase("POST", ``);
};

export const boardUpdate = ({title, content}) => {
    return asyncRequestBase("PUT", ``);
};

export const boardDelete = (sqe) => {
    return asyncRequestBase("DELETE", ``);
};