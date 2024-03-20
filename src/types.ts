export type Apartment = {
  id: string;
  name: string;
  address: string;
  numberFloor: number;
  roomNumber: number;
  isStaying: number;
  isAvailable: number;
  url: string;
};
export type Room = {
  apartmentId: string;
  billStatus: boolean;
  oldDebt: number;
  depositPrice: number;
  note: string;
  floor: number;
  id: number;
  name: string;
  roomPrice: number;
  netProceeds: number;
  roomStatus: string;
  suspenseMoney: number;
};
export type Customer = {
  id: string;
  name: string;
  address: string;
  identity: string;
  temporaryResidence: boolean;
  plate: string;
};
export type numberFloor = {
  rooms: Room[];
  name: string;
  floor: number;
};
