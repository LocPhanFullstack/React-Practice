import { toast } from 'react-toastify';
import { loginAPI } from '../../services/userService';

export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const FETCH_USER_LOGIN_ERROR = 'FETCH_USER_LOGIN_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';

export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN });

        let res = await loginAPI(email.trim(), password);
        if (res && res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('email', email);
            dispatch({ type: FETCH_USER_LOGIN_SUCCESS, data: { email, token: res.token } });
            toast.success('Login Successfully!!!');
        } else {
            if (res && res.status === 400) {
                toast.error('User not found!!!');
            }
            dispatch({ type: FETCH_USER_LOGIN_ERROR });
        }
    };
};

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT,
        });
        toast.success('Logout Successfully!!!');
    };
};

export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH,
        });
    };
};
