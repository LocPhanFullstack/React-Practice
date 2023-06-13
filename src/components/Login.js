import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { loginAPI } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required!!!');
            return;
        }
        setShowLoading(true);
        let res = await loginAPI(email.trim(), password);
        if (res && res.token) {
            loginContext(email, res.token);
            toast.success('Login Successfully!!!');
            navigate('/users');
        } else {
            if (res && res.status === 400) {
                toast.error('User not found!!!');
            }
        }
        setShowLoading(false);
    };

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
                {showLoading && <i className="fa-solid fa-sync fa-spin"></i>} Login
            </button>
            <div className="back">
                <i className="fa-solid fa-angles-left"></i>
                <span onClick={() => handleGoBack()}> Back to Home</span>
            </div>
        </div>
    );
};

export default Login;
