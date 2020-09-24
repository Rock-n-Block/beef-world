import React from 'react';
import { Modal } from 'antd';


import './Modal.scss'

const ModalComponent = ({ children, isOpen, handleOk }) => {

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