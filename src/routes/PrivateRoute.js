import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.user.account);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/login');
    };

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className="mt-3">
                    <Alert.Heading>Oh snap! You got an error!!!</Alert.Heading>
                    <p>You don't have permission to access this route</p>
                </Alert>
                <span className="back-to-login" onClick={() => handleGoBack()}>
                    <i className="fa-solid fa-angles-left"></i> Back to Login
                </span>
            </>
        );
    }

    return <>{children}</>;
};

export default PrivateRoute;
