import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} sizes="medium" />
            </a>
            <Card.Body>
                <a href={`/products/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </a>
                <Card.Text as="div">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as="h4" className="pt-2">
                    <strong>${product.price}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
