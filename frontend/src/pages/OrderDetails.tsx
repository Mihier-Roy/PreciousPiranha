import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loader";
import { getOrderDetails, payOrder } from "../redux/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const OrderDetails = () => {
    let params = useParams();
    const orderID = params.id;
    const dispatch = useAppDispatch();
    const [sdkReady, setSdkReady] = useState<boolean>(false);

    // Get data from state to check if order was successfully placed
    const { order, error, loading } = useAppSelector((state) => state.order);
    const { success: successPay, loading: loadingPay } = useAppSelector((state) => state.order);

    if (!loading && !error) {
        const addDecimals = (num: number) => {
            return Math.round(num * 100) / 100;
        };
        if (order.orderItems !== undefined) {
            order.itemsPrice = addDecimals(
                order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
            );
        }
    }

    useEffect(() => {
        // Dynamically generate paypal script tag
        const addPayPalScript = async () => {
            const { data } = await axios.get("/api/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (orderID && (!order || successPay || order._id !== orderID)) {
            dispatch(getOrderDetails(orderID));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderID, order, successPay]);

    const successPaymentHandler = (paymentResult: PaymentResult) => {
        if (orderID) {
            dispatch(payOrder({ id: orderID, paymentResult }));
        }
    };

    return loading ? (
        <Loading />
    ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
    ) : (
        <>
            <h2>Order {order._id}</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            {order.user && (
                                <>
                                    <strong>Name: </strong> {order.user.name}
                                    <br />
                                    <strong>Email: </strong> {order.user.email}
                                </>
                            )}
                            {order.shippingAddress && (
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                                    {order.shippingAddress.postalCode},{" "}
                                    {order.shippingAddress.country}
                                </p>
                            )}
                            {order.isDelivered && order.deliveredAt ? (
                                <AlertMessage variant="success">
                                    Delivered on {order.deliveredAt.toString()}
                                </AlertMessage>
                            ) : (
                                <AlertMessage variant="warning">Not Delivered</AlertMessage>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid && order.paidAt ? (
                                <AlertMessage variant="success">
                                    Paid on {order.paidAt.toString()}
                                </AlertMessage>
                            ) : (
                                <AlertMessage variant="warning">Not Paid</AlertMessage>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            <ListGroup variant="flush">
                                {order.orderItems &&
                                    order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.productID}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x ${item.price} = $
                                                    {item.quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loading />}
                                    {!sdkReady ? (
                                        <Loading />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderDetails;
