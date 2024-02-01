import { createAction, handleActions } from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/saga/createRequestSaga";
import * as memberAPI from "../lib/api/member";

const [MEMBER_INSERT, MEMBER_INSERT_SUCCESS, MEMBER_INSERT_FAILURE] = createRequestActionTypes("member/INSERT");
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes("member/LOGIN");
const CHANGE_VALUE = "member/CHANGE_VALUE";
const INIT_FORM = "member/INIT_FORM";

export const memberInsertAction = createAction(MEMBER_INSERT, ({id, password}) => ({id, password}));
export const loginAction = createAction(LOGIN, ({id, password}) => ({id, password}));
export const initForm = createAction(INIT_FORM);
export const changeValue = createAction(CHANGE_VALUE);

const initState = {
    id: "",
    password: "",
    err: null
};

const memberInsertSaga = createRequestSaga(MEMBER_INSERT, memberAPI.memberInsert);
const loginSaga = createRequestSaga(LOGIN, memberAPI.memberLogin);

export function* memberSaga() {
    yield takeLatest(MEMBER_INSERT, memberInsertSaga);
    yield takeLatest(LOGIN, loginSaga);
};

const member = handleActions({
    [MEMBER_INSERT_SUCCESS]: (state, {payload: {id, password}, code}) => ({
        ...state,
        id,
        password
    }),
    [MEMBER_INSERT_FAILURE]: (state, {payload: error}) => ({
        ...state,
        err: error,
    }),
    [CHANGE_VALUE]: (state, {payload: {key, value}}) => ({
        ...state,
        [key]: value
    }),
    [INIT_FORM]: (state) => ({
        ...state,
        id: initState.id,
        password: initState.password
    })
}, initState);

export default member;
