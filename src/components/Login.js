import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux } from '../redux/actions/userAction';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);
    const user = useSelector((state) => state.user.account);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required!!!');
            return;
        }

        dispatch(handleLoginRedux(email, password));
        navigate('/');
    };

    useEffect(() => {
        if (user && user.auth === true) {
            navigate('/');
        }
    }, [user]);

    const handleGoBack = () => {
        navigate('/');
    };

    const handlePressEnter = async (e) => {
        if (e && e.key === 'Enter') {
            await handleLogin();
        }
    };

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login (eve.holt@reqres.in)</div>
            <div className="text">Email or Username</div>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email or Username..."
            />
            <div className="input-2">
                <div className="text">Password</div>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={isShowPassword === true ? 'text' : 'password'}
                    placeholder="Password..."
                    onKeyDown={(e) => handlePressEnter(e)}
                />
                <i
                    className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>

            <button
                onClick={() => handleLogin()}
                className={email && password ? 'active' : ''}
                disabled={email && password ? false : true}
            >
                {isLoading && <i className="fa-solid fa-sync fa-spin"></i>} Login
            </button>
            <div className="back">
                <i className="fa-solid fa-angles-left"></i>
                <span onClick={() => handleGoBack()}> Back to Home</span>
            </div>
        </div>
    );
};

export default Login;
