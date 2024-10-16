import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { removeFromCart } from '../Redux/Cart/cartAction'; // Import necessary actions

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);

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
        navigate('/checkout', { state: { products: cartData, discount } }); // Navigate to checkout
    };

    return (
        <div className="container mt-36">
            <h2 className="text-center">Cart</h2>
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
                                    <h5 className="card-title">{product.saree_name}</h5>
                                    <p>{product.description}</p>
                                    <p className="card-text">
                                        <b>₹{product.price}</b> <s>₹{product.price + (product.price * 0.2)}</s>
                                        <b className="text-amber-400">(20% Off)</b>
                                    </p>
                                    <p className="rating">4.8 <i className="fa fa-star"></i></p>
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
                }
                .product-list {
                    width: 65%;
                }
                .subtotal-banner {
                    width: 30%;
                    margin-top: 20px;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    text-align: right;
                    height: 550px;
                }
                .coupon-slider {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                }
                .coupon-card {
                    border: 1px dashed #ccc;
                    padding: 10px;
                    border-radius: 5px;
                    text-align: center;
                    position: relative;
                }
                .coupon-code {
                    font-weight: bold;
                }
                .fa-copy {
                    cursor: pointer;
                    margin-left: 10px;
                }
                .scissor-icon {
                    position: absolute;
                    left: -10px;
                    top: 0;
                    background: white;
                }
                .coupon-input-section {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .form-control {
                    width: 60%;
                }
                .apply-coupon-button {
                    margin-left: 10px;
                }
                .btn-success {
                    margin-left: 10px;
                }
            `}</style>
        </div>
    );
};

export default Cart;
