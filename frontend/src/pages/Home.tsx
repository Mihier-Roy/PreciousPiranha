import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { listProducts } from "../redux/slices/productSlice";

const Home = () => {
    const dispatch = useAppDispatch();

    // Set state to items retrieved from the API call
    const { loading, error, products } = useAppSelector((state) => state.product);

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
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <ProductCard product={product} />
                            </Col>
                        ))
                    ) : (
                        <AlertMessage variant="info">
                            It appears that there are no products in the database!
                        </AlertMessage>
                    )}
                </Row>
            )}
        </>
    );
};

export default Home;
