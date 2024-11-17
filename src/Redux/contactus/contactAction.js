import axios from "axios";
import {
    CONTACT_FORM_REQUEST,
    CONTACT_FORM_SUCCESS,
    CONTACT_FORM_FAILURE,
} from "./actionType";

// Action creators
const contactFormRequest = () => ({
    type: CONTACT_FORM_REQUEST,
});

const contactFormSuccess = (payload) => ({
    type: CONTACT_FORM_SUCCESS,
    payload,
});

const contactFormFailure = (error) => ({
    type: CONTACT_FORM_FAILURE,
    error,
});

// Thunk action for submitting the contact form
export const submitContactForm = (formData) => {
    return (dispatch) => {
        dispatch(contactFormRequest());

        // Replace with your correct backend URL
       
        axios.post(`${process.env.REACT_APP_BASE_URL}/contact`, formData)
            .then((response) => {
                dispatch(contactFormSuccess(response.data));
            })
            .catch((error) => {
                dispatch(contactFormFailure(error.response?.data || error.message));
            });
    };
};
