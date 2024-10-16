import React, { useState } from 'react';
import './Homepage.css';

export default function Homepage() {
  // Define the state to track which hearts are red
  const [liked, setLiked] = useState([false, false, false, false, false, false]); // Adjust number of products if needed

  // Function to toggle hearts
  const toggleHeart = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };
  return (
    <div>
      {/* Carousel Start  */}
      <div className="container-flud cr">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/assets/images/carousel/c1.jpeg" class="d-block w-100" />
            </div>
            <div class="carousel-item" >
              <img src="/assets/images/carousel/c2.jpeg" class="d-block w-100" />
            </div>
            <div class="carousel-item">
              <img src="/assets/images/carousel/c3.jpeg" class="d-block w-100" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Marquee Start */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mq">
            <marquee behavior="scroll" scrollamount="12" direction="left">
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span> &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span> &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>&nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>&nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>&nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>
            </marquee>
          </div>
        </div>
      </div>
      {/* Marquee End */}   {/* Product card Start */}






      <center>

        <div className="container mt-8">
          <div className="row">
            <center>
              <h1>OUR NEW COLLECTION</h1>
            </center>
            <div className="col-md-3">
              <div class="card" >
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <a href="/product-details" className="image-container">
                    <img
                      src="https://dsafashionwear.com/images/DSA_01/DSA_01.jpg"
                      alt="..."
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </a>

                  {/* Heart icon container */}
                  <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                    {/* Blank Heart - shown if not liked */}
                    {!liked[0] && (
                      <a onClick={() => toggleHeart(0)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                        </svg>
                      </a>
                    )}

                    {/* Red Heart - shown if liked */}
                    {liked[0] && (
                      <a onClick={() => toggleHeart(0)}>
                        <svg
                          className="w-7"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 107.39"
                        >
                          <defs>
                            <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                          </defs>
                          <path
                            className="cls-1"
                            d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>



                <div class="card-body">
                  <h5 class="card-title">Katan Silk With Silver Zari Work</h5>
                  <p>(Pink and Green, Thin Printed Border)</p>
                </div>
                <ul class="list-group list-group-flush">

                  <li class="list-group-item"><p class="card-text"><b>₹3500</b> &nbsp;&nbsp;<s>₹3990</s>&nbsp;<b className='text-amber-400'>(14% Off)</b></p>
                    <a href="#"><p class="rating">4.7 &nbsp;<i class="fa fa-star"></i></p></a></li>
                </ul>
                <div class="card-body">

                  <button class="button-28" role="button">Add To Cart</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class="card" >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                  <a href="/product-details" className="image-container">
                    <img
                      src="https://dsafashionwear.com/images/DSA_02/DSA_02.jpg"
                      alt="..."
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </a>

                  {/* Heart icon container */}
                  <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                    {/* Blank Heart - shown if not liked */}
                    {!liked[1] && (
                      <a onClick={() => toggleHeart(1)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                        </svg>
                      </a>
                    )}

                    {/* Red Heart - shown if liked */}
                    {liked[1] && (
                      <a onClick={() => toggleHeart(1)}>
                        <svg
                          className="w-7"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 107.39"
                        >
                          <defs>
                            <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                          </defs>
                          <path
                            className="cls-1"
                            d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <div class="card-body">
                  <h5 class="card-title">Banarasi Cottan  Silk Saree</h5>
                  <p>(Dark Green With Orage Golden Border)</p>

                </div>
                <ul class="list-group list-group-flush">

                  <li class="list-group-item"><p class="card-text"><b>₹3400</b> &nbsp;&nbsp;<s>₹3808</s>&nbsp;<b className='text-amber-400'>(12% Off)</b></p>
                    <a href="#"><p class="rating">4.5 &nbsp;<i class="fa fa-star"></i></p></a></li>
                </ul>
                <div class="card-body">

                  <button class="button-28" role="button">Add To Cart</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class="card" >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                  <a href="/product-details" className="image-container">
                    <img
                      src="https://dsafashionwear.com/images/DSA_03/DSA_03.jpg"
                      alt="..."
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </a>

                  {/* Heart icon container */}
                  <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                    {/* Blank Heart - shown if not liked */}
                    {!liked[2] && (
                      <a onClick={() => toggleHeart(2)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                        </svg>
                      </a>
                    )}

                    {/* Red Heart - shown if liked */}
                    {liked[2] && (
                      <a onClick={() => toggleHeart(2)}>
                        <svg
                          className="w-7"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 107.39"
                        >
                          <defs>
                            <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                          </defs>
                          <path
                            className="cls-1"
                            d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Katan Silk With Silver Zari Work Material Composition</h5>
                  <p>(Reddish Orange and Green)</p>

                </div>
                <ul class="list-group list-group-flush">

                  <li class="list-group-item"><p class="card-text"><b>₹3500</b> &nbsp;&nbsp;<s>₹3815</s>&nbsp;<b className='text-amber-400'>(9% Off)</b></p>
                    <a href="#"><p class="rating">4.7 &nbsp;<i class="fa fa-star"></i></p></a></li>
                </ul>
                <div class="card-body">

                  <button class="button-28" role="button">Add To Cart</button>
                </div>
              </div>

            </div>
            <div className="col-md-3">
              <div class="card" >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                  <a href="/product-details" className="image-container">
                    <img
                      src="https://dsafashionwear.com/images/DSA_04/DSA_04.jpg"
                      alt="..."
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </a>

                  {/* Heart icon container */}
                  <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                    {/* Blank Heart - shown if not liked */}
                    {!liked[3] && (
                      <a onClick={() => toggleHeart(3)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                        </svg>
                      </a>
                    )}

                    {/* Red Heart - shown if liked */}
                    {liked[3] && (
                      <a onClick={() => toggleHeart(3)}>
                        <svg
                          className="w-7"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 107.39"
                        >
                          <defs>
                            <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                          </defs>
                          <path
                            className="cls-1"
                            d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Katan Silk With Silver Zari Work Material Composition</h5>
                  <p>(Mustard Yellow and Green)</p>

                </div>
                <ul class="list-group list-group-flush">

                  <li class="list-group-item"><p class="card-text"><b>₹3500</b> &nbsp;&nbsp;<s>₹4095</s>&nbsp;<b className='text-amber-400'>(17% Off)</b></p>
                    <a href="#"><p class="rating">4.8 &nbsp;<i class="fa fa-star"></i></p></a></li>
                </ul>
                <div class="card-body">

                  <button class="button-28" role="button">Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>




        {/* Product Card second Start */}
        <div className="container mt-7">
          <div className="row">
            <div className="col-md-3">
              <div class="card" >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                  <a href="/product-details" className="image-container">
                    <img
                      src="https://dsafashionwear.com/images/DSA_05/DSA_05.jpg"
                      alt="..."
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </a>

                  {/* Heart icon container */}
                  <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                    {/* Blank Heart - shown if not liked */}
                    {!liked[4] && (
                      <a onClick={() => toggleHeart(4)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                        </svg>
                      </a>
                    )}

                    {/* Red Heart - shown if liked */}
                    {liked[4] && (
                      <a onClick={() => toggleHeart(4)}>
                        <svg
                          className="w-7"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 107.39"
                        >
                          <defs>
                            <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                          </defs>
                          <path
                            className="cls-1"
                            d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Katan Silk With Silver Zari Work</h5>
                  <p>(Yello, Hand-work)</p>

                </div>
                <ul class="list-group list-group-flush">

                  <li class="list-group-item"><p class="card-text"><b>₹3500</b> &nbsp;&nbsp;<s>₹3990</s>&nbsp;<b className='text-amber-400'>(14% Off)</b></p>
                    <a href="#"><p class="rating">4.8 &nbsp;<i class="fa fa-star"></i></p></a></li>
                </ul>
                <div class="card-body">

                  <button class="button-28" role="button">Add To Cart</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class="card " >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                  <a href="/product-details" className="image-container">
                    <img
                      src="https://dsafashionwear.com/images/DSA_06/DSA_06.jpg"
                      alt="..."
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </a>

                  {/* Heart icon container */}
                  <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                    {/* Blank Heart - shown if not liked */}
                    {!liked[5] && (
                      <a onClick={() => toggleHeart(5)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                        </svg>
                      </a>
                    )}

                    {/* Red Heart - shown if liked */}
                    {liked[5] && (
                      <a onClick={() => toggleHeart(5)}>
                        <svg
                          className="w-7"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 107.39"
                        >
                          <defs>
                            <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                          </defs>
                          <path
                            className="cls-1"
                            d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Banarasi Cottan <br /> Silk Saree</h5>
                  <p>(Rani Pink with Purple Gold Work)</p>

                </div>
                <ul class="list-group list-group-flush">

                  <li class="list-group-item"><p class="card-text"><b>₹3400</b> &nbsp;&nbsp;<s>₹3808</s>&nbsp;<b className='text-amber-400'>(12% Off)</b></p>
                    <a href="#"><p class="rating">4.9 &nbsp;<i class="fa fa-star"></i></p></a></li>
                </ul>
                <div class="card-body">

                  <button class="button-28" role="button">Add To Cart</button>
                </div>
              </div></div>
            <div className="col-md-3">
              <div class="card" >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                  <a href="/product-details" className="image-container">
                    <img
                      src="https://dsafashionwear.com/images/DSA_07/DSA_07.jpg"
                      alt="..."
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </a>

                  {/* Heart icon container */}
                  <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                    {/* Blank Heart - shown if not liked */}
                    {!liked[6] && (
                      <a onClick={() => toggleHeart(6)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                        </svg>
                      </a>
                    )}

                    {/* Red Heart - shown if liked */}
                    {liked[6] && (
                      <a onClick={() => toggleHeart(6)}>
                        <svg
                          className="w-7"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 107.39"
                        >
                          <defs>
                            <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                          </defs>
                          <path
                            className="cls-1"
                            d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Katan Silk With Silver Zari Work </h5>
                  <p>(Blue)</p>

                </div>
                <ul class="list-group list-group-flush">

                  <li class="list-group-item"><p class="card-text"><b>₹3500</b> &nbsp;&nbsp;<s>₹3815</s>&nbsp;<b className='text-amber-400'>(9% Off)</b></p>
                    <a href="#"><p class="rating">4.5 &nbsp;<i class="fa fa-star"></i></p></a></li>
                </ul>
                <div class="card-body">

                  <button class="button-28" role="button">Add To Cart</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">

              <div class="card" >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                  <a href="/product-details" className="image-container">
                    <img
                      src="https://dsafashionwear.com/images/DSA_08/DSA_08.jpg"
                      alt="..."
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </a>

                  {/* Heart icon container */}
                  <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                    {/* Blank Heart - shown if not liked */}
                    {!liked[0] && (
                      <a onClick={() => toggleHeart(0)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                        </svg>
                      </a>
                    )}

                    {/* Red Heart - shown if liked */}
                    {liked[0] && (
                      <a onClick={() => toggleHeart(7)}>
                        <svg
                          className="w-7"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 122.88 107.39"
                        >
                          <defs>
                            <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                          </defs>
                          <path
                            className="cls-1"
                            d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Katan Silk With Silver Zari Work Material Composition</h5>
                  <p>(Firozi and Rani Pink)</p>

                </div>
                <ul class="list-group list-group-flush">

                  <li class="list-group-item"><p class="card-text"><b>₹3500</b> &nbsp;&nbsp;<s>₹4095</s>&nbsp;<b className='text-amber-400'>(17% Off)</b></p>
                    <a href="#"><p class="rating">4.7 &nbsp;<i class="fa fa-star"></i></p></a></li>
                </ul>
                <div class="card-body">

                  <button class="button-28" role="button">Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>




        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <a href="/newarrivals"><button class="button-28" role="button">VIEW MORE</button></a></div>
            <div className="col-md-4"></div>

          </div>
        </div>

      </center>

      {/* Category Overview Section Start */}
      <div className="container-fluid">
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -mx-4 -mb-10 text-center">
              <div class="sm:w-1/2 mb-10 px-4">
                <div class="rounded-lg h-64 overflow-hidden">
                  <img alt="content" class="object-cover object-center h-full w-full" src="assets/images/product/bag.jpg" />
                </div>
                <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Discover Our Latest Collection OF Bags</h2>
                <p class="leading-relaxed text-base">Elevate your style with our premium range of bags</p>
                <a href="#">     <button class="button-28" role="button">SHOP BAGS</button></a>
              </div>
              <div class="sm:w-1/2 mb-10 px-4">
                <div class="rounded-lg h-64 overflow-hidden">
                  <img alt="content" class="object-cover object-center h-full w-full" src="assets/images/product/suit.jpg" />
                </div>
                <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Discover Our Latest Collections Of Suits</h2>
                <p class="leading-relaxed text-base">Find the perfect suit for any occasion</p>
                <a href="#">     <button class="button-28" role="button">SHOP SUITS</button></a>

              </div>
            </div>
          </div>
        </section></div>
      {/* Category Overview Section End */}



      {/* Features 2.0 Start */}
      <div className="container">
        <div className="row">
          <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Why Shop with D'Sa Fashion & Home Décor?</h1>

          </div>
          <div className="col-md-3 fe">
            <i className='fa fa-truck text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Fast and reliable shipping to your doorstep.</span>
          </div>

          <div className="col-md-3 fe">
            <i className='fa fa-headset text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Dedicated customer support for all your queries.</span>
          </div>
          <div className="col-md-3 fe">
            <i className='fa fa-lock text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Secure payment options for a safe shopping experience.</span>
          </div>

        </div>
        <div className="row mt-5">
          <div className="col-md-3 fe">
            <i className='fa fa-undo text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Hassle-free returns and refunds within 7 days.</span>
          </div>

          <div className="col-md-3 fe">
            <i className='fa fa-star text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Premium quality products, carefully curated.</span>
          </div>
          <div className="col-md-3 fe">
            <i className='fa fa-th-large text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Enjoy a wide range of collections for every occasion.</span>
          </div>


        </div>

        <div className="row mt-4">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <a href="#">
              <button className="view" role="button">VIEW OUR POLICIES</button>
            </a>
          </div>
          <div className="col-md-4"></div>

        </div>

      </div>
      {/* Features 2.0 End */}

    </div>
  )
}
