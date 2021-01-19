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
        try {
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500);
            throw new Error("Unable to place order. Please try again.");
        }
    }
});

// Description 	: Returns an order
// Route 		: GET /api/orders/:id
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) res.json(order);
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});
