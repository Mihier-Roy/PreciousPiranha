import React from "react";
import { Alert } from "react-bootstrap";

type Props = {
    variant: "primary" | "secondary" | "success" | "danger" | "warning" | "info",
    children?: React.ReactNode;
}

const AlertMessage = ({ variant, children }: Props) => {
    return <Alert variant={variant}>{children}</Alert>;
};

export default AlertMessage;
