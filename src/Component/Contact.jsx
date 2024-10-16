import React from 'react'
import './Navbar.css';

const Contact = () => {
  return (
    <div>
  
  <section className="text-gray-600 body-font relative contact">
  <div class="container px-5 py-24 mx-auto"> <form action="" method='post'>
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 mt-8">Contact Us</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">We are love to hear from you.</p>
    </div>
   
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="fname" class="leading-7 text-sm text-gray-600">First Name</label>
            <input type="text" placeholder='Enter First Name' autoComplete='off' id="fname" name="fname" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="lname" class="leading-7 text-sm text-gray-600">Last Name</label>
            <input type="text" id="lname" placeholder='Enter Last name' autoComplete='Off'  name="lname" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email"  placeholder='Enter Email' autoComplete='Off' id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="mobile" class="leading-7 text-sm text-gray-600">Mobile</label>
            <input type="number"  placeholder='Enter Mobile Number' autoComplete='Off' id="mobile" name="mobile" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
            <textarea id="message"  placeholder='Enter Your Query Here' autoComplete='Off' name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
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
  </div>
</section>
    </div>
  )
}

export default Contact