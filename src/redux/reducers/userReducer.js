import {
    FETCH_USER_LOGIN,
    USER_REFRESH,
    FETCH_USER_LOGIN_ERROR,
    FETCH_USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../actions/userAction';

const INITIAL_STATE = {
    account: {
        email: '',
        auth: null,
        token: '',
    },
    isLoading: false,
    isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    email: action.data.email,
                    auth: true,
                    token: action.data.token,
                },
                isLoading: false,
                isError: false,
            };
        case FETCH_USER_LOGIN_ERROR:
            return {
                ...state,
                account: {
                    auth: false,
                },
                isLoading: false,
                isError: true,
            };
        case USER_LOGOUT:
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            return {
                ...state,
                account: {
                    email: '',
                    token: '',
                    auth: false,
                },
            };
        case USER_REFRESH: {
            return {
                ...state,
                account: {
                    email: localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                    auth: true,
                },
            };
        }
        default:
            return state;
    }
};

export default userReducer;
