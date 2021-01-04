import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </a>
            <Card.Body>
                <a href={`/products/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </a>
                <Card.Text>
                    {product.rating} from {product.numReviews}
                </Card.Text>
                <Card.Text as="h4">
                    <strong>${product.price}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
