import asyncRequestBase from "./asyncRequestBase";

export const memberInsert = ({userId, userPw, userName, userPhone}) => {
    return asyncRequestBase('POST', '/user', {userId, userPw, userName, userPhone});
};

export const memberLogin = ({id, password}) => {
    return asyncRequestBase('POST', '/login', {id, password});
};