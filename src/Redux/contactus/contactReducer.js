// src/redux/contact/contactReducer.js
import { CONTACT_FORM_REQUEST, CONTACT_FORM_SUCCESS, CONTACT_FORM_FAILURE } from './actionType';

const initialState = {
    loading: false,
    success: false,
    error: null,
};

export const contactFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_FORM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case CONTACT_FORM_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
