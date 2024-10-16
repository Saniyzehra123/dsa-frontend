 
import axios from "axios";
import { GET_SAREES_SUCCESS, GET_SAREES_REQUEST, GET_SAREES_FAILURE } from "./actionType";

const getSareeRequest = (payload) => ({
    type: GET_SAREES_REQUEST,
    payload
});
const getSareeSuccess = (payload)=> ({
    type: GET_SAREES_SUCCESS,
    payload
});
const getSareeFailure=(payload)=>({
    type:GET_SAREES_FAILURE,
    payload
})
 
export const GetSarees = (payload)=>{
    console.log("payload",payload)

    return(dispach)=>{
        dispach(getSareeRequest());
        console.log('Base URL:', process.env.REACT_APP_BASE_URL);
        axios.get(`${process.env.REACT_APP_BASE_URL}/products`,{
            params:{
                ...payload
            }
        })
        .then(res=>{
            dispach(getSareeSuccess(res.data))
            console.log('response',res.data)
        })
        .catch(error =>{
            dispach(getSareeFailure(error));
        })
    }
}
// export const ProductsActions = () => async (dispatch) => {
//     try {
//         const db = getDatabase();
//         const productsRef = ref(db, `nfc/products`);
//         onValue(productsRef, (snapshot) => {
//             if (snapshot.exists()) {
//               const products = snapshot.val();
//               dispatch(getProductSuccess(products));
//             }
//           });
//     } catch (error) {
//         dispatch(getProductFailure(error))
//     }
//   };
