import React from 'react';

export default function About() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <section className="text-gray-600 body-font mt-20">
            <div className="card">
              <h1 className="title">About Us</h1>
              <hr />
              <p className='text-justify'>
                Welcome to D'Sa Fashion & Home Decor, where elegance meets craftsmanship! Founded in 2020-2021 by Supriya, our brand is rooted in the vibrant culture of Lucknow, blending traditional aesthetics with contemporary style.
              </p>
              <p className='text-justify'>
                At D'Sa Fashion, we believe that fashion is not just about clothing—it's an expression of who you are. Our curated collection features a stunning array of sarees, ladies' suits, and exquisite imitation jewelry, designed to elevate your wardrobe for any occasion. Each piece is a testament to our commitment to quality, ensuring that you not only look good but feel confident and graceful.
              </p>
              <p className='text-justify'>
                We take immense pride in showcasing the beauty of Indian textiles, bringing you timeless designs that celebrate both tradition and modernity. Our mission is to help you embrace the rich heritage of India while making a bold statement.
              </p>
              <p className='text-justify'>
                Shopping with us means more than just acquiring a product; it’s about joining a community that values authenticity and craftsmanship. We strive to ensure that every piece you order reflects the true essence of our brand—beautiful, unique, and of the highest quality.
              </p>
              <p className='text-justify'>
                Experience the allure of D'Sa Fashion & Home Decor today. We invite you to explore our collections and discover how you can transform your style with our exquisite offerings. We promise you’ll be back for more!
                Thank you for choosing D'Sa Fashion & Home Decor—where style and tradition come together.
                Happy shopping!
              </p>
            </div>
            <style jsx>{`
              .card {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                padding: 2rem;
                margin: 280px auto; /* Added top margin */
                max-width: 800px; /* Set a max width for larger screens */
                text-align: left; /* Align text to the left for readability */
              }

              .title {
                font-size: 2rem;
                color: #333;
                margin-bottom: 1rem;
              }

              p {
                font-size: 1rem;
                color: #666;
                margin: 10px 0; /* Space between paragraphs */
              }

              @media (max-width: 768px) {
                .title {
                  font-size: 1.5rem; /* Smaller title for mobile */
                }

                p {
                  font-size: 0.9rem; /* Smaller text for mobile */
                }

                .card {
                  padding: 1.5rem; /* Adjust padding for smaller screens */
                  margin: 280px auto; /* Reduce margin on mobile */
                }
              }

              @media (max-width: 480px) {
                .title {
                  font-size: 1.25rem; /* Even smaller title for very small screens */
                }

                p {
                  font-size: 0.8rem; /* Even smaller text for very small screens */
                }
              }
            `}</style>
          </section>
        </div>
      </div>
    </div>
  );
}