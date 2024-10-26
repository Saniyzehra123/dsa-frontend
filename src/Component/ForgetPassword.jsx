import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../Redux/Auth/authAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((store) => store.forgotPassword); // Adjusted selector
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordAction(email));
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        if (error) {
            toast.error(error);
        }
    }, [message, error]);

    useEffect(() => {
        if (message?.link) {
            navigate(`/reset-password?token=${message.link}`); // Navigate to reset-password page with the token
        }
    }, [message?.link, navigate]);

    return (
        <div>
            <div className="container mt-36">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><h1>Forgot Password</h1></div><hr />
                    <div className="col-md-4"></div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 p-6">
                        <form onSubmit={handleSubmit} className='p-4 bg-slate-50'>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={handleOnChange}
                                    required
                                />
                                <label>Email address</label>
                            </div>
                            <button type="submit" className="btn btn-outline-success">
                                {loading ? 'Sending...' : 'Send Link To Your Email'}
                            </button>
                        </form>
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={true}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                    <div className="col-md-4"></div>
                    <hr />
                </div>
            </div>

            <style jsx>{`
                a {
                    text-decoration: none;
                }
            `}</style>
        </div>
    );
};

export default ForgetPassword;







// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { forgotPasswordAction } from '../Redux/Auth/authAction';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const ForgetPassword = () => {
//   const dispatch = useDispatch();
//   const { loading, message, error } = useSelector((store) => store.forgotPassword); // Adjusted selector
  
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   const handleOnChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(forgotPasswordAction(email));
//   };

//   useEffect(() => {
//     if (message) {
//       toast.success(message);
//     }
//     if (error) {
//       toast.error(error);
//     }
//   }, [message, error]);

//   useEffect(() => {
//     if (message?.link) {
//       navigate(`${message?.link}`);
//     }
//   }, [message?.link, navigate]);

//   return (
//     <div>
//       <div className="container mt-36">
//         <div className="row">
//           <div className="col-md-4"></div>
//           <div className="col-md-4"><h1>Forgot Password</h1></div><hr />
//           <div className="col-md-4"></div>
//         </div>
//       </div>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4"></div>
//           <div className="col-md-4 p-6">
//             <form onSubmit={handleSubmit} className='p-4 bg-slate-50'>
//               <div className="form-floating mb-3">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="name@example.com"
//                   value={email}
//                   onChange={handleOnChange}
//                   required
//                 />
//                 <label>Email address</label>
//               </div>
//               <button type="submit" className="btn btn-outline-success">
//                 {loading ? 'Sending...' : 'Send Link To Your Email'}
//               </button>
//             </form>
//             <ToastContainer
//               className="custom-toast-container"
//               position="top-right"
//               autoClose={3000}
//               hideProgressBar={false}
//               newestOnTop={true}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//             />
//           </div>
//           <div className="col-md-4"></div>
//           <hr />
//         </div>
//       </div>

//       <style jsx>{`
//         a {
//           text-decoration: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ForgetPassword;



 