import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const { data } = await axios.get("/api/products");
            setProducts(data);
        };

        loadProducts();
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Home;
