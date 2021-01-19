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

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/shipping" component={Shipping} />
                    <Route path="/payment" component={PaymentMethod} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/register" component={Register} />
                    <Route path="/product/:id" component={Product} />
                    <Route path="/cart/:id?" component={Cart} />
                    <Route exact path="/" component={Home} />
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
