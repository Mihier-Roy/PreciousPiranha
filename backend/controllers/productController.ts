import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

// Description 	: Returns all products
// Route 		: GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Description 	: Returns single product
// Route 		: GET /api/product
export const getProductsByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});
