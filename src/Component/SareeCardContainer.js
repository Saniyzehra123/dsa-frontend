import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { NavLink } from 'react-router-dom';


function SareeCardContainer({ sortedAndFilteredProducts, placeholder, toggleHeart, liked, addToCart }) {
  return (
    <div className="row saree-card-container">
      {sortedAndFilteredProducts.length > 0 ? (
        sortedAndFilteredProducts.map((saree, index) => (
          <div className="col-md-4" key={saree.item_id}>
            <div className="card c22">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <NavLink to={`/product-details/${saree.item_id}`} className="image-container">
                  <LazyLoadImage
                    src={saree.main_image_url || placeholder}
                    alt={saree.title}
                    effect="blur" // Adds a blur effect while loading
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </NavLink>
                {/* Heart icon container */}
                <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                  <a onClick={() => toggleHeart(saree)}>
                    {liked.some(likedItem => likedItem.id === saree.item_id) ? (
                      <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 107.39">
                      <defs>
                        <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                      </defs>
                      <path className="cls-1" d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z" />
                    </svg>
                    ) : (
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                      </svg>
                    )}
                  </a>
                </div>
              </div>

              <div className="card-body text-center">
                <h6 className="card-title">{saree.title}</h6>
                <p className="card-text text-center">{saree.color_name}</p>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p className="card-text text-center">
                    <b className="text-danger">₹{saree.price}</b>&nbsp;
                    <s className="text-muted">₹{(saree.price * 1.14).toFixed(2)}</s>&nbsp;
                    <span className="text-success">(14% Off)</span>
                  </p>
                  <a href="#">
                    <p className="rating">4.4 &nbsp;<i className="fa fa-star"></i></p>
                  </a>
                </li>
              </ul>
              <div className="card-body">
                <button className="button-28" onClick={() => addToCart(saree)}>Add To Cart</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No sarees available</p>
      )}
    </div>
  );
}

export default SareeCardContainer;
