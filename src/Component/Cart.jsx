import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { removeFromCart } from '../Redux/Cart/cartAction'; // Import necessary actions
import Swal from 'sweetalert2';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [discount, setDiscount] = useState(0);
    const [loginUser, setLoginUser] = useState();
    const [couponCode, setCouponCode] = useState("");

    // Retrieve cart items from localStorage
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('itemlist')) || [];
        setCartData(storedItems); // Set the cart items into state
    }, []);

    const handleRemove = (id) => {
        const updatedItems = cartData.filter((item) => item.id !== id);
        setCartData(updatedItems); // Update state
        localStorage.setItem('itemlist', JSON.stringify(updatedItems)); // Update localStorage
        window.dispatchEvent(new Event('storage'));
    };

    const handleQuantityChange = (id, newQuantity) => {
        const updatedItems = cartData.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartData(updatedItems); // Update state
        localStorage.setItem('itemlist', JSON.stringify(updatedItems)); // Update localStorage
        window.dispatchEvent(new Event('storage'));
    };

    const applyCoupon = () => {
        if (couponCode === "SAVE10") {
            setDiscount(0.1); // 10% discount
        } else if (couponCode === "DIWALI15") {
            setDiscount(0.15); // 15% discount
        } else if (couponCode === "NEWUSER20") {
            setDiscount(0.2); // 20% discount
        } else {
            setDiscount(0);
            alert("Invalid Coupon Code");
        }
    };

    const handleCopyCoupon = (code) => {
        navigator.clipboard.writeText(code);
        alert(`Coupon code ${code} copied to clipboard!`);
    };

    const calculateSubtotal = () => {
        return cartData.reduce((acc, product) => acc + product.price * product.quantity, 0);
    };

    const handleCheckout = () => {
        if(loginUser?.id>0){
            navigate('/checkout', { state: { products: cartData, discount } }); // Navigate to checkout
        }else{
            Swal.fire("You are not loged in!").then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              });
        }
    };

    const getLoginUser = () => {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        setLoginUser(data);
    }

    useEffect(() => {
        getLoginUser();
        return () => {
            window.removeEventListener('storage', getLoginUser);
        };
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center" style={{marginTop:'50px'}}>Cart</h2>
            <div className="cart-container">
                <div className="product-list">
                    {cartData.length === 0 ? (
                        <div className="text-center float-right mr-12 mt-5">
                            <i className="fa fa-shopping-cart fa-5x" aria-hidden="true"></i>
                            <h4>Your cart is empty</h4>
                            <p>Please add some products</p>
                            <a href="/"><button className="btn btn-primary">Go to Home-page</button></a>
                        </div>
                    ) : (
                        cartData.map(product => (
                            <div className="card mb-3" key={product.id} style={{ display: 'flex', flexDirection: 'row', width: '60%' }}>
                                <img
                                    src={product.main_image_url}
                                    className="card-img-left"
                                    alt="Product Image"
                                    style={{ width: '50%', height: 'auto' }}
                                />
                                <div className="card-body text-justify" style={{ flex: 1 }}>
                                    <h5 className="card-title">{product.title}</h5>
                                    <p>{product.description}</p>
                                    <p className="card-text">
                                        <b>₹{product.price}</b> <s>₹{product.price + (product.price * 0.2)}</s>
                                        <b className="text-amber-400">(20% Off)</b>
                                    </p>
                                    <p className="rating w-14">4.8 <i className="fa fa-star"></i></p>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-secondary me-2" onClick={() => handleQuantityChange(product.id, product.quantity - 1)} disabled={product.quantity <= 1}>-</button>
                                        <span className="me-2">{product.quantity}</span>
                                        <button className="btn btn-secondary me-2" onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>+</button>
                                        <button className="btn btn-danger" onClick={() => handleRemove(product.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Subtotal, Coupon Input, and Checkout */}
                {cartData.length > 0 && (
                    <div className="subtotal-banner">
                        <center><h4>Best Coupon for You</h4></center>
                        <div className="coupon-slider">
                            <div className="coupon-card">
                                <i className="fa fa-scissors scissor-icon"></i>
                                <p>Extra Flat 10% off</p>
                                <div className="coupon-code">SAVE10</div>
                                <i className="fa fa-copy" onClick={() => handleCopyCoupon("SAVE10")}></i>
                            </div>
                            <div className="coupon-card">
                                <i className="fa fa-scissors scissor-icon"></i>
                                <p>Extra Flat 15% off</p>
                                <div className="coupon-code">DIWALI15</div>
                                <i className="fa fa-copy" onClick={() => handleCopyCoupon("DIWALI15")}></i>
                            </div>
                        </div>
                        <br />
                        <div className="coupon-input-section">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter coupon code"
                                    className="form-control"
                                />
                                <button className="btn btn-success apply-coupon-button" onClick={applyCoupon}>
                                    Apply Coupon
                                </button>
                            </div>
                        </div>
                        <hr />
                        <h4>Subtotal: ₹{(calculateSubtotal() - (calculateSubtotal() * discount)).toFixed(2)}</h4>
                        <hr />
                        <button className="btn btn-primary mt-4" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                )}
            </div>

            <style jsx>{`
.cart-container {
    display: flex;
    margin-top: 150px; /* Default top margin */
    flex-direction: column; /* Stack on smaller screens */
}

.product-list {
    width: 100%; /* Full width on smaller screens */
}

.subtotal-banner {
    width: 100%; /* Full width on smaller screens */
    margin-top: 20px; /* Space from the top */
    padding: 15px; /* Adjusted padding */
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: right;
}

.coupon-slider {
    display: flex;
    flex-direction: column; /* Stack coupon cards on smaller screens */
    align-items: center; /* Center align items */
}

.coupon-card {
    width: 90%; /* Responsive width for coupon cards */
    margin-bottom: 10px; /* Space between coupon cards */
    text-align: center; /* Center text in coupon cards */

}

.form-control {
    width: 100%; /* Full width on smaller screens */
}

.apply-coupon-button {
    margin-left: 0; /* Remove margin on smaller screens */
}

/* Product card styles */
.card {
    border: 1px solid #ccc; /* Border for product cards */
    border-radius: 10px; /* Rounded corners */
    margin-bottom: 15px; /* Space between product cards */
    padding: 10px; /* Reduced padding */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    background-color: #fff; /* Background color for cards */
    display: flex;
    flex-direction: row; /* Flex layout for product cards */
    width: 100%; /* Full width for product cards */
    box-sizing: border-box; /* Ensure padding/border are included in width */
    margin-top: 10px; /* Add margin-top for spacing */
}

.card-body {
    flex: 1; /* Allow card body to take remaining space */
    display: flex;
    flex-direction: column; /* Align items vertically */
    padding: 5px; /* Padding for card body */
    margin-top:115px;
}

.card-img-left {
    width: 35%; /* Image width reduced further */
    height: auto; /* Maintain aspect ratio */
}

.card-title {
    font-size: 1.25rem; /* Larger title font */
    font-weight: bold; /* Bold title */
    margin: 0; /* Remove default margin */
}

.card-text {
    margin: 0; /* Remove default margin */
}



.d-flex {
    align-items: center; /* Center align buttons */
    justify-content: space-between; /* Align items to the start */
    flex-wrap: nowrap; /* Prevent wrapping */
}

.quantity-controls {
    display: flex; /* Use flexbox for the quantity controls */
    align-items: center; /* Center items vertically */
    justify-content: center; /* Center items horizontally */
}

.quantity-controls .btn {
    margin: 0 5px; /* Space between buttons and number */
    width: 40px; /* Fixed width for buttons */
}

/* Media Queries */
@media (min-width: 768px) {
    .cart-container {
        flex-direction: row; /* Row layout for tablets and larger */
    }

    .product-list {
        width: 65%; /* Maintain original width */
    }

    .subtotal-banner {
        width: 30%; /* Maintain original width */
    }

    .coupon-slider {
        flex-direction: row; /* Row layout for coupon cards */
    }

    .coupon-card {
        width: auto; /* Auto width for larger screens */
        margin-bottom: 0; /* Remove bottom margin */
    }

    .form-control {
        width: 60%; /* Width on larger screens */
    }

    .apply-coupon-button {
        margin-left: 10px; /* Margin on larger screens */
    }
}

@media (max-width: 600px) {
    .cart-container {
        margin-top: 100px; /* Consistent top margin for small screens */
    }

    .subtotal-banner {
        padding: 10px; /* Less padding on smaller screens */
    }

    .coupon-card {
        padding: 5px; /* Less padding on coupon cards */
    }

    .form-control {
        width: 100%; /* Full width for input on extra small screens */
    }

    .product-list {
        flex-direction: column; /* Stack product cards vertically */
    }

    .card {
        margin: 0 auto; /* Center the card */
        margin-bottom: 15px; /* Space between product cards */
        width: 100%; /* Full width for product cards on mobile */
        flex-direction: column; /* Stack card contents vertically on mobile */
    }

    .card-body {
        padding: 10px; /* Adjust padding for mobile */
        max-width: 100%; /* Ensure body doesn't overflow */
        flex-grow: 1; /* Allow body to grow and fit content */
        margin-top:50px;        
    }

    .card-img-left {
        width: 100%; /* Full width for image on small screens */
        max-height: 150px; /* Limit height for images */
        object-fit: cover; /* Maintain aspect ratio */
    }

   

    .d-flex {
        justify-content: space-between; /* Space out buttons */
        flex-wrap: wrap; /* Allow wrapping for small screens */
    }

    .btn {
        flex: 1 1 auto; /* Allow buttons to shrink and grow */
        margin: 5px; /* Add some margin between buttons */
    }
}

@media (max-width: 768px) {
    .subtotal-banner {
        height: auto; /* Adjust height for smaller tablets */
    }

    .coupon-slider {
        flex-direction: column; /* Stack coupon cards */
    }
}


`}</style>
        </div>
    );
};

export default Cart;
