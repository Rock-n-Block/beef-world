import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { signInActions } from '../../redux/actions';

import './Modal.scss'

const ModalComponent = ({ children }) => {
    const dispatch = useDispatch();

    const isOpen = useSelector(({ signin }) => {
        return signin.isOpen
    })

    const handleOk = () => {
        dispatch(signInActions.toggleModal(false))
    }

    return (
        <Modal
            visible={isOpen}
            onOk={handleOk}
            onCancel={handleOk}
            footer={false}
            closable={false}
        >
            {children}
        </Modal>
    );
}

export default ModalComponent;