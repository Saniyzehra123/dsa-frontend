import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';
import { useParams } from 'react-router-dom';

const OrderConfirm = () => {
 const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [loginUser, setLoginUser] = useState();
    const [mapUrl, setMapUrl] = useState('');

    function getLoginUser(){
        const data = JSON.parse(sessionStorage.getItem('userData'));
        setLoginUser(data);
    };

    const fetchOrderDetails = async (customer_id, order_id) => {
        console.log("Fetching order details for customer_id:", customer_id, "and order_id:", order_id);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/order/detail/${order_id}`);
            let data = await response.data?.data;
            console.log("Order details response:", response.data);
            setOrderDetails(data || []);
        } catch (error) {
            console.error("Failed to fetch order details:", error);
        }
    };
 
    // Calculate total quantity
  const totalQuantity = orderDetails?.order_items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

    useEffect(() => {
        let customer_id=loginUser?.id;
        if (customer_id && orderId) {
            fetchOrderDetails(customer_id, orderId);
        }
    }, [loginUser?.id]);
   
    useEffect(() => {
        getLoginUser();
        return () => {
            window.removeEventListener('storage', getLoginUser);
        };
    }, []);
    useEffect(() => {
        if (orderDetails?.address) {
            const address = `${orderDetails.address.address}, ${orderDetails.address.city}, ${orderDetails.address.state}, ${orderDetails.address.country}`;
            const encodedAddress = encodeURIComponent(address);
            const googleMapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`;
            setMapUrl(googleMapUrl);
        }
    }, [orderDetails]);
    console.log("orders", orderDetails);
    return (
        <Container className="my-48">
            <Row>
                {/* Left Column - Card with Order Information */}
                <Col lg={7}>
                    <Card className="shadow-lg" style={{ width: '100%' }}>
                        <Card.Body>
                            {/* Order Header */}
                            <div className="text-center mb-4">
                                <h1 className="logo mb-3">D'Sa Fashion Wear & Home Decore</h1>
                                <h4>Thank you, {orderDetails.customer_name || 'Customer'}!</h4> {/* Conditional rendering */}
                                <p className="text-muted">Order ID-{orderDetails.order_id || 'N/A'}</p>
                            </div>

                            {/* Order Info */}
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                    <p>{orderDetails?.address?.address || 'N/A'}</p>
                                        <p>{`${orderDetails?.address?.city || ''}, ${orderDetails?.address?.state || ''}`}</p>
                                        <p>{orderDetails?.address?.country || 'N/A'}</p>
                                        <p>Pin Code: {orderDetails?.address?.pincode || 'N/A'}</p>
                                        {/* <iframe
                                            src={mapUrl}
                                            title="Shipping Address Map"
                                            width="100%"
                                            height="200px"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                        ></iframe> */}
                                    </div>
                                </Col>

                            </Row>
                            
                            <hr />
                            {/* Order Footer */}
            <Row className="mt-4 mb-4"> {/* Add margin-bottom here */}
                    <h3 className="text-left">Order Details</h3>
                      
                    <Col md={6}>
                        <h6 className="text-left">Contact Information</h6>
                        <p className="order-details-text">{orderDetails?.customer_email || 'N/A'}</p>
                        
                        <h6 className="text-left">Shipping Address</h6>
                        <p className="order-details-text">{`${orderDetails?.address?.firstname || ''} ${orderDetails?.address?.lastname || ''}`}</p>
                        <p className="order-details-text">{orderDetails?.address?.address || 'N/A'}</p>
                        <p className="order-details-text">{orderDetails?.address?.landmark || 'N/A'}</p>
                        <p className="order-details-text">{`${orderDetails?.address?.city || ''}, ${orderDetails?.address?.state || ''}`}</p>
                        <p className="order-details-text">{orderDetails?.address?.country || 'N/A'}</p>
                        <p className="order-details-text">Pin Code: {orderDetails?.address?.pincode || 'N/A'}</p>
                        <p className="order-details-text">Phone: {orderDetails?.address?.mobile || 'N/A'}</p>

                        <h6 className="text-left">Shipping Method</h6>
                        <p className="order-details-text">Congratulations! You are eligible for free shipping.</p>
                    </Col>
                    
                    <Col md={6}>
                        <h6 className="text-left">Payment Method</h6>
                        <p className="order-details-text">Cash on Delivery (COD) - ₹{orderDetails?.total_amount || 'N/A'}</p>
                        {/* <h6 className="text-left">Billing Address</h6>
                        <p className="order-details-text">{`${orderDetails?.billing_address?.firstname || ''} ${orderDetails?.billing_address?.lastname || ''}`}</p>
                        <p className="order-details-text">{orderDetails?.billing_address?.address || 'N/A'}</p>
                        <p className="order-details-text">{orderDetails?.billing_address?.landmark || 'N/A'}</p>
                        <p className="order-details-text">{`${orderDetails?.billing_address?.city || ''}, ${orderDetails?.billing_address?.state || ''}`}</p>
                        <p className="order-details-text">{orderDetails?.billing_address?.country || 'N/A'}</p>
                        <p className="order-details-text">Pin Code: {orderDetails?.billing_address?.pincode || 'N/A'}</p>
                        <p className="order-details-text">Phone: {orderDetails?.billing_address?.mobile || 'N/A'}</p> */}
                    </Col>
            </Row>
                            <hr />
                            <div className="text-center mt-5">
                                <Button variant="success">Continue Shopping</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right Column - Product Details */}
                <Col lg={5}>
                    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                        <Card.Body>
                            {
                                orderDetails?.order_items?.map((item)=>{
                                    console.log("data", item)
                                    return <div className="d-flex align-items-center mb-3">
                                    <Image
                                        src={item?.main_image_url}
                                        rounded
                                        style={{ width: '80px', height: '110px' }}
                                    />
                                    <div className="quantity-badge">
                                        {item.quantity} {/* Quantity badge */}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-weight-bold mb-0">{item.title}</p>
                                        <p className="text-muted mb-0">{`₹ ${item?.total_price}`}</p>
                                    </div>
                                </div>
                                })
                            }
                            
                            <hr />

                            <div className="d-flex justify-content-between align-items-center font-weight-bold mt-3" style={{ fontSize: '1.2rem' }}>
                                <p className="mb-0">Total Quantity</p>
                                <p className="mb-0">{totalQuantity}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="mb-0">Subtotal</p>
                                <p className="mb-0">{orderDetails?.total_amount}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="mb-0">Shipping</p>
                                <p className="mb-0">Free</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center font-weight-bold mt-3" style={{ fontSize: '1.2rem' }}>
                                <p className="mb-0">Total</p>
                                <p className="mb-0">{orderDetails?.total_amount}</p>
                            </div>
                            <p className="float-left text-muted" style={{ fontSize: '0.85rem', marginTop: '-5px' }}>
                                Including ₹247.62 in taxes
                            </p>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <style jsx>{`
                    .quantity-badge {
                    margin-top:-80px;
                    background-color: #8d8988;
                    color: white;
                    border-radius: 15px;
                    padding: 4px 8px;
                    font-size: 10px;
                    font-weight: bold;
                    }
                `}</style>
        </Container>
    );
};

export default OrderConfirm;
