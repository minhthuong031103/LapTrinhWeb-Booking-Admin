'use client';
/** @format */

import { KEY_CONTEXT } from '@/lib/constant';

export function useKey() {
  const setKeySite = ({ token, refreshToken }) => {
    localStorage.setItem(KEY_CONTEXT.TOKEN, token);
    localStorage.setItem(KEY_CONTEXT.REFRESH_TOKEN, refreshToken);
  };

  const setUserLogin = ({ user }) => {
    localStorage.setItem(KEY_CONTEXT.USER, user);
  };

  const removeKeySite = () => {
    localStorage.removeItem(KEY_CONTEXT.TOKEN);
    localStorage.removeItem(KEY_CONTEXT.REFRESH_TOKEN);
    localStorage.removeItem(KEY_CONTEXT.USER);
  };

  // custom get value
  const getKey = (key: string) => {
    return localStorage.getItem(key);
  };

  // custom remove value
  const removeKey = (key: string) => {
    return localStorage.removeItem(key);
  };

  const setStorage = ({
    key,
    record,
    parseString,
  }: {
    key: string;
    record: any;
    parseString: boolean;
  }) => {
    try {
      localStorage.setItem(key, parseString ? JSON.stringify(record) : record);
    } catch (error) {
      return;
    }
  };

  return {
    setUserLogin,
    setKeySite,
    getKey,
    removeKey,
    removeKeySite,
    setStorage,
  };
}
