import React from "react";
import { Container, Col, Row } from "react-bootstrap";

type Props = {
    children: React.ReactNode;
}

const FormContainer = ({ children }: Props) => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default FormContainer;
