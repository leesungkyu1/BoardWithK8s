import asyncRequestBase from "./asyncRequestBase";

export const memberInsert = ({id, password}) => {
    return asyncRequestBase('POST', '');
};

export const memberLogin = ({id, password}) => {
    return asyncRequestBase('POST', '');
};