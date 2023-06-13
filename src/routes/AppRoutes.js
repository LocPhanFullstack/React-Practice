import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoute from './PrivateRoute';
import TableUser from '../components/TableUser';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUser />
                        </PrivateRoute>
                    }
                ></Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
