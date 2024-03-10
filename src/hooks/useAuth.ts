import { useDispatch } from 'react-redux';
import { useKey } from './useKey';
import {
  dispatchActions,
  useUserDispatch,
  useUserState,
} from '@/context/UserProvider';
import { LoginProps } from '@/lib/interface';
import toast from 'react-hot-toast';
import { EUserType } from '@/lib/constant';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { axiosClient } from '@/lib/axios';
import { RETURNED_MESSAGES } from '@/lib/translate';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { setKeySite, setUserLogin, removeKeySite } = useKey();
  const userDispatch = useUserDispatch();
  const { isAuth } = useUserState();

  const onLogin = async (data: LoginProps) => {
    try {
      const res = (await axiosClient.post('/auth/login', data)) as any;
      console.log('🚀 ~ onLogin ~ res:', res);
      if (res?.message == RETURNED_MESSAGES.AUTH.NOT_FOUND_USER.ENG) {
        toast.error(RETURNED_MESSAGES.AUTH.NOT_FOUND_USER.VIE);
        return;
      }
      if (res?.message == RETURNED_MESSAGES.AUTH.PASSWORD_NOT_MATCH.ENG) {
        toast.error(RETURNED_MESSAGES.AUTH.PASSWORD_NOT_MATCH.VIE);
        return;
      }
      if (
        res?.data?.accessToken &&
        res?.data?.refreshToken &&
        res?.data?.user
      ) {
        setKeySite({
          token: res?.data?.accessToken,
          refreshToken: res?.data?.refreshToken,
        });
        setUserLogin({ user: JSON.stringify(res?.data?.user) });

        dispatchActions({ type: EUserType.LOGIN, payload: null }, userDispatch);
      }
    } catch (e) {
      console.log('🚀 ~ onLogin ~ e:', e);
    }
  };

  const onLogout = async () => {
    const res = await axiosClient.put('/auth/logout');
    removeKeySite();
    dispatchActions({ type: EUserType.LOGOUT, payload: {} }, userDispatch);
  };

  const onLogout1 = async () => {
    removeKeySite();
    dispatchActions({ type: EUserType.LOGOUT, payload: {} }, userDispatch);
  };

  const useCheckNotLoggedIn = () => {
    useEffect(() => {
      if (!isAuth) {
        router.push('/auth/login');

        //delay 1s
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    }, [isAuth]);
  };

  const useCheckLoggedIn = () => {
    useEffect(() => {
      if (isAuth) {
        router.push('/');

        //delay 1s
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    }, [isAuth]);
  };

  return {
    onLogin,
    isAuth,
    onLogout,
    useCheckLoggedIn,
    useCheckNotLoggedIn,
    onLogout1,
    loading,
  };
};
