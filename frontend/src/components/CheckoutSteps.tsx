import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type Props = {
    step1: boolean,
    step2: boolean,
    step3: boolean,
    step4: boolean,
}

const CheckoutSteps = ({ step1, step2, step3, step4 } : Props) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link className="text-center">
                            <i className="far fa-check-circle"></i>
                            <br />
                            Sign In
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="text-center">
                        <i className="fas fa-circle"></i>
                        <br />
                        Sign In
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Nav.Link className="text-center">
                            <i className="far fa-check-circle"></i>
                            <br />
                            Shipping
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="text-center">
                        <i className="fas fa-circle"></i>
                        <br />
                        Shipping
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link className="text-center">
                            <i className="far fa-check-circle"></i>
                            <br />
                            Payment
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="text-center">
                        <i className="fas fa-circle"></i>
                        <br />
                        Payment
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder">
                        <Nav.Link className="text-center">
                            <i className="far fa-check-circle"></i>
                            <br />
                            Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled className="text-center">
                        <i className="fas fa-circle"></i>
                        <br />
                        Place Order
                    </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default CheckoutSteps;
