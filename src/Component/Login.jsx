import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userLoginAction } from '../Redux/Auth/authAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decodeToken } from '../common/utils';
import './Login-Signup.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated, user } = useSelector((store) => store?.loginData);

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    if (loginFormData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      dispatch(userLoginAction(loginFormData.email, loginFormData.password));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      let loginData = decodeToken(user.token);
      loginData['token'] = user.token;
      sessionStorage.setItem('userData', JSON.stringify(loginData));
      toast.success('Login successful!', { autoClose: 3000 });
      setTimeout(() => {
        navigate("/");
      }, 3000);
      setLoginFormData({ email: '', password: '' });
    }
    if (error) {
      toast.error(error, { autoClose: 3000 });
    }
  }, [isAuthenticated, error]);

  return (
    <div>
      <div className="container login">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4"><h1>Login Here</h1></div><hr />
          <div className="col-md-4"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 p-6">
            <form onSubmit={handleSubmit} className="p-4 bg-slate-50">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  name="email"
                  value={loginFormData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                />
                <label>Email address</label>
              </div>
              <div className="form-floating position-relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                />
                <label>Password</label>
                {/* Eye Icon */}
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i> // Hidden password icon
                  ) : (
                    <i className="fa fa-eye"></i> // Visible password icon
                  )}
                </span>
              </div>
              <a href="/forget-password" className="float-left">Forgot Password?</a>
              <br />
              <button type="submit" className="btn btn-outline-success">
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <br /><br />
              <p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
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

export default Login;
