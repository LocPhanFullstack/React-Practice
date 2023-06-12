import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useEffect } from 'react';

function App() {
    const { loginContext } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
        }
    }, []);

    return (
        <>
            <div className="app-container">
                <Header />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<TableUser />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Container>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
