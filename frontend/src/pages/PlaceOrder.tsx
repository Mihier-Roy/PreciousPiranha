import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import AlertMessage from "../components/AlertMessage";
import { createOrder } from "../redux/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const PlaceOrder = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    // Get data from state to check if order was successfully placed
    const { order, success, error, loading } = useAppSelector((state) => state.order);

    if (!cart.shippingAddress.address) {
        navigate("/shipping");
    } else if (!cart.paymentMethod) {
        navigate("/payment");
    }

    // Calculate item, shipping, tax and total prices
    const addDecimals = (num: number) => {
        return Math.round(num * 100) / 100;
    };
    order.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );

    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 10);
    order.taxPrice = addDecimals(0.15 * order.itemsPrice);
    order.totalPrice =
        Number(order.itemsPrice) + Number(order.shippingPrice) + Number(order.taxPrice);

    useEffect(() => {
        if (!loading && success) {
            if ("_id" in order) {
                navigate(`/order/${order._id}`);
            }
        }
    }, [history, success, order, dispatch, loading]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: order.itemsPrice ? order.itemsPrice : 0,
                shippingPrice: order.shippingPrice ? order.shippingPrice : 0,
                taxPrice: order.taxPrice ? order.taxPrice : 0,
                totalPrice: order.totalPrice ? order.totalPrice : 0
            })
        );
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <AlertMessage variant="warning">Your cart is empty</AlertMessage>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
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
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
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
                            <ListGroup.Item>
                                {error && <AlertMessage variant="danger">{error}</AlertMessage>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrder;
