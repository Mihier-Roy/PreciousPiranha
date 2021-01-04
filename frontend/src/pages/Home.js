import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import products from "../products";

const Home = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col sm={12} md={4}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Home;
