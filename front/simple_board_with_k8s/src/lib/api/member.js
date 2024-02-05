import asyncRequestBase from "./asyncRequestBase";

export const memberInsert = ({userId, userPw, userName, userPhone}) => {
    return asyncRequestBase('POST', '/user', {userId, userPw, userName, userPhone});
};

export const memberLogin = ({userId, userPw}) => {
    return asyncRequestBase('POST', '/user/login', {userId, userPw});
};