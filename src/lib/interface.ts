import { GetQueryParamsProps } from './utils';

export interface LoginProps {
  username: string;
  password: string;
}

export interface ModalData {
  roomId?: number;
  name?: string;
  city?: string;
  floor?: number;
  district?: string;
  ward?: string;
  numberFloor?: number;
  houseNumber?: string;
  apartmentId?: number;
}

export interface CreateApartmentProps {
  name: string;
  city: string;
  district: string;
  ward: string;
  numberFloor: number;
  houseNumber: string;
  address: string;
}

export interface CreateCustomerProps {
  name: string;
  phone: string;
  identityCard: string;
  address: string;
  issuedDate: Date;
  roomId: string | number;
  dayOfBirth: Date;
  identityFrontUrl: string;
  apartmentId: string | number;
  identityBackUrl: string;
}

export interface GetCustomersOfRoomProps extends GetQueryParamsProps {
  roomId: number;
}

export interface EmployeeProps {
  id: number;
  name: string;
  phone: string;
  bankNumber: string;
  bank: string;
  email?: string;
  password?: string;
  apartmentIds?: number[];
  apartmentPermissionIds?: number[];
}
export interface CreateEmployeeProps {
  name: string;
  phone: string;
  bankNumber: string;
  bank: string;
  email?: string;
  password?: string;
  apartmentIds?: number[];
  apartmentPermissionIds?: number[];
}
export interface IncomeProps {
  id: number;
  apartmentName: string;
  roomName: string;
  userName: string;
  endDate: string;
  totalPrice: number;
}
