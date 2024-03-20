'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useModal } from '@/hooks/useModalStore';

import { EModalType } from '@/lib/constant';
import { useStatistics } from '@/hooks/useStatistics';

const DeletePayModal = () => {
  const { isOpen, onClose, type, data, onAction } = useModal();

  const isModalOpen = isOpen && type === EModalType.PAY_DELETE;
  const { deletePay } = useStatistics();
  const handleDeletePay = async () => {
    await deletePay({
      paymentId: data?.id,
      refetch: onAction,
    });
    onClose();
  };
  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Xóa thông tin phiếu chi
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="text-center">
                Bạn có đồng ý xóa phiếu chi
                {' phòng '}
                <span className="text-gray font-bold text-base">
                  {data?.roomName}
                </span>{' '}
                ngày{' '}
                <span className="text-gray font-bold text-base">
                  {data?.payDay}
                </span>
                ?
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 text-black bg-white hover:bg-white/40 border-1 transition-colors font-semibold text-sm"
                onPress={onClose}
              >
                Hủy
              </Button>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleDeletePay}
              >
                Xóa
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeletePayModal;
