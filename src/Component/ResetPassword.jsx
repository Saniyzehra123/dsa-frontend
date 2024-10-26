import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../Redux/Auth/authAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((store) => store.resetPassword);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    dispatch(resetPasswordAction(token, password, confirmPassword));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/login'), 3000); // Redirect after success
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error, navigate]);

  return (
    <div>
      <div className="container op">
        <div className="row">
          <div className="col-md-12">
            <section className="text-gray-600 body-font mt-28">
              <div className="container px-5 pt-24 mx-auto">
                <div className="flex flex-col text-center w-full">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Reset Password</h1><hr />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 p-6">
            <form onSubmit={handleSubmit} className="p-4 bg-slate-50" autoComplete="off">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                />
                <label>New Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                  required
                />
                <label>Confirm New Password</label>
              </div>
              <button type="submit" className="btn btn-outline-success">
                {loading ? 'Resetting...' : 'Reset Your Password'}
              </button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
