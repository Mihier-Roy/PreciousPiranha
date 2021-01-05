import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="py-3">
                <Container>
                    <Route exact path="/" component={Home} />
                    <Route path="/product/:id" component={Product} />
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
