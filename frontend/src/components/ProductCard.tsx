import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

type Product = {
    _id: number,
    image: string,
    name: string,
    rating: number,
    numReviews: number,
    price: number
}

type Props = {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} sizes="medium" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
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
