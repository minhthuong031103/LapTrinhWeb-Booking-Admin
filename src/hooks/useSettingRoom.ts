import { useReducer } from 'react';

interface SettingRoomProps {
  typeRoom: string;
  place: string;
  floorArea: number;
  ceilingArea: number;
  totalArea: number;
  toilet: string;
  dryingYard: string;
  washer: string;
  parking: string;
  typeLock: string;
  pet: string;
  furniture: string[];
}

const initSettingRoom: SettingRoomProps = {
  typeRoom: '',
  place: '',
  floorArea: 0,
  ceilingArea: 0,
  totalArea: 0,
  toilet: '',
  dryingYard: '',
  washer: '',
  parking: '',
  typeLock: '',
  pet: '',
  furniture: [],
};

const reducerContract = (state: SettingRoomProps, action) => {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, ...action.payload };
    case 'RESET':
      return { ...initSettingRoom };
    default:
      return state;
  }
};

export const useSettingRoom = () => {
  // const { requestApi } = useApiAxios()
  const [settingRoomState, dispatchContract]: [SettingRoomProps, any] =
    useReducer(reducerContract, initSettingRoom);

  const handleSetSettingRoom = <K extends keyof SettingRoomProps>(
    key: K,
    value: SettingRoomProps[K],
  ) => {
    dispatchContract({ type: 'SET_VALUES', payload: { [key]: value } });
  };

  const resetSettingRoomState = () => {
    dispatchContract({ type: 'RESET' });
  };

  return {
    settingRoomState,
    handleSetSettingRoom,
    resetSettingRoomState,
  };
};
