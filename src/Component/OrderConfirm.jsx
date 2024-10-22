import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderConfirm = () => {
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
                                <h4>Thank you, Saniya!</h4>
                                <p className="text-muted">Order DSA-25603</p>
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
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <h5>Order details</h5>
                                        <p>Indigo Enchantress - ₹5,200.00</p>
                                        <p>Subtotal: ₹5,200.00</p>
                                        <p>Shipping: Free</p>
                                        <hr />
                                        <h5>Total: ₹5,200.00 (incl. ₹247.62 taxes)</h5>
                                    </div>
                                </Col>
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
                            <h5>Product Details</h5>
                            <div className="d-flex align-items-center mb-3">
                                <Image
                                    src="https://dsafashionwear.com/images/DSA_01/DSA_01.jpg"
                                    rounded
                                    className="-mr-16"
                                />
                                
                            </div>
                            <div className="text-center mt-4">
                                <h6>Indigo Enchantress</h6>
                                    <p>₹5,200.00</p>
                                    <p>Size: Medium</p>
                                <Button variant="outline-primary">View Product</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderConfirm;
