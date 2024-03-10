export const KEY_CONTEXT = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  LANGUAGE: 'language',
  THEME_MODE: 'themeMode',
  USER: 'user',
};

export enum EUserType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  UPDATE_AVATAR = 'UPDATE_AVATAR',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  FORGOT_PASSWORD_SCODE = 'FORGOT_PASSWORD_SCODE',
  FORGOT_PASSWORD_SPASSWORD = 'FORGOT_PASSWORD_SPASSWORD',
}

export const imageApartment =
  'https://s3-alpha-sig.figma.com/img/f538/4e15/2c753e8baef4a06273983d45756cae45?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S6Gvfqlq2ibb~veFg~n0OKTwB~GO1wPJjI8nQnWF~vOzCAl0PaJI~90w15oKMlaMBWA39-RPKIeVivTK1VgLuJ1OKWwRNfy-yQqEfTjIJ2V6H2Q01x1Jy72KyzOG1o-d~MN6sEWqpL0YuVq56Yp23lAx5j7bIXI4GB2g-keFeEnGk2XI-8mikV4dZrIyW7od-S0VkyFAStpiq5ZFyyPDmaijNTd~I2x7lFL1w2dv4WMadubEpkJTRUvI-M3cjlr2SKbG7gjkf0HgGUqJ6Kn2X4jUE6sVDmiLlCwXmMKqb48CHLaJe8i6rSwWeJaOa9B34v-YLNPkRu0n1Xcn4wOrSg__';

export const queryKey = {
  CUSTOMERS: 'customers',
  APARTMENTS: 'apartments',
  APARTMENTS_SELECT: 'apartmentsSelect',

  CUSTOMERS_SELECT: 'customersSelect',

  BILL: 'bill',
  ROOMDETAILS: 'roomDetails',
  BILLAPARTMENT: 'billApartment',
  EMPLOYEES: 'employees',
  USERS: 'users',
  PAYMENTS: 'payments',
};

export enum EModalType {
  CUSTOMER_CREATE = 'CUSTOMER_CREATE',
  IDENTITY_CARD = 'IDENTITY_CARD',
  CUSTOMER_EDIT = 'CUSTOMER_EDIT',
  CUSTOMER_DELETE = 'CUSTOMER_DELETE',
  BILL_DELETE = 'BILL_DELETE',
  PAY_DELETE = 'PAY_DELETE',
}

export const payTypes = [
  {
    id: 1,
    value: 'Tiền điện',
  },
  {
    id: 2,
    value: 'Tiền nước',
  },
  {
    id: 3,
    value: 'Tiền Internet',
  },
  {
    id: 4,
    value: 'Phí môi giới',
  },
];
