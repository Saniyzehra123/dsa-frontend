import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderConfirm = () => {
 const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [loginUser, setLoginUser] = useState();

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
                                <h4>Thank you, {orderDetails[0]?.customer_name || 'Customer'}!</h4> {/* Conditional rendering */}
                                <p className="text-muted">Order ID-{orderDetails[0]?.order_id || 'N/A'}</p>
                            </div>

                            {/* Order Info */}
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <h5>Shipping address</h5>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.032932746216!2d81.89136531498106!3d26.796871283181917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957e5545b7fd1%3A0x61e8cb58c5123f68!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1633518957975!5m2!1sen!2sin"
                                            title="map"
                                            width="100%" height="200px"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"></iframe>
                                    </div>
                                </Col>
                                {/* <Col lg={6}>
                                    <div className="mb-3">
                                        <h5>Order details</h5>
                                        <p>Indigo Enchantress - ₹5,200.00</p>
                                        <p>Subtotal: ₹5,200.00</p>
                                        <p>Shipping: Free</p>
                                        <hr />
                                        <h5>Total: ₹5,200.00 (incl. ₹247.62 taxes)</h5>
                                    </div>
                                </Col> */}
                            </Row>

                            {/* Special Voucher Section */}
                            <Row className="mt-4">
                                <Col>
                                    <div className="alert alert-primary text-center">
                                        <h5>Dear Saniya,</h5>
                                        <p>
                                            You can select a discount voucher from our extensive list of partner brands as a special gift just for you!
                                        </p>
                                        <Button variant="primary">Claim Now!</Button>
                                    </div>
                                </Col>
                            </Row>

                            {/* Discount App Section */}
                            <Row className="mt-4 text-center">
                                <Col>
                                    <h5>Thank you for shopping with us!</h5>
                                    <p>Install our app for a seamless shopping experience.</p>
                                    <Button variant="outline-primary">Install DSA Fashion App</Button> <br /><br />
                                    <p>Use code <strong>APP5</strong> to get 5% off your first order.</p>
                                </Col>
                            </Row>
                            <hr />
                            {/* Order Footer */}
                            <Row className="mt-4">
                                <Col lg={6}>
                                    <h6>Contact information:</h6>
                                    <p>zsaniya973@gmail.com</p>
                                    <p>Phone: +916391377235</p>
                                </Col>
                                <Col lg={6}>
                                    <h6>Payment method:</h6>
                                    <p>Cash on Delivery (COD) - ₹3,850.00</p>
                                    <h6>Shipping method:</h6>
                                    <p>Congratulations! You are eligible for free shipping.</p>
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
                                    <div className="ml-3">
                                        <p className="font-weight-bold mb-0">Katan Silk Saree</p>
                                        <p className="text-muted mb-0">{`₹ ${item?.total_price}`}</p>
                                    </div>
                                </div>
                                })
                            }
                            
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p className="mb-0">Subtotal</p>
                                <p className="mb-0">₹5,200.00</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="mb-0">Shipping</p>
                                <p className="mb-0">Free</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center font-weight-bold mt-3" style={{ fontSize: '1.2rem' }}>
                                <p className="mb-0">Total</p>
                                <p className="mb-0">₹5,200.00</p>
                            </div>
                            <p className="float-left text-muted" style={{ fontSize: '0.85rem', marginTop: '-5px' }}>
                                Including ₹247.62 in taxes
                            </p>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderConfirm;
