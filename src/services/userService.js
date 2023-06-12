import axios from './customizeAxios';

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post('/api/users', { name, job });
};

const updateUser = (name, job) => {
    return axios.put('/api/users/2', { name, job });
};

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
};

const loginAPI = (email, password) => {
    return axios.post('/api/login', { email, password });
};

export { fetchAllUser, postCreateUser, updateUser, deleteUser, loginAPI };
