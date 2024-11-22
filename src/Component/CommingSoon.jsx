import React from 'react';
import './Comming.css'; 

const ComingSoon = () => {
    return (
        <div className="coming-soon-container">
            <div className="sec">
                <h1 className="coming-soon-title text-white p11">🚀 Coming Soon!</h1>
                <hr />
                <p className="coming-soon-message text-white">
                    Great things are on the way! Stay tuned for exciting products from <br />
                    <span className="brand-name text-white"> D'Sa Fashion And Home Decor</span>! 🎉
                </p>
                <p className="coming-soon-submessage text-white">
                    "Fashion and decor that speak to your soul!" 🛍️✨
                </p>
                <div className="timer text-white">
                    <p>⏳ We're working hard to launch this section!</p>
                </div>
                <p className="stay-tuned text-white">Thank you for your patience! 💖</p> <br /><br />
                <a href="/">  <button class="button-2" role="button">Go To Home-Page</button></a>
            </div>



            <style jsx>{`
                 
              
            `}</style>
        </div>
    );
};

export default ComingSoon;
