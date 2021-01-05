import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { listProducts } from "../redux/actions/productActions";

const Home = () => {
    const dispatch = useDispatch();

    // Set state to items retrieved from the API call
    const { loading, error, products } = useSelector((state) => state.productList);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <AlertMessage variant="danger">{error}</AlertMessage>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default Home;
