import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userProfileReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userAdminUpdateReducer,
    userDetailsReducer
} from "./reducers/userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderUserListReducer
} from "./reducers/orderReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userAdminUpdate: userAdminUpdateReducer,
    userDetails: userDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderUserList: orderUserListReducer
});

// Check local storage for cartItems
// If cartItems are present, set the initial state to the values saved in local storage
const cartItems: string|null = localStorage.getItem("cartItems")
const cartItemsFromLocalStorage = cartItems != null ? JSON.parse(cartItems) : [];

// Check local storage for userInfo
// If userInfo is set, set the initial state to the values saved in local 
const userInfo: string|null = localStorage.getItem("userInfo")
const userInfoFromLocalStorage = userInfo != null ? JSON.parse(userInfo) : null;

// Check local storage for shippingAddress
// If shippingAddress is set, set the initial state to the values saved in local storage
const shippingAddress = localStorage.getItem("shippingAddress")
const shippingAddressFromLocalStorage = shippingAddress ? JSON.parse(shippingAddress) : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
