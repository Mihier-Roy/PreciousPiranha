import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { listProductDetails } from "../redux/actions/productActions";
import { Link } from "react-router-dom";

const Product = ({ match }) => {
    const dispatch = useDispatch();

    const { loading, error, product } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <AlertMessage variant="danger">{error}</AlertMessage>
            ) : (
                <>
                    <Row>
                        <Link to="/">
                            <Button type="button" variant="light">
                                <i class="fas fa-arrow-left" style={{ paddingRight: 5 }}></i>Back
                            </Button>
                        </Link>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Price</strong>: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Description</strong>: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>{product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        disabled={product.countInStock < 1 ? true : false}
                                    >
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default Product;
