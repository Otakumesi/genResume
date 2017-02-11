import {
    DOCUMENT_EDIT,
    DOCUMENT_FETCH_SUCCESS,
    DOCUMENT_FETCH_ERROR,
    CLEAR_MESSAGE,
} from './actions/constants';
import { handleActions } from 'redux-actions';
const initalState = {
    id: null,
    title: "",
    content: "",
    user_id: null,
    flash_message: {
        type: "",
        message: "",
    },
    isNewDoc: true,
    toUpdate: false,
};

const reducer = handleActions({
    DOCUMENT_EDIT: (state, action) => {
        return Object.assign({}, state, action.payload);
    },
    DOCUMENT_IDENTIFY: (state, action) => {
        return Object.assign({}, state, action.payload);
    },
    DOCUMENT_FETCH_SUCCESS: (state, action) => {
        return Object.assign({}, state, action.document);
    },
    DOCUMENT_FETCH_ERROR: (state, action) => {
        return Object.assign({}, state, {flash_message: {type: "negative", message: action.message}});
    },
    DOCUMENT_POST_SUCCESS: (state, action) => {
        const { documentId, toUpdate } = action;
        return Object.assign({}, state, {documentId: documentId, toUpdate: toUpdate, flash_message: {type: "positive", message: "入力内容を保存いたしました。"}});
    },
    DOCUMENT_POST_ERROR: (state, action) => {
        return Object.assign({}, state, {flash_message: {type: "negative", message: "保存に失敗しました。もう一度保存をお願いいたします。"}});
    },
    DOCUMENT_VALIDATION_ERROR: (state, action) => {
        return Object.assign({}, state, {flash_message: {type: "negative", message: "不正な値が入力されております。入力内容をご確認ください。"}});
    },
    CLEAR_MESSAGE: (state, action) => {
        return Object.assign({}, state, {flash_message: {type: "", message: ""}});
    },
}, initalState);

export default reducer;

