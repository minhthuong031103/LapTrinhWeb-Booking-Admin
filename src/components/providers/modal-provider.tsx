'use client';

import AddApartmentModal from '@/app/(home)/(components)/home/AddApartmentModal';
import EditAppartmentModal from '@/app/(home)/(components)/home/edit-apartment-modal';
import CustomerAddModal from '@/app/(home)/customers/CustomerAddModal';
import { useEffect, useState } from 'react';
import ContractRoomModal from '../rooms/contract-room-modal';
import CreateRoomModal from '../rooms/create-room-modal';
import EditRoomModal from '../rooms/edit-room-modal';
import ExportBillModal from '../rooms/export-bill-modal';
import DeleteRoomModal from '../rooms/delete-room-modal';
import DeleteApartmentModal from '@/app/(home)/(components)/home/delete-apartment-modal';
import CreateEmployeeModal from '../employee/CreateEmployeeModal';
import EditEmployeeModal from '../employee/EditEmployeeModal';
import UpdatePasswordEmployeeModal from '../employee/UpdatePasswordEmployeeModal';
import DeleteEmployeeModal from '../employee/DeleteEmployeeModal';
import EditCustomerModal from '@/app/(home)/customers/EditCustomerModal';
import DeleteCustomerModal from '@/app/(home)/customers/DeleteCustomerModal';
import AddPayModal from '../statisctics/AddPayModal';
import EditPayModal from '../statisctics/EditPayModal';
import DeletePayModal from '../statisctics/DeletePayModal';
import DeleteBillModal from '../statisctics/DeleteBillModal';
import DeleteContractModal from '../rooms/DeleteContractModal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AddApartmentModal />
      <EditAppartmentModal />
      <CreateRoomModal />
      <EditRoomModal />
      <ExportBillModal />
      <ContractRoomModal />
      <DeleteContractModal />
      <CustomerAddModal />
      <DeleteRoomModal />
      <DeleteApartmentModal />
      <CreateEmployeeModal />
      <EditEmployeeModal />
      <UpdatePasswordEmployeeModal />
      <DeleteEmployeeModal />
      <EditCustomerModal />
      <DeleteCustomerModal />
      <AddPayModal />
      <EditPayModal />
      <DeletePayModal />
      <DeleteBillModal />
    </>
  );
};
