import { createAction, handleActions } from "redux-actions";
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/saga/createRequestSaga";
import * as boardAPI from "../lib/api/board";

const [BOARD_LIST, BOARD_LIST_SUCCESS, BOARD_LIST_FAILUER] = createRequestActionTypes("board/LIST");
const [BOARD_INSERT, BOARD_INSERT_SUCCESS, BOARD_INSERT_FAILURE] = createRequestActionTypes("board/INSERT");
const [BOARD_UPDATE, BOARD_UPDATE_SUCCESS, BOARD_UPDATE_FAILURE] = createRequestActionTypes("board/UPDATE");
const [BOARD_DELETE, BOARD_DELETE_SUCCESS, BOARD_DELETE_FAILURE] = createRequestActionTypes("board/DELETE");
const [BOARD_ITEM, BOARD_ITEM_SUCCESS, BOARD_ITEM_FAILURE] = createRequestActionTypes("board/ITEM");
const CHANGE_VALUE = "board/CHANGE_VALUE";
const INIT_FORM = "board/INIT_FORM";

export const boardListAction = createAction(BOARD_LIST, page => page);
export const boardInsertAction = createAction(BOARD_INSERT, ({title, content}) => ({title, content}));
export const boardUpdateAction = createAction(BOARD_UPDATE, ({seq, title, content}) => ({seq, title, content}));
export const boardDeleteAction = createAction(BOARD_DELETE, seq => seq);
export const boardItemAction = createAction(BOARD_ITEM, seq => seq);
export const initForm = createAction(INIT_FORM);
export const changeValue = createAction(CHANGE_VALUE);

const initSatet = {
    boardList: {
        boardList: "",
        page: "",
    },
    board: {
        seq: "",
        title: "",
        content: ""
    }
};

const boardListSaga = createRequestSaga(BOARD_LIST, boardAPI.boardList);
const boardInsertSaga = createRequestSaga(BOARD_INSERT, boardAPI.boardInsert);
const boardUpdateSaga = createRequestSaga(BOARD_UPDATE, boardAPI.boardUpdate);
const boardDeleteSaga = createRequestSaga(BOARD_DELETE, boardAPI.boardDelete);
const boardItemSage = createRequestSaga(BOARD_ITEM, boardAPI.boardDetail);

export function* boardSaga(){
    yield takeLatest(BOARD_LIST, boardListSaga);
    yield takeLatest(BOARD_INSERT, boardInsertSaga);
    yield takeLatest(BOARD_UPDATE, boardUpdateSaga);
    yield takeLatest(BOARD_DELETE, boardDeleteSaga);
    yield takeLatest(BOARD_ITEM, boardItemSage);
};

const board = handleActions({
    [BOARD_LIST_SUCCESS]: (state, {payload, code}) => ({
        ...state,
        boardList: payload.boardList,
        page: payload.page ? payload.page : 1,
        err: code !== 0,
    }),
    [BOARD_LIST_FAILUER]: (state, {payload: error}) => ({
        ...state,
        err: error
    }),
    [BOARD_INSERT_SUCCESS]: (state, {payload: {title, content}, code}) => ({
        ...state,
        title: title,
        content: content
    }),
    [BOARD_INSERT_FAILURE]: (state, {payload: error}) => ({
        ...state,
        err: error
    }),
    [BOARD_UPDATE_SUCCESS]: (state, {payload: {seq, title, content}, code}) => ({
        ...state,
        seq: seq,
        title: title,
        content: content
    }),
    [BOARD_UPDATE_FAILURE]: (state, {payload: error}) => ({
        ...state,
        err: error
    }),
    [BOARD_DELETE_SUCCESS]: (state, {payload: {seq}, code}) => ({
        ...state,
        seq: seq
    }),
    [BOARD_DELETE_FAILURE]: (state, {payload: error}) => ({
        ...state,
        err: error
    }),
    [BOARD_ITEM_SUCCESS]: (state, {payload: {seq, title, content}, code}) => ({
        ...state,
        seq: seq,
        title: title,
        content: content
    }),
    [BOARD_ITEM_FAILURE]: (state, {payload: error}) => ({
        ...state,
        err: error
    }),
    [CHANGE_VALUE]: (state, {payload: {key, value}}) => ({
        ...state,
        [key]: value
    }),
    [INIT_FORM]: (state) => ({
        ...state,
        title: initSatet.title,
        content: initSatet.content
    })
}, initSatet);

export default board;