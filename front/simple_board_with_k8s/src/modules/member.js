import { createAction, handleActions } from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/saga/createRequestSaga";
import * as memberAPI from "../lib/api/member";

const [MEMBER_INSERT, MEMBER_INSERT_SUCCESS, MEMBER_INSERT_FAILURE] = createRequestActionTypes("member/INSERT");
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes("member/LOGIN");
const CHANGE_VALUE = "member/CHANGE_VALUE";
const INIT_FORM = "member/INIT_FORM";
const INIT_ERR = "member/INIT_ERR";
const SET_MEMBER = "member/SET_MEMBER"

export const memberInsertAction = createAction(MEMBER_INSERT, ({userId, userPw, userName, userPhone}) => ({userId, userPw, userName, userPhone}));
export const loginAction = createAction(LOGIN, ({userId, userPw}) => ({userId, userPw}));
export const initForm = createAction(INIT_FORM);
export const changeValue = createAction(CHANGE_VALUE);
export const initErr = createAction(INIT_ERR);
export const setMember = createAction(SET_MEMBER);

const initState = {
    userId: "",
    userPw: "",
    userIdx: "",
    userName: "",
    userPhone: "",
    err: null,
    message: "",
    token: "",
};

const memberInsertSaga = createRequestSaga(MEMBER_INSERT, memberAPI.memberInsert);
const loginSaga = createRequestSaga(LOGIN, memberAPI.memberLogin);

export function* memberSaga() {
    yield takeLatest(MEMBER_INSERT, memberInsertSaga);
    yield takeLatest(LOGIN, loginSaga);
};

const member = handleActions({
    [MEMBER_INSERT_SUCCESS]: (state, {payload: {userId, password}, code}) => ({
        ...state
    }),
    [MEMBER_INSERT_FAILURE]: (state, {payload: error}) => ({
        ...state,
        err: error,
    }),
    [LOGIN_SUCCESS]: (state, {payload: token}) => ({
        ...state,
        token: token
    }),
    [LOGIN_FAILURE]: (state, {code, message}) => ({
        ...state,
        err: code,
        message: message
    }),
    [CHANGE_VALUE]: (state, {payload: {key, value}}) => ({
        ...state,
        [key]: value
    }),
    [INIT_FORM]: (state) => ({
        ...state,
        userId: initState.userId,
        userPw: initState.userPw,
        userName: initState.userName,
        userPhone: initState.userPhone,
    }),
    [INIT_ERR]: (state) => ({
        ...state,
        err: null,
        message: ""
    }),
    [SET_MEMBER]: (state, {payload: token}) => ({
        ...state,
        token: token
    }),
}, initState);

export default member;
