import asyncRequestBase from "./asyncRequestBase";

export const memberInsert = ({id, password}) => {
    return asyncRequestBase('POST', '/member', {id, password});
};

export const memberLogin = ({id, password}) => {
    return asyncRequestBase('POST', '/login', {id, password});
};