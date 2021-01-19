import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";
import axios from "axios";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    // Get product information from the API
    const { data } = await axios.get(`/api/products/${id}`);

    // Dispatch product information to the cartReducer where it will be added to the cartItems array
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productID: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity: quantity
        }
    });

    // Save the cartItems array to local storage so that it may be accessed again even if the user navigates away from the page
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });

    // Update the local storage cartItems value using the state after the product has been removed from the cart
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
};
