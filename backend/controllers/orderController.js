import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Description 	: Create a new order
// Route 		: POST /api/orders
export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No items in cart");
    } else {
        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            user: req.user._id
        });
        const createdOrder = order.save();
        res.status(201).json(createdOrder);
    }
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
