import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction } from '../Redux/Auth/authAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css'; // Import phone input CSS
import PhoneInput from 'react-phone-input-2';
import './Toast.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const { user, error, isAuthenticated } = useSelector((state) => state?.userRegister);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  // Clears form data after successful submission
  const resetForm = () => {
    setFormData({
      username: '',
      phone: '',
      email: '',
      password: '',
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(userRegisterAction(formData));
    resetForm(); // Clear the form after submission
  };

  useEffect(() => {
    // Handle success and error messages
    if (isAuthenticated) {
      toast.success('User registered successfully!', { autoClose: 3000 });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
    if (error) {
      toast.error(error, { autoClose: 3000 });
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <div>
      <div className="container mt-48">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4"><h1>Sign Up Here</h1></div><hr />
          <div className="col-md-4"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 p-6">
            <form className="p-4 bg-slate-50" onSubmit={handleSubmit} autoComplete="off">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleOnChange}
                  autoComplete="off"
                  required
                />
                <label>Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  autoComplete="off"
                  required
                />
                <label>Email address</label>
              </div>
              <div className="form-floating mb-3">
                <PhoneInput
                  country={'in'}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoComplete: 'off',
                    className: 'form-control' // Bootstrap style for input
                  }}
                />
                {/* <label>Phone</label> */}
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  autoComplete="off"
                  required
                />
                <label>Password</label>
              </div>
              <br />
              <button type="submit" className="btn btn-outline-success">Sign Up</button>
              <br /><br />
              <p>Have an account? <a href="/login">Sign In</a></p>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>

      <ToastContainer
        className="custom-toast-container"
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
  );
};

export default SignUp;






// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userRegisterAction } from '../Redux/Auth/authAction';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
// import './Toast.css';  

// const SignUp = () => {
//   const dispatch = useDispatch();
//   const {user,error, loading, isAuthenticated} = useSelector((state) => state?.userRegister);
//   const navigate = useNavigate();

//    console.log("authtication", user);

//   const [formData, setFormData] = useState({
//     username: '',
//     phone: '',
//     email: '',
//     password: ''
//   });

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(userRegisterAction(formData));
//   };

//   useEffect(() => {
//     // If the user is authenticated, show success toast and redirect
//     if (isAuthenticated) {
//       toast.success('User registered successfully!', { autoClose: 3000 });
//       setTimeout(() => {
//         navigate('/login');  // Redirect after showing the toast
//       }, 3000); // Delay for 3 seconds
//     }

//     // If there is an error, show error toast
//     if (error!=null) {
//       toast.error(error, { autoClose: 3000 }); // Show error toast
//     }
//   }, [isAuthenticated, error, navigate]);

//   return (
//     <div>
//       <div className="container mt-36">
//         <div className="row">
//           <div className="col-md-4"></div>
//           <div className="col-md-4"><h1>Sign Up Here</h1></div><hr />
//           <div className="col-md-4"></div>
//         </div>
//       </div>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4"></div>
//           <div className="col-md-4 p-6">
//             <form className="p-4 bg-slate-50" onSubmit={handleSubmit}>
//               <div className="form-floating mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleOnChange}
//                   required
//                 />
//                 <label>Username</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="name@example.com"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleOnChange}
//                   required
//                 />
//                 <label>Email address</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleOnChange}
//                   required
//                 />
//                 <label>Phone</label>
//               </div>
//               <div className="form-floating">
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleOnChange}
//                   required
//                 />
//                 <label>Password</label>
//               </div>
//               <br />
//               <button type="submit" className="btn btn-outline-success">
//                 {/* {loading ? 'Signing Up...' : 'Sign Up'} */}
//                 Sign Up
//               </button>
//               <br /><br />
//               {/* <p>{error && <span style={{ color: 'red' }}>{error}</span>}</p> */}
//               <p>Have an account? <a href="/login">Sign In</a></p>
//             </form>
//           </div>
//           <div className="col-md-4"></div>
//         </div>
//       </div>

//       <ToastContainer
//         className="custom-toast-container"
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={true}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default SignUp;
