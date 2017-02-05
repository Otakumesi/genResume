import { createAction } from 'redux-actions';
import {
    DOCUMENT_EDIT,
    DOCUMENT_FETCH_REQUEST,
    DOCUMENT_POST_REQUEST,
    DOCUMENT_IDENTIFY,
} from './constants';

export const edit_document = createAction(DOCUMENT_EDIT, content => content);

export const fetch_document = createAction(DOCUMENT_FETCH_REQUEST, (identity) => identity);

export const post_document = createAction(DOCUMENT_POST_REQUEST, (postdata) => postdata);

export const identify_document = createAction(DOCUMENT_IDENTIFY, (identity) => identity);
