import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../Redux/contactus/contactAction';
import './Navbar.css';


const Contact = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contactForm);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const { first_name, last_name, email, mobile, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };
  return (
    <div>
  
  <section className="text-gray-600 body-font relative contact">
  <div class="container px-5 py-24 mx-auto">
     <form onSubmit={handleSubmit}>
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 mt-8">Contact Us</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">We are love to hear from you.</p>
    </div>
   
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="fname" class="leading-7 text-sm text-gray-600">First Name</label>
            <input type="text" placeholder='Enter First Name' autoComplete='off'
             id="first_name"
             name="first_name"
             value={first_name}
             onChange={handleChange}
             required
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="lname" class="leading-7 text-sm text-gray-600">Last Name</label>
            <input type="text"  placeholder='Enter Last name' autoComplete='Off'  
            id="last_name"
            name="last_name"
            value={last_name}
            onChange={handleChange}
            required
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email"  placeholder='Enter Email' autoComplete='Off'
             id="email"
             name="email"
             value={email}
             onChange={handleChange}
             required
           class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="mobile" class="leading-7 text-sm text-gray-600">Mobile</label>
            <input type="number"  placeholder='Enter Mobile Number' autoComplete='Off'
             id="mobile"
             name="mobile"
             value={mobile}
             onChange={handleChange}
             required
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
            <textarea   placeholder='Enter Your Query Here' autoComplete='Off' 
                id="message"
                name="message"
                value={message}
                onChange={handleChange}
                required
             class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button type='submit'  name='submit' class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
        </div>
        <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
        <p> Email:&nbsp;
          <a href='mailto:dsafashionwear@gmail.com' class="text-indigo-500">dsafashionwear@gmail.com</a></p> 
          <p class="leading-normal">Address: Near Omaxe City Lucknow - 226025 , India
          </p>
    
        </div>
      </div>
    </div>
    </form>

    {/* Show status messages */}
    {loading && <p>Loading...</p>}
    {success && <p>Message sent successfully!</p>}
    {error && <p>{error}</p>}
  </div>
</section>
    </div>
  )
}

export default Contact


 
