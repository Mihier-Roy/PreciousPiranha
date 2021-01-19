import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const newItem = action.payload;
            const itemExists = state.cartItems.find((item) => item.productID === newItem.productID);

            if (itemExists) {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems.map((item) =>
                            item.productID === newItem.productID ? newItem : item
                        )
                    ]
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem]
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.productID !== action.payload)
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            };
        default:
            return state;
    }
};
