import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";
import { LinkContainer } from "react-router-bootstrap";
import { getDetails, updateDetails, resetUpdateProfile } from "../redux/slices/userSlice";
import { listOrders } from "../redux/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Profile = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<string>("");
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { loading, error, success, userDetails } = useAppSelector((state) => state.user);
    const { user } = useAppSelector((state) => state.auth);
    const {
        userOrders,
        loading: loadingOrders,
        error: errorOrders
    } = useAppSelector((state) => state.order);

    useEffect(() => {
        if (!user) {
            history.push("/");
        } else {
            if (!userDetails || !userDetails.name || success) {
                dispatch(getDetails());
                dispatch(listOrders());
                dispatch(resetUpdateProfile());
            } else {
                setName(userDetails.name);
                setEmail(userDetails.email);
            }
        }
    }, [dispatch, history, user, userDetails, success]);

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateDetails({ name, email, password }));
            setUpdateSuccess(true);
            setMessage("");
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
        }
    };
    return (
        <Row>
            <Col md={3}>
                <h3>Your Details</h3>
                {loading && <Loader />}
                {message.length > 0 && <AlertMessage variant="danger">{message}</AlertMessage>}
                {updateSuccess && <AlertMessage variant="success">Profile updated</AlertMessage>}
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
                    <Button type="submit">Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h3>My Orders</h3>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <AlertMessage variant="danger">{errorOrders}</AlertMessage>
                ) : (
                    <Table striped bordered hover responsive className="table=sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{new Date(order.createdAt).toDateString()}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            <span className="text-success">
                                                {new Date(order.paidAt).toDateString()}
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                <i className="fas fa-times"></i>
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            <span className="text-success">
                                                {new Date(order.deliveredAt).toDateString()}
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                <i className="fas fa-times"></i>
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="outline-primary">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default Profile;
