 import React from 'react'
 import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Homepage from './Homepage'
import Blog from './Blog'
import Newarrivals from './Newarrivals'
import Contact from './Contact'
import LatherBag from './LeatherBag'
import CottonBag from './CottonBag'
import ImitationJewellery from './ImitataionJewellery'
import About from './About'
import Kurti from './Kurti'
import SuitLength from './SuitLength'
import Footer from './Footer'
import ShippingPolicy from './ShippingPolicy'
import RefundPolicy from './RefundPolicy'
import TermCondition from './TermCondition'
import TrackOrder from './TrackOrder'
import PrivacyPolicy from './PrivacyPolicy'
import ProductDetails from './ProductDetails'
import CommingSoon from './CommingSoon'
import Cart from './Cart'
import Login from './Login'
import SignUp from './SignUp'
import ForgetPassword from './ForgetPassword'
import Saree from './Saree'
import Wishlist from './Wishlist'
import Checkout from './Checkout'




 
 export default function Allroutes() {
   return (
     <div>
     <Navbar/>
       <Routes> 
       <Route path="/" element={<Homepage/>} />
       <Route path="/newarrivals" element={<Newarrivals/>}/>  
        <Route path="/lather-bag" element={<LatherBag/>}/>
        <Route path="/cotton-bag" element={<CottonBag/>}/>
        <Route path="/imitation-jewellery" element={<ImitationJewellery/>}/>
        <Route path="/kurti" element={<Kurti/>}/>
        <Route path="/suit-length" element={<SuitLength/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/shipping-policy" element={<ShippingPolicy/>}/>
        <Route path="/refund-policy" element={<RefundPolicy/>}/>
        <Route path="/term-condition" element={<TermCondition/>}/>
        <Route path="/track-order" element={<TrackOrder/>}/>
        <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/product-details/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/comming-soon' element={<CommingSoon/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/saree' element={<Saree/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path='checkout' element={<Checkout/>}/>
     
  

 



      
      
        
       </Routes>
         <Footer/>
     </div>
   )
 }
 