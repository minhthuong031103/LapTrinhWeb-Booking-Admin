import { Modal } from '@mantine/core';
import React from 'react';

const ModalCus = ({ children, isModalOpen, onClose, title }) => {
  return (
    <Modal
      closeOnClickOutside={false}
      centered
      title={title}
      classNames={{
        header: 'flex justify-center items-center relative',
        title: 'font-bold text-gray uppercase font-bold text-xl',
        close: 'm-0 absolute right-3 top-3',
      }}
      opened={isModalOpen}
      onClose={onClose}
      size={'auto'}
      className=""
      radius={15}
      removeScrollProps={{ allowPinchZoom: true }}
    >
      {children}
    </Modal>
  );
};

export default ModalCus;
