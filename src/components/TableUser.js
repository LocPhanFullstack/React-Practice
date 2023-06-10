import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchAllUser } from '../services/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';

const TableUser = () => {
    const [listUser, setListUser] = useState([]);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const handleCloseAddNew = () => {
        setIsShowModalAddNew(false);
    };

    const handleCloseEdit = () => {
        setIsShowModalEdit(false);
    };

    const handleUpdateUser = (user) => {
        setListUser([user, ...listUser]);
    };

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            // setTotalUsers(res.total);
            setListUser(res.data);
            setTotalPages(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    useEffect(() => {
        getUsers(1);
    }, []);

    return (
        <>
            <div className="my-3 add-new">
                <h4>List Users:</h4>
                <button className="btn btn-primary" onClick={() => setIsShowModalAddNew(true)}>
                    Add a new user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, i) => {
                            return (
                                <tr key={`user-${i}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => handleEditUser(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger mx-2">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={2}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleCloseAddNew}
                handleUpdateTable={handleUpdateUser}
            />
            <ModalEdit show={isShowModalEdit} handleClose={handleCloseEdit} dataUserEdit={dataUserEdit} />
        </>
    );
};

export default TableUser;
