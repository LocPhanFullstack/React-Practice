import React, { useEffect, useState } from 'react';
import './TableUser.scss';
import { Table } from 'react-bootstrap';
import { fetchAllUser } from '../services/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import _, { debounce } from 'lodash';
import ModalConfirm from './ModalConfirm';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import { toast } from 'react-toastify';

const TableUser = () => {
    const [listUser, setListUser] = useState([]);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');
    const [dataExport, setDataExport] = useState([]);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };

    const handleUpdateTable = (user) => {
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

    const handleEditUserFromModal = (user) => {
        let listUserCopy = _.cloneDeep(listUser);
        let index = listUser.findIndex((item) => item.id === user.id);
        listUserCopy[index].first_name = user.first_name;
        setListUser(listUserCopy);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFromModal = (user) => {
        let listUserCopy = _.cloneDeep(listUser);
        listUserCopy = listUser.filter((item) => item.id !== user.id);
        setListUser(listUserCopy);
    };

    const handleSort = (sort, field) => {
        setSortBy(sort);
        setSortField(field);

        let listUserCopy = _.cloneDeep(listUser);
        listUserCopy = _.orderBy(listUserCopy, [sortField], [sortBy]);
        setListUser(listUserCopy);
    };

    const handleSearch = debounce((e) => {
        let term = e.target.value;
        if (term) {
            let listUserCopy = _.cloneDeep(listUser);
            listUserCopy = listUserCopy.filter((item) => item.email.includes(term));
            setListUser(listUserCopy);
        } else {
            getUsers(1);
        }
    }, 1000);

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(['ID', 'Email', 'First Name', 'Last Name']);
            listUser.map((item, i) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    const handleImportCSV = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            if (file.type !== 'text/csv') {
                toast.error('Only accept csv files...');
                return;
            }
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== 'email' ||
                                rawCSV[0][1] !== 'first_name' ||
                                rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Wrong format header CSV file!!!');
                            } else {
                                let result = [];
                                rawCSV.map((item, i) => {
                                    if (i > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                                setListUser(result);
                                console.log(result);
                            }
                        } else {
                            toast.error('Wrong format CSV file!!!');
                        }
                    } else {
                        toast.error('Not found data on CSV file!!!');
                    }
                    console.log('Finish', results.data);
                },
            });
        }
    };

    useEffect(() => {
        getUsers(1);
    }, []);

    return (
        <>
            <div className="my-3 add-new d-sm-flex">
                <h4>List Users:</h4>
                <div>
                    <label className="btn btn-warning" htmlFor="test">
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input id="test" type="file" hidden onChange={(e) => handleImportCSV(e)} />
                    <CSVLink
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUsersExport}
                        filename={'users.csv'}
                        className="btn btn-primary mx-3"
                    >
                        <i className="fa-solid fa-file-arrow-down"></i> Export
                    </CSVLink>
                    <button className="btn btn-info" onClick={() => setIsShowModalAddNew(true)}>
                        <i className="fa solid fa-circle-plus"></i> Add new
                    </button>
                </div>
            </div>
            <div className="col-12 col-sm-4 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search user by email"
                    onChange={(e) => handleSearch(e)}
                />
            </div>
            <div className="customize-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className="sort-header">
                                    <span>ID</span>
                                    <span>
                                        <i
                                            onClick={() => handleSort('desc', 'id')}
                                            className="fa-solid fa-arrow-down-long"
                                        ></i>
                                        <i
                                            onClick={() => handleSort('asc', 'id')}
                                            className="fa-solid fa-arrow-up-long"
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className="sort-header">
                                    <span>First Name</span>
                                    <span>
                                        <i
                                            onClick={() => handleSort('desc', 'first_name')}
                                            className="fa-solid fa-arrow-down-long"
                                        ></i>
                                        <i
                                            onClick={() => handleSort('asc', 'first_name')}
                                            className="fa-solid fa-arrow-up-long"
                                        ></i>
                                    </span>
                                </div>
                            </th>
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
                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={() => handleDeleteUser(item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
            <ReactPaginate
                className="pagination"
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

            <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
            <ModalEdit
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                handleDeleteUserFromModal={handleDeleteUserFromModal}
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
            />
        </>
    );
};

export default TableUser;
