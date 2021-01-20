import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../components/AlertMessage";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { getUserDetails, updateUser } from "../../redux/actions/userActions";
import {
    USER_ADMIN_UPDATE_RESET,
    USER_ADMIN_DETAILS_RESET
} from "../../redux/constants/userConstants";

const UserEdit = ({ match, history }) => {
    const userId = match.params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const { loading: loadingDetails, error: errorDetails, user } = useSelector(
        (state) => state.userDetails
    );
    const { loading, error, success } = useSelector((state) => state.userAdminUpdate);

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_ADMIN_UPDATE_RESET });
            dispatch({ type: USER_ADMIN_DETAILS_RESET });
            history.push("/admin/users");
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, history, userId, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <>
            <Link to="/admin/users" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading && <Loader />}
                {error && <AlertMessage variant="danger">{error}</AlertMessage>}
                {loadingDetails ? (
                    <Loader />
                ) : errorDetails ? (
                    <AlertMessage variant="danger">{errorDetails}</AlertMessage>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isadmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEdit;
