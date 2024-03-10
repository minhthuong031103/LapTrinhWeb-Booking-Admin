import { EModalType } from '@/lib/constant';
import { ModalData } from '@/lib/interface';
import { create } from 'zustand';

export type ModalType =
  | 'createApartment'
  | 'editApartment'
  | 'createRoom'
  | 'editRoom'
  | 'exportBill'
  | 'createCustomer'
  | 'editCustomer'
  | 'contractRoom'
  | EModalType.CUSTOMER_CREATE
  | EModalType.CUSTOMER_EDIT
  | EModalType.IDENTITY_CARD
  | EModalType.CUSTOMER_DELETE
  | 'deleteRoom'
  | 'deleteApartment'
  | 'createEmployee'
  | 'editEmployee'
  | 'updatePassword'
  | 'deleteEmployee'
  | 'deleteContract'
  | 'addPay'
  | 'editPay'
  | EModalType.PAY_DELETE
  | EModalType.BILL_DELETE;
interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData | any;
  onOpen: (
    type: ModalType,
    data?: ModalData | any,
    onAction?: () => void,
  ) => void;
  onClose: () => void;
  onAction: () => void;
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  isOpen: false,
  data: {},
  onAction: () => {},
  onOpen: (type, data = {}, onAction) =>
    set({ type, isOpen: true, data, onAction }),
  onClose: () =>
    set({ type: null, isOpen: false, data: {}, onAction: () => {} }),
}));
