import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/userService';
import { toast } from 'react-toastify';

const ModalConfirm = ({ show, handleClose, dataUserDelete, handleDeleteUserFromModal }) => {
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && res.statusCode === 204) {
            handleDeleteUserFromModal(dataUserDelete);
            toast.success('🦄 User Deleted Successfully!');
            handleClose();
        } else {
            toast.error('🦄 Something Went Wrong!');
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard="false">
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        Are you sure to delete this user ? <br /> <b>email = {dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalConfirm;
