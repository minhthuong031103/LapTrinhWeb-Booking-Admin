'use client';
/** @format */

import React, { createContext } from 'react';
import { KEY_CONTEXT, EUserType } from '@/lib/constant';
import { useKey } from '@hooks/useKey';

const UserStateContext = createContext<any>(null);
const UserDispatchContext = createContext<any>(null);

function userReducer(state, action) {
  switch (action.type) {
    case EUserType.LOGIN:
      return { ...state, isAuth: true };
    case EUserType.LOGOUT:
      return { ...state, isAuth: false };
    case EUserType.CHANGE_LANGUAGE:
      return { ...state, language: action.payload.language };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }: any) {
  const { getKey } = useKey();
  const token = getKey(KEY_CONTEXT.TOKEN);
  const refreshToken = getKey(KEY_CONTEXT.REFRESH_TOKEN);
  // console.log("====================================");
  // console.log(token);
  // console.log("====================================");

  const [state, dispatch] = React.useReducer(userReducer, {
    isAuth: !!token,
    accessToken: token,
    refreshToken: refreshToken,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

interface UserStateProps {
  isAuth: boolean;
  accessToken: string;
  refreshToken: string;
}

interface UserDispatchProps {
  type: string;
  payload: any;
}

const useUserState = (): UserStateProps => {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

function useUserDispatch(): React.Dispatch<UserDispatchProps> {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, dispatchActions };

// ###########################################################
function dispatchActions({ type, payload }, dispatch) {
  return dispatch({
    type,
    payload,
  });
}
