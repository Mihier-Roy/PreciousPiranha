/* 
	- This script is used to seed data into the database.
	- NOTE: Using this script will ERASE ALL DATA present within the database.
*/
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import connectDB from "../config/db.js";
import users from "./users.js";
import products from "./products.js";
import logger from "../logger.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Function to import data specified in users.js and products.js
const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        // Insert Users
        const insertedUsers = await User.insertMany(users);
        // Assign Admin user as "owner" of all products
        const admin = insertedUsers[0];
        const testProducts = products.map((product) => ({ ...product, user: admin }));
        // Insert Products
        await Product.insertMany(testProducts);

        logger.warn("Successfully seeded database.");
        process.exit();
    } catch (error) {
        logger.error(`Error while seeding database. Error: ${error}.`);
        process.exit(1);
    }
};

const removeData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        logger.warn("Successfully removed all data.");
        process.exit();
    } catch (error) {
        logger.error(`Error while removing data from database. Error: ${error}.`);
        process.exit(1);
    }
};

// Execute removeData if script is called with the '-d' flag.
if (process.argv[2] === "-d") {
    removeData();
} else {
    importData();
}
