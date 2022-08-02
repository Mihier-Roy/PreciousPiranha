import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { login } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Login = ({ location, history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Identify if the user is to be redirected after login is complete
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const dispatch = useAppDispatch();
    const { loading, error, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            history.push(redirect);
        }
    }, [history, user, redirect]);

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {loading && <Loader />}
            {error && <AlertMessage variant="danger">{error}</AlertMessage>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit">Sign In</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Don't have an account?{" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                        {" "}
                        Register Now
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default Login;
