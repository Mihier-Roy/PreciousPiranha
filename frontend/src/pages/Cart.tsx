import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Col, FormControl, Image, ListGroup, Row } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { addItemToCart, removeItem } from "../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const Cart = () => {
    let params = useParams();
    let navigate = useNavigate();
    let location = useLocation();
    const dispatch = useAppDispatch();

    const productID = Number(params.id);
    const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
    const { cartItems } = useAppSelector((state: RootState) => state.cart);

    useEffect(() => {
        if (productID) {
            dispatch(addItemToCart({ id: productID, quantity }));
        }
    }, [dispatch, productID, quantity]);

    const removeItemHandler = (id: number) => {
        dispatch(removeItem(id));
    };

    const checkoutHandler = () => {
        navigate(`/login?redirect=shipping`);
    };

    return (
        <Row>
            <Col md={8}>
                <h3 className="pt-2 pb-3">Shopping Cart</h3>

                {cartItems.length === 0 ? (
                    <AlertMessage variant="info">
                        There are no items in your cart! <Link to="/">Return</Link>
                    </AlertMessage>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.productID}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.productID}`}>
                                            <h4>{item.name}</h4>
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <FormControl
                                            as="select"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                dispatch(
                                                    addItemToCart({
                                                        id: item.productID,
                                                        quantity: Number(e.target.value)
                                                    })
                                                )
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((count) => (
                                                <option key={count + 1} value={count + 1}>
                                                    {count + 1}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                    <Col md={3}>
                                        <Button
                                            onClick={() => removeItemHandler(item.productID)}
                                            variant="light"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <ListGroup>
                    <ListGroup.Item>
                        <h4>
                            Subtotal (
                            {cartItems.reduce(
                                (accumulator, item) => accumulator + item.quantity,
                                0
                            )}
                            ) items
                        </h4>
                        <h3>
                            $
                            {cartItems.reduce(
                                (accumulator, item) => accumulator + item.quantity * item.price,
                                0
                            )}
                        </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            onClick={checkoutHandler}
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            variant="success"
                        >
                            Proceed to Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    );
};

export default Cart;
