import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { loginAPI } from '../services/userService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required!!!');
            return;
        }
        let res = await loginAPI(email, password);
        if (res && res.token) {
            localStorage.setItem('token', res.token);
        }
        console.log(res);
    };

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="text">Email or Username</div>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email or Username..."
            />
            <div className="input-2">
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={isShowPassword === true ? 'text' : 'password'}
                    placeholder="Password..."
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
                Login
            </button>
            <div className="back">
                <i className="fa-solid fa-angles-left"></i> Go Back
            </div>
        </div>
    );
};

export default Login;
