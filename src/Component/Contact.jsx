import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { submitContactForm } from "../Redux/contactus/contactAction";
import "./Navbar.css";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contactForm);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const { first_name, last_name, email, mobile, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));

    // Show success message and reset form when submission is successful
    if (!loading && success) {
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Thank you for reaching out to us! We will get back to you soon.",
      });

      // Clear form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        message: "",
      });
    }

    // Handle error
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative contact">
        <div className="container px-5 py-24 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 mt-36">
                Contact Us
              </h1>
              <p className="text-center">We love to hear from you.</p>
            </div>

            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      placeholder="Enter First Name "
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={first_name}
                      onChange={handleChange}
                      required
                    />
                    <label for="floatingInput">First Name</label>
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"

                      type="text"
                      placeholder="Enter Last Name"
                      id="last_name"
                      name="last_name"
                      value={last_name}
                      onChange={handleChange}
                      required
                    />
                    <label for="floatingInput">Last Name </label>
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
  
                      placeholder="Enter Email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div class="form-floating mb-3">
                    <input
                      class="form-control"
                      type="number"
                      placeholder="Enter Mobile Number"
                      id="mobile"
                      name="mobile"
                      value={mobile}
                      onChange={handleChange}
                      required
                    />
                    <label for="floatingInput">Mobile</label>
                  </div>
                </div>

                <div className="p-2 w-full">
                  <div class="form-floating mb-3">
                    <textarea
                    
                      class="form-control"
    
                      placeholder="Enter Your Query Here"
                      id="message"
                      name="message"
                      value={message}
                      onChange={handleChange}
                      required
                    />
                    <label for="floatingInput">Message</label>
                  </div>
                 
                </div>

                <div className="p-2 w-full">
                  <button
                    type="submit"
                    name="submit"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Submit
                  </button>
                </div>
                <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                  <p className="text-center text-decoration-none text-">
                    Email:{" "}
                    <a
                      href="mailto:dsafashionwear@gmail.com"
                      className="text-indigo-500"
                    >
                      dsafashionwear@gmail.com
                    </a>
                  </p>
                  <p className="text-center">
                    Address: Near Omaxe City Lucknow - 226025, India
                  </p>
                </div>
              </div>
            </div>
          </form>

          {/* Show status messages */}
          {loading && <p>Loading...</p>}
        </div>
      </section>
    </div>
  );
};

export default Contact;
