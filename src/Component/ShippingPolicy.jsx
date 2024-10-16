import React from 'react'
import './Navbar.css';

const ShippingPolicy = () => {
  return (
    <div>
      
      <div>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <section className="text-gray-600 body-font mt-20">
          <div className="container px-5 pt-24 mx-auto">
            <div className="flex flex-col text-center w-full">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Shipping Policy</h1><hr />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <div className="container">
    <div className="row c1">
      <div className="col-md-12">
        <h3 className="font-serif">Shipping Policy for D'Sa Fashion & Home Decor</h3><br />
        
        <h4 className="font-serif">Shipping in India</h4>
        <ul className='text-justify'>
          <li><strong>Free Shipping:</strong> Enjoy free shipping on all prepaid orders.</li>
          <li><strong>COD Charges:</strong> An amount of ₹75 will be charged for Cash on Delivery (COD) orders.</li>
          <li><strong>Dispatch Timeline:</strong> Once your domestic order is placed, it will take 3 to 4 business days to dispatch. Delivery will occur within 5 to 7 business days thereafter.</li>
          <li><strong>Estimated Delivery Time:</strong> The total estimated time for delivery is 7 to 10 working days. You will receive tracking details once your order has been shipped.</li>
        </ul>
<br />
        <h4 className="font-serif">International Shipping</h4>
        <ul className='text-justify'>
          <li><strong>Shipping Delays:</strong> Due to COVID-19 regulations, shipping from Pune, India, may be delayed by up to 1 month.</li>
          <li><strong>International Shipping Costs:</strong></li>
        </ul>
        <table className="table">
          <thead>
            <tr>
              <th>Weight</th>
              <th>Shipping Charges</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>0-1 kg</td><td>₹1,500</td></tr>
            <tr><td>1-2 kg</td><td>₹2,000</td></tr>
            <tr><td>2-3 kg</td><td>₹2,500</td></tr>
            <tr><td>3-4 kg</td><td>₹3,000</td></tr>
            <tr><td>4-5 kg</td><td>₹3,500</td></tr>
            <tr><td>5-6 kg</td><td>₹4,000</td></tr>
            <tr><td>6-7 kg</td><td>₹4,500</td></tr>
            <tr><td>7-8 kg</td><td>₹5,000</td></tr>
            <tr><td>8-9 kg</td><td>₹5,500</td></tr>
            <tr><td>9-10 kg</td><td>₹6,000</td></tr>
            <tr><td>10-11 kg</td><td>₹6,500</td></tr>
            <tr><td>11-12 kg</td><td>₹7,000</td></tr>
            <tr><td>12-13 kg</td><td>₹7,500</td></tr>
            <tr><td>13-15 kg</td><td>₹8,000</td></tr>
            <tr><td>15-20 kg</td><td>₹10,000</td></tr>
          </tbody>
        </table>

        <br />
        
        <h4 className="font-serif float-left">Order Cancellation</h4> <br /><br />
        <ul className='text-justify'>
          <li>You can cancel your order within 24 hours. If you do so, a 5% deduction will be made from the total amount to cover PayPal transaction fees.</li>
        </ul>

<br />
        <h4 className="font-serif float-left">Returns</h4><br /><br />
        <ul className='text-justify'>
          <li>If you receive a product you do not like, it can be shipped back within 2 days. Please email us the courier receipt at <a href="mailto:global@dsafashionwear.com">global@dsafashionwear.com</a>. Shipping charges for returns are the customer's responsibility. A 5% deduction from the refund will also apply.</li>
          <li>Upon receiving the returned products, a quality check will be conducted. Please ensure the original packaging is intact.</li>
          <li>Refunds will be issued only for the products, not for shipping costs.</li>
          <li>We do not have an exchange policy for international customers.</li>
          <li>Orders cannot be canceled once they enter the customization process. Customization can be canceled within 48 hours only.</li>
          <li>Freight charges and customs duties for returns must be borne by the customer.</li>
        </ul>

        <br />


        <h4 className="font-serif float-left">Dispatch Timeline for International Orders</h4><br /><br />
        <p className='text-justify'>
          Once an international order is placed, it takes 15 to 20 working days to dispatch. If customization is included, an additional 4 to 5 working days may be required.
        </p>
<br />
        <h4 className="font-serif float-left">Estimated Delivery Time</h4><br /><br />
        <p className='text-justify'>
          The total estimated delivery time is 20 to 25 working days. Tracking details will be provided once the order has been shipped.
        </p>

<br />
        <h4 className="font-serif float-left">Additional Charges</h4><br /><br />
        <p className='text-justify'>
          Prices are inclusive of shipping charges. Any import duties or additional charges must be borne by the customer. If import duties are not paid, the product may be abandoned by customs, and no refund will be provided.
        </p>
<br />
        <h4 className="font-serif float-left">Incorrect Shipping Address</h4><br /><br />
        <p className='text-justify'>
          If a mistake is made in the shipping address, the customer is responsible for any additional charges incurred for address corrections.
        </p>
<br />
        <h4 className="font-serif float-left">Customs Duties</h4><br /><br />
        <p className='text-justify'>
          Customs duties must be paid within 2 days of the shipment's arrival in your location/country.
        </p>

<br />
        <h4 className="font-serif float-left">Delivery Partner</h4><br /><br />
        <p className='text-justify'>
          Our international delivery partner is DHL.
        </p>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default ShippingPolicy