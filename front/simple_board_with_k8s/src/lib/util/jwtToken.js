import base64, { decode } from 'base-64';

export function getIdFromToken () {
    const token = localStorage.getItem("token");

    if(token){
        const base64Payload = token.split('.')[1];
        const payload = decode(base64Payload);
        const resultObject = JSON.parse(payload.toString());

        return resultObject;
    }

    return "";
};