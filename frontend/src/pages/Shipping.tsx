import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Shipping = ({ history }) => {
    const dispatch = useAppDispatch();
    const { shippingAddress } = useAppSelector((state) => state.cart);
    const { address, city, postalCode, country } = shippingAddress;

    const [stateAddress, setStateAddress] = useState<string>(address);
    const [stateCity, setStateCity] = useState<string>(city);
    const [statePostalCode, setStatePostalCode] = useState<string>(postalCode);
    const [stateCountry, setStateCountry] = useState<string>(country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push("/payment");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={stateAddress}
                        required
                        onChange={(e) => setStateAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={stateCity}
                        required
                        onChange={(e) => setStateCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postal code"
                        value={statePostalCode}
                        required
                        onChange={(e) => setStatePostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={stateCountry}
                        required
                        onChange={(e) => setStateCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default Shipping;
