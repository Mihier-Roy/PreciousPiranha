import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { getDetails, updateDetails, resetUpdateProfile } from "../redux/actions/userActions";

const Profile = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.userProfile);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { success, updateError } = useSelector((state) => state.userUpdateProfile);

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else {
            if (!user || !user.name || success) {
                dispatch(getDetails());
                dispatch(resetUpdateProfile());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, user, userInfo, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateDetails({ name, email, password }));
            setUpdateSuccess(true);
            setMessage(null);
            setTimeout(() => {
                setUpdateSuccess(null);
            }, 3000);
        }
    };
    return (
        <Row>
            <Col md={4}>
                <h3>Your Details</h3>
                {loading && <Loader />}
                {message && <AlertMessage variant="danger">{message}</AlertMessage>}
                {updateSuccess && <AlertMessage variant="success">Profile updated</AlertMessage>}
                {(error || updateError) && (
                    <AlertMessage variant="danger">{error || updateError}</AlertMessage>
                )}
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
                    <Button type="submit">Update</Button>
                </Form>
            </Col>
            <Col md={8}></Col>
        </Row>
    );
};

export default Profile;
