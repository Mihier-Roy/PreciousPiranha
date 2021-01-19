import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/register" component={Register} />
                    <Route path="/product/:id" component={Product} />
                    <Route path="/cart/:id?" component={Cart} />
                    <Route path="/shipping" component={Shipping} />
                    <Route path="/payment" component={PaymentMethod} />
                    <Route path="/placeorder" component={PlaceOrder} />
                    <Route path="/order/:id" component={OrderDetails} />
                    <Route exact path="/" component={Home} />
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
