import { combineReducers } from "redux";
import {all} from 'redux-saga/effects';
import loading from "./loading";
import member, {memberSaga} from "./member";
import board, {boardSaga} from "./board";

const rootReducer = combineReducers({
    loading,
    member,
    board
});

export function* rootSaga(){
    yield all([memberSaga(), boardSaga()]);
};

export default rootReducer;