import { call, put, fork, take } from 'redux-saga/effects';
import request from 'superagent';
import { browserHistory } from 'react-router';

import {
    DOCUMENT_FETCH_REQUEST,
    DOCUMENT_FETCH_SUCCESS,
    DOCUMENT_FETCH_ERROR,
    DOCUMENT_POST_REQUEST,
    DOCUMENT_POST_SUCCESS,
    DOCUMENT_POST_ERROR,
    DOCUMENT_POST_VALIDATION_ERROR,
} from '../actions/constants';

export function getDocument(identity) {
    return new Promise((resolve, reject) => {
        request.get(`/users/${identity.user_id}/documents/${identity.id}.json`)
            .end((err, response) => {
                if(err) {
                    reject(new Error(err.message));
                } else {
                    resolve({document: response.body});
                }
            });
    });
};

export function * fetchDocument() {
    const request = yield take(DOCUMENT_FETCH_REQUEST);
    try {
        const { document } = yield call(getDocument, request.payload);
        yield put({type: DOCUMENT_FETCH_SUCCESS, document: document});
    } catch (e) {
        yield put({type: DOCUMENT_FETCH_ERROR, message: e.message});
    }
}

export function * postDocument(){
    while(true) {
        const request = yield take(DOCUMENT_POST_REQUEST);
        const { isNewDoc, document } = request.payload;
        if(isNewDoc) {
            yield call(handlePostFlow, createDocument, document, true);
        } else {
            yield call(handlePostFlow, updateDocument, document);
        }
    }
}

export function * handlePostFlow(callMethod, document, toUpdate = false) {
    try {
        const response = yield call(callMethod, document);
        const { documentId } = response;
        yield put({type: DOCUMENT_POST_SUCCESS, documentId: response.documentId });
        if (toUpdate) {
            browserHistory.push(`/users/${document.user_id}/documents/${documentId}/edit`);
        }
    } catch(e) {
        handleErrorMessages(e.message);
    }
}

export function handleErrorMessages(errorMsg) {
    if(Array.isArray(errorMsg)) {
        put({type: DOCUMENT_POST_VALIDATION_ERROR, error: errorMsg});
    } else {
        put({type: DOCUMENT_POST_ERROR, error: errorMsg});
    }
}

const authenticity_token = document.getElementById('editor').getAttribute('token');

export function createDocument(document) {
    return new Promise((resolve, reject) => {
        request.post(`/users/${document.user_id}/documents.json`)
            .send({
                content: document.content,
                user_id: document.user_id,
                authenticity_token: authenticity_token
            })
            .end((err, res) => {
                let resObj = res.body;
                if(err) {
                    return reject(new Error(err.message));
                } else {
                    if(resObj.errorMsg) {
                        return reject(new Error(resObj.errorMsg));
                    } else {
                        return resolve({ documentId: resObj.document_id});
                    }
                }
            });
    });
}

export function updateDocument(document) {
    return new Promise((resolve, reject) => {
        request.patch(`/users/${document.user_id}/documents/${document.id}.json`)
            .send({
                content: document.content,
                user_id: document.user_id,
                authenticity_token: authenticity_token
            })
            .end((err, res) => {
                let resObj = res.body;
                if(err) {
                    return reject(new Error(err.message));
                } else {
                    if(resObj.errorMsg) {
                        return reject(new Error(resObj.errorMsg));
                    } else {
                        return resolve({ documentId: resObj.document_id});
                    }
                }
            });
    });

}

export default function * mySaga() {
    yield fork(fetchDocument);
    yield fork(postDocument);
}
