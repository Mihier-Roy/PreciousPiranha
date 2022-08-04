import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import PaymentMethod from "./pages/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetails from "./pages/OrderDetails";
import UserList from "./pages/Admin/UserList";
import UserEdit from "./pages/Admin/UserEdit";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />}>
                            <Route path=":id" element={<Cart />} />
                        </Route>
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/payment" element={<PaymentMethod />} />
                        <Route path="/placeorder" element={<PlaceOrder />} />
                        <Route path="/order/:id" element={<OrderDetails />} />
                        <Route path="/admin/users" element={<UserList />} />
                        <Route path="/admin/user/edit/:id" element={<UserEdit />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
