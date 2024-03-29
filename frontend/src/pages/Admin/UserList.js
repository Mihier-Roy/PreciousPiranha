import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../components/AlertMessage";
import Loader from "../../components/Loader";
import { getAllUsers, deleteUser } from "../../redux/actions/userActions";

const UserList = ({ history }) => {
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector((state) => state.userList);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { success } = useSelector((state) => state.userDelete);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllUsers());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo, success]);

    const deleteUserHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <AlertMessage variant="danger">{error}</AlertMessage>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i className="fas fa-check" style={{ color: "green" }}></i>
                                    ) : (
                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/edit/${user._id}`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteUserHandler(user._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserList;
