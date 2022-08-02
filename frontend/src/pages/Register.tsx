import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { register, clearRegisterState } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Register = ({ location, history }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    // Identify if the user is to be redirected after registration is complete
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const dispatch = useAppDispatch();
    const { loading, error, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            history.push(redirect);
            dispatch(clearRegisterState());
        }
    }, [dispatch, history, user, redirect]);

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            setMessage("");
            dispatch(register({ name, email, password }));
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {loading && <Loader />}
            {message.length > 0 && <AlertMessage variant="danger">{message}</AlertMessage>}
            {error && <AlertMessage variant="danger">{error}</AlertMessage>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
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
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit">Register</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an account?{" "}
                    <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}> Login In</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default Register;
