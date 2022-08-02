import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { getUserDetails, updateUser, resetState } from "../../redux/slices/adminSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const UserEdit = ({ match, history }) => {
    const userId = match.params.id;
    const dispatch = useAppDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        loading: loadingDetails,
        error: errorDetails,
        success: updateSuccess,
        user
    } = useAppSelector((state) => state.admin);

    useEffect(() => {
        if (updateSuccess) {
            dispatch(resetState());
            history.push("/admin/users");
        } else {
            if (user) {
                if (!user.name || user._id !== userId) {
                    dispatch(getUserDetails(userId));
                } else {
                    setName(user.name);
                    setEmail(user.email);
                    setIsAdmin(user.isAdmin);
                }
            }
        }
    }, [dispatch, history, userId, user, updateSuccess]);

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
