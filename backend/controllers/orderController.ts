import { Request } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";

interface OrderRequests extends Request {
    user?: User;
    body: OrderDetails;
}

// Description 	: Create a new order
// Route 		: POST /api/orders
export const addOrderItems = asyncHandler(async (req: OrderRequests, res) => {
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
    } else if (req.user) {
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
    } else {
        res.status(500);
        throw new Error("Unable to place order. Please try again.");
    }
});

// Description 	: Returns an order
// Route 		: GET /api/orders/:id
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (order) res.json(order);
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// Description 	: Sets isPaid to true and adds paymentResult info from payment gateway being used
// Route 		: PUT /api/orders/:id/pay
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now().toString();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// Description 	: Returns orders for the logged in user
// Route 		: GET /api/orders/myorders
export const getOrdersByUser = asyncHandler(async (req: OrderRequests, res) => {
    if (req.user) {
        const orders = await Order.find({ user: req.user });
        res.json(orders);
    }
});
