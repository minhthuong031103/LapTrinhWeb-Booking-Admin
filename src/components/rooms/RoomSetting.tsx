'use client';
import { CustomInput } from '@/app/(home)/(components)/home/custom-input';
import { useSettingRoom } from '@/hooks/useSettingRoom';
import { returnValue } from '@/lib/utils';
import { Button, Spinner } from '@nextui-org/react';

import { useMemo, useReducer, useState } from 'react';

const initRoomSettingState = {
  airConditioner: '0',
  stove: '0',
  television: '0',
  refrigeratorBig: '0',
  refrigeratorSmall: '0',
  washingMachine: '0',
  sofa: '0',
  table: '0',
  shelve: '0',
  tableAndChair: '0',
  picture: '0',
};
interface RoomSettingState {
  airConditioner: string;
  stove: string;
  television: string;
  refrigeratorBig: string;
  refrigeratorSmall: string;
  washingMachine: string;
  sofa: string;
  table: string;
  shelve: string;
  tableAndChair: string;
  picture: string;
}
const roomSettingReducer = (state: RoomSettingState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.payload };
    case 'RESET_STATE':
      return { ...initRoomSettingState };
    default:
      return state;
  }
};

const roomSettingValue = {
  airConditioner: 'Máy lạnh',
  stove: 'Bếp hồng ngoại',
  television: 'Tivi',
  refrigeratorBig: 'Tủ lạnh lớn',
  refrigeratorSmall: 'Tủ lạnh nhỏ',
  washingMachine: 'Máy giặt',
  sofa: 'Sofa',
  table: 'Bàn ăn',
  shelve: 'Kệ gỗ',
  tableAndChair: 'Bộ bàn ghế',
  picture: 'Tranh',
};
const RoomSetting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [floorArea, setFloorArea] = useState('0');
  const [subArea, setSubArea] = useState('0');
  const area = useMemo(() => {
    return Number(floorArea) + Number(subArea);
  }, [floorArea, subArea]);
  const [state, dispatch]: [RoomSettingState, any] = useReducer(
    roomSettingReducer,
    initRoomSettingState,
  );
  const handleSetState = payload => {
    dispatch({ type: 'SET_STATE', payload });
  };
  console.log(state);
  return (
    <>
      {isLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full h-full space-y-4">
          <div className="w-full flex flex-col space-y-2">
            <p className="text-gray text-lg font-semibold">Thông tin phòng</p>
            <div className="flex gap-3 items-end">
              <p className="text-gray text-base font-medium">
                Tổng diện tích:{' '}
              </p>
              <p className="text-gray text-lg font-semibold">
                {area} m<sub className="align-super text-sm">2</sub>
              </p>
            </div>
            <div className="w-[70%] flex items-center gap-10">
              <CustomInput
                label="Diện tích tầng"
                type="text"
                placeholder="Nhập diện tích sàn"
                isRequired
                value={floorArea}
                setValue={e => {
                  if (returnValue(e) !== null) setFloorArea(returnValue(e));
                }}
              />
              <CustomInput
                label="Diện tích phụ"
                type="text"
                placeholder="Nhập diện tích phụ"
                isRequired
                value={subArea}
                setValue={e => {
                  if (returnValue(e) !== null) setSubArea(returnValue(e));
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col space-y-2">
            <p className="text-gray text-lg font-semibold">
              Thông tin nội thất
            </p>
            <div className="w-[70%] flex items-center gap-10 flex-wrap">
              {Object.keys(roomSettingValue).map(item => (
                <div key={item} className="w-1/4 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium">
                      {roomSettingValue[item]}
                    </span>
                    <CustomInput
                      type="number"
                      isRequired
                      isClearable
                      className="max-w-[55px]"
                      value={state[item]}
                      setValue={e => {
                        if (returnValue(e) !== null)
                          handleSetState({ [item]: returnValue(e) });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Button
              className="rounded-[8px] px-4 py-4 bg-blueButton"
              onPress={() => {}}
            >
              <div className="flex flex-row items-center gap-x-[8px] ">
                <div className="text-white mt-[1px] font-medium">Cập nhật</div>
              </div>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default RoomSetting;
