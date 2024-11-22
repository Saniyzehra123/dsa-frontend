import React from 'react'
import './Footer.css';


const Footer = () => {
  return (
    <div>
      {/* Footer Start  */}

      <footer className="text-gray-600 body-font">


        <center>
          <div className="container-fluid px-5 py-24 mx-auto">
          <div className="row">
            <div className="col-md-3 ty1">
              <center><img className='w-25' src="assets/images/logo/logo.jpg" alt="" /></center><br />
              <center>  <h3>D'Sa Fashion Wear <br /> & <br /> Home Decor</h3></center>
            </div>
            <div className="col-md-3 ty2 text-justify">
              <h3>Popular Searches</h3>
              <ul>
                <li><a href="/saree"><p> Saree</p></a></li>
                <li><a href="/comming-soon"><p>Imitation Jewellery</p></a></li>
                <li><a href="/comming-soon"><p>Lather Bag</p></a></li>
                <li><a href="/comming-soon"><p>Cotton Bag</p></a></li>
               

              </ul>
            </div>
            <div className="col-md-3 ty2 text-justify">
            <h3>Quick Links</h3>
              <ul>
                <li><a href="/about"><p>About Us</p></a></li>
                <li><a href="/contact"><p>Contact Us</p></a></li>
                <li><a href="/comming-soon"><p>Blogs</p></a></li>
                <li><a href="/track-order"><p>Track Your Order</p></a></li>
               

              </ul>
            </div>
            <div className="col-md-3 ty3 text-justify">
            <h3>Customer Services</h3>
              <ul>
                <li><a href="/shipping-policy"><p>Shipping Policy</p></a></li>
                <li><a href="/refund-policy"><p>Refund & Return Policy</p></a></li>
                <li><a href="/term-condition"><p>Terms & Conditions</p></a></li>
                <li><a href="/privacy-policy"><p>Privacy Policy</p></a></li>
               

              </ul>
            </div>
          </div>
        </div>
        </center>
  
        <div className="border-t border-gray-200">
          <div className="container px-5 py-8 flex flex-wrap mx-auto items-center">
            <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
              {/* <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
                <label for="footer-field" className="leading-7 text-sm text-gray-600">Subscribe Newsletter</label>
                <input type="text" id="footer-field" name="footer-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div> */}
              {/* <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Subscribe</button> */}

              <p className="text-gray-500 text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center">Address:
              Near Omaxe City Lucknow - 226025, India
              </p>
            </div>   
            <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
              <a href="https://www.facebook.com/profile.php?id=61564667777330" className="text-gray-500">
            <i className='fa fa-facebook-official'></i>
              </a>
              <a href="https://instagram.com/dsafashionwear" className="ml-3 text-gray-500">
              <i className='fa fa-instagram size-12'></i>
              </a>
              <a href="https://youtube.com/@dsafashionwear?si=8Bbh8aAbrYKnRD9X" className="ml-3 text-gray-500">
                <i className='fa fa-youtube-play'></i>
              </a>
              <a href="#" className="ml-3 text-gray-500">
             <i className="	fab fa-linkedin-in"></i>
              </a>
            </span>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 D'Sa FahionWear & Home Decor

            </p>
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">  Design & Developed By <a href="https://pixelperfectstrategies.com" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">pixelperfectstrategies</a></span>
          </div>
        </div>
      </footer>
      {/* Footer End */}

    </div>
  )
}

export default Footer