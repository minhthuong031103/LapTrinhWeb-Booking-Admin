'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModalStore';
import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { checkValueNumberInput } from '@/lib/utils';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useApartment } from '@/hooks/useApartment';
import { useInfiniteQuery } from '@tanstack/react-query';
import { KEY_CONTEXT, queryKey } from '@/lib/constant';
import { Apartment } from '@/types';
import { useEmployee } from '@/hooks/useEmployee';
import toast from 'react-hot-toast';

const EditEmployeeModal = () => {
  const { isOpen, onClose, type, onAction, data } = useModal();
  const isModalOpen = isOpen && type === 'editEmployee';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [bank, setBank] = useState('');
  const [email, setEmail] = useState('');
  const [apartmentId, setApartmentId] = useState(new Set([]));

  const { updateEmployee } = useEmployee();
  const resetState = () => {
    setName('');
    setPhone('');
    setBankNumber('');
    setBank('');
    setEmail('');

    setApartmentId(new Set([]));
  };
  const handleCreateEmployee = async () => {
    const apartment = await Array.from(apartmentId).map(item => Number(item));
    if (name && phone && bankNumber && bank && email && !!apartment.length) {
      await updateEmployee(
        {
          id: data?.id,
          name,
          phone,
          bankNumber,
          bank,
          email,
          apartmentIds: apartment,
        },
        onClose,
      );
      onAction();
      resetState();
    } else {
      toast.error('Vui lòng điền đầy đủ thông tin');
    }
  };
  const { getApartments } = useApartment();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const userId = JSON.parse(localStorage.getItem(KEY_CONTEXT.USER) || '{}')?.id;

  const {
    data: apartments,
    fetchNextPage,
    hasNextPage,
    refetch: refetchData,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [queryKey.APARTMENTS_SELECT, { currentPage, limit: 10, userId }],
    ({ pageParam = 0 }) =>
      getApartments({
        page: pageParam,
        limit: 10,
        search: '',
        searchField: 'name',
      }),
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (
          lastPage?.data.currentPage === 1 &&
          pages?.length < lastPage?.data.totalPages
        )
          return 2;
        if (pages?.length < lastPage?.data.totalPages) return pages?.length;
        else return undefined;
      },
    },
  );
  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isOpen,
    hasMore: hasNextPage,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore: () => {
      fetchNextPage();
    },
  });

  useEffect(() => {
    if (data) {
      setName(data?.name || '');
      setPhone(data.phone || '');
      setBankNumber(data.bankNumber || '');
      setBank(data.bank || '');
      setEmail(data.email || '');
      setApartmentId(
        new Set(data?.apartmentPermissionIds?.map(item => item.toString())),
      );
    }
  }, [data]);

  return (
    <Modal size="2xl" isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex justify-center items-center text-gray uppercase font-bold text-xl">
              Cập nhật thông tin nhân viên
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="flex gap-[20px]">
                <CustomInput
                  label="Email"
                  placeholder="Nhập email đăng nhập"
                  value={email}
                  isRequired={false}
                  setValue={setEmail}
                />
                <CustomInput
                  label="Tên nhân viên"
                  placeholder="Nhập tên nhân viên"
                  value={name}
                  isRequired={false}
                  setValue={setName}
                />
              </div>
              <div className="flex gap-[20px]">
                <div className="flex w-[50%]">
                  <CustomInput
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    isRequired={false}
                    setValue={e =>
                      checkValueNumberInput('phoneNumber', e) && setPhone(e)
                    }
                  />
                </div>
                <Select
                  placeholder="Chọn căn hộ"
                  label="Căn hộ quản lý"
                  selectionMode="multiple"
                  className="w-[50%]"
                  labelPlacement="outside"
                  selectedKeys={apartmentId}
                  isLoading={isFetching}
                  disallowEmptySelection
                  scrollRef={scrollerRef}
                  onOpenChange={setIsOpenSelect}
                  onSelectionChange={(e: any) => {
                    setApartmentId(e);
                    setCurrentPage(1);
                  }}
                >
                  {apartments ? (
                    apartments?.pages?.map(page =>
                      page?.data?.items?.map((item: Apartment) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      )),
                    )
                  ) : (
                    <SelectItem key={''}></SelectItem>
                  )}
                </Select>
              </div>
              <div className="flex gap-[20px]">
                <CustomInput
                  label="Tên ngân hàng"
                  placeholder="Nhập tên ngân hàng"
                  value={bank}
                  isRequired={false}
                  setValue={setBank}
                />
                <CustomInput
                  label="Số tài khoản"
                  placeholder="Nhập số tài khoản"
                  value={bankNumber}
                  isRequired={false}
                  setValue={e =>
                    checkValueNumberInput('payNumber', e) && setBankNumber(e)
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-[8px] w-[133px] px-4 py-2 bg-blueButton text-white font-semibold text-sm"
                onPress={handleCreateEmployee}
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

export default EditEmployeeModal;
