import { GET_SAREES_SUCCESS,GET_SAREES_REQUEST,GET_SAREES_FAILURE } from './actionType';

const initialState = {
    isLoading: false,
    sarees: [],
    error: null
}
const  sareeReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_SAREES_REQUEST:
            return {
                ...state,
                error:'',
                isLoading: true
            }
            case GET_SAREES_SUCCESS:
                return{
                    ...state,
                    sarees:payload,
                    error:"",
                    isLoading:false
                }
    
        case GET_SAREES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error :payload.message || 'An error occurred'
            }
        default:
            return state;
    }
}

export default sareeReducer;
