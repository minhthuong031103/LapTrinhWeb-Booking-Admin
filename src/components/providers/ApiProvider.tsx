'use client';

import { RequestProps, useApi } from '@/lib/axios';
import { createContext, useContext } from 'react';

interface ApiContextProps {
  requestApi: ({ endPoint, method, body }: RequestProps) => Promise<any>;
}

const ApiContext = createContext({} as ApiContextProps);

export const ApiContextProvider = ({ children }) => {
  const { requestApi } = useApi();
  return (
    <ApiContext.Provider value={{ requestApi }}>{children}</ApiContext.Provider>
  );
};
export const useApiAxios = (): ApiContextProps => {
  return useContext<ApiContextProps>(ApiContext as any);
};
