import {
    DOCUMENT_EDIT,
    DOCUMENT_FETCH_SUCCESS,
    DOCUMENT_FETCH_ERROR,
} from './actions/constants';
import { handleActions } from 'redux-actions';
const initalState = {
    id: null,
    content: "",
    user_id: null,
    errorMsg: "",
    successMsg: "",
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
        return Object.assign({}, state, {errorMsg: action.message});
    },
    DOCUMENT_POST_SUCCESS: (state, action) => {
        const { documentId, toUpdate } = action;
        return Object.assign({}, state, {documentId: documentId, toUpdate: toUpdate, successMsg: "成功"});
    },
    DOCUMENT_POST_ERROR: (state, action) => {
        return Object.assign({}, state, {errorMsg: "エラー"});
    },
    DOCUMENT_VALIDATION_ERROR: (state, action) => {
        return Object.assign({}, state, {errorMsg: "エラー"});
    }
}, initalState);

export default reducer;

