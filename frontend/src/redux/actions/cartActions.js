import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

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
