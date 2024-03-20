'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useState } from 'react';
import { useModal } from '@/hooks/useModalStore';

import { Input } from '../ui/input';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Label } from '../ui/label';

import { useEmployee } from '@/hooks/useEmployee';
import toast from 'react-hot-toast';

const UpdatePasswordEmployeeModal = () => {
  const { isOpen, onClose, type, data, onAction } = useModal();
  const isModalOpen = isOpen && type === 'updatePassword';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState({
    showPass: false,
  });
  const resetState = () => {
    setPassword('');
    setConfirmPassword('');
  };
  const { updatePassword } = useEmployee();
  const handleUpdatePassword = async () => {
    if (password === confirmPassword) {
      await updatePassword(
        {
          id: data?.id,
          password,
        },
        onClose,
      );
      onAction();
      resetState();
    } else {
      toast.error('Mật khẩu không khớp');
    }
  };

  return (
    <Modal size="sm" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Đổi mật khẩu
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="flex gap-[20px]">
                <div className="grid w-full max-w-sm items-center gap-2.5">
                  <Label htmlFor="password">Mật khẩu mới</Label>
                  <Input
                    renderRight={
                      <div
                        onClick={() => {
                          setShow({
                            ...show,
                            showPass: !show.showPass,
                          });
                        }}
                        className="opacity-50 cursor-pointer hover:opacity-100"
                      >
                        {show.showPass ? (
                          <AiFillEyeInvisible size={20} />
                        ) : (
                          <AiFillEye size={20} />
                        )}
                      </div>
                    }
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    id="password"
                    placeholder="Nhập mật khẩu mới"
                    type={show.showPass ? 'text' : 'password'}
                    autoCapitalize="none"
                    autoComplete="password"
                    className="h-[40px] px-4 py-2 border border-default-200 rounded-[8px] focus:outline-none focus-visible:border-default-400 hover:border-default-400 focus-visible:ring-1 focus-visible:ring-default-200 "
                    autoCorrect="off"
                  />
                </div>
              </div>
              <div className="flex gap-[20px]">
                <div className="grid w-full max-w-sm items-center gap-2.5">
                  <Label htmlFor="password">Xác nhận mật khẩu</Label>
                  <Input
                    renderRight={
                      <div
                        onClick={() => {
                          setShow({
                            ...show,
                            showPass: !show.showPass,
                          });
                        }}
                        className="opacity-50 cursor-pointer hover:opacity-100"
                      >
                        {show.showPass ? (
                          <AiFillEyeInvisible size={20} />
                        ) : (
                          <AiFillEye size={20} />
                        )}
                      </div>
                    }
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    id="password"
                    isInvalid={
                      password !== confirmPassword && confirmPassword !== ''
                    }
                    errorMessage="Mật khẩu không khớp"
                    placeholder="Xác nhận mật khẩu"
                    type={show.showPass ? 'text' : 'password'}
                    autoCapitalize="none"
                    autoComplete="password"
                    className="h-[40px] px-4 py-2 border border-default-200 rounded-[8px] focus:outline-none focus-visible:border-default-400 hover:border-default-400 focus-visible:ring-1 focus-visible:ring-default-200 "
                    autoCorrect="off"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleUpdatePassword}
              >
                Lưu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdatePasswordEmployeeModal;
