import { clsx, type ClassValue } from 'clsx';
import jwt from 'jsonwebtoken';
import numeral from 'numeral';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const regexPasswordSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
export const regexPasswordNumber = /[0-9]/;
export const regexPasswordUpperCase = /[A-Z]/;
export function checkEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}

export function currencyFormat(num) {
  return `${numeral(num).format('0,0')} VND`;
}
export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal',
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}
export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every(file => file instanceof File);
}
export const parseJSON = (str: string, out = []) => {
  try {
    const val = JSON.parse(str);
    return val ?? out;
  } catch (error) {
    return out;
  }
};

export const verifyJwt = (token: string) => {
  console.log(process.env.NEXT_PUBLIC_JWT_SECRET);
  let email = '';
  let name = '';
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        toast.error('Invalid token');
        return;
      }
      email = decoded?.email;
      name = decoded?.name;

      toast.error('Your account is not registered yet');
      return { email, name };
    });
  } catch (err) {
    console.log(err);
  }
  return { email, name };
};

export const convertTimeStamps = (time: any) => {
  return (Date.parse(time) / 1000).toString();
};

export const convertTimeStampToDate = (time: any) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  const date = new Date(time * 1000); // multiply by 1000 to convert seconds to milliseconds
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

export const combineDateTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes);
  return newDate;
};
export function formatNumberWithCommas(numStr) {
  // Remove all non-numeric characters (except for decimal point)
  const sanitizedStr = numStr.replace(/[^0-9.]/g, '');

  // Convert sanitized string to an array of characters
  // eslint-disable-next-line prefer-const
  let parts = sanitizedStr.split('.');

  // Add commas for thousands, millions, etc.
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the array back into a string
  return parts.join('.');
}

export const getImageKey = url => {
  const filename = url.split('/').pop();
  return filename;
};
export function convertPrismaTimeToDateTime(type) {
  const time = new Date(type).toLocaleDateString('en-GB').split('/');
  const year = parseInt(time[2]);
  const month = parseInt(time[1]);
  const day = parseInt(time[0]);
  return day + '-' + month + '-' + year;
}

export const getCurrentMonth = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  return month;
};

export interface GetQueryParamsProps {
  searchField?: string | null;
  search?: string | null;
  page: number;
  limit?: string | number;
  sortDirection?: 'asc' | 'desc';
  sortBy?: string;
}

export const getQueryParams = ({
  searchField = null,
  search = null,
  page,
  limit = 10,
  sortDirection = 'asc',
  sortBy = 'createdAt',
}: GetQueryParamsProps) => {
  return `${searchField ? `searchField=${searchField}` : ''}${
    search ? `&search=${search}` : ''
  }&page=${page}&limit=${limit} &sortDirection=${sortDirection}&sortBy=${sortBy}`;
};

export const checkValueNumberInput = (key, value) => {
  const countDots = (str: string) => str.split('.').length - 1;
  const temp = (str: string) => str.split('.');
  if (
    (key === 'newElectric' || key === 'defaultElectric') &&
    countDots(value) <= 1 &&
    temp(value)?.[1]?.length <= 1
  ) {
    const regex = /^[0-9.]*$/;
    return regex.test(value);
  } else {
    const regex = /^[0-9]*$/;
    return regex.test(value);
  }
};
export const isValidVietnamesePhoneNumber = phoneNumber => {
  // Regular expression for Vietnamese phone numbers
  const vietnamesePhoneNumberRegex = /^(84|0[3-9])+([0-9]{8})$/;

  // Test the provided phone number against the regex
  return vietnamesePhoneNumberRegex.test(phoneNumber);
};

export const getDaysAmountInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const convertPrice = price => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return formatter.replace('₫', 'VND');
};
export const convertPriceNotVND = price => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return formatter.replace('₫', '').trim();
};
export function formatDateCustom(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
export function addDaysToDateString(originalDateString, daysToAdd) {
  // Parse the original string into a Date object
  const [day, month, year] = originalDateString.split('/');
  const originalDate = new Date(`${year}-${month}-${day}`);

  // Add the specified number of days
  originalDate.setDate(originalDate.getDate() + daysToAdd);

  // Format the new date back into 'dd/mm/yyyy'
  const newDay = String(originalDate.getDate()).padStart(2, '0');
  const newMonth = String(originalDate.getMonth() + 1).padStart(2, '0');
  const newYear = originalDate.getFullYear();

  return `${newDay}/${newMonth}/${newYear}`;
}

export const blobToBase64 = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader?.result);
    };
    reader.onerror = reject;
  });
};

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader?.result);
    reader.onerror = error => reject(error);
  });
};

export function insertSpaceEveryThreeCharacters(inputString) {
  inputString = inputString?.toString();
  let result = '';
  let j = 0;
  for (let i = inputString?.length - 1; i >= 0; i--) {
    j++;
    result += inputString[i];
    if (j % 3 === 0 && j !== inputString?.length) {
      result += ' ';
    }
  }
  return result.split('').reverse().join('');
}

export const getYearsArrayFrom2000ToNow = () => {
  const currentYear = new Date().getFullYear();
  const years = [] as any;
  for (let i = 2000; i <= currentYear; i++) {
    years.push({
      id: i,
      name: `Năm ${i}`,
    });
  }
  return years;
};

export const getMonthsArray = () => {
  const currentMonth = new Date().getMonth() + 1;
  const month = [] as any;
  for (let i = 1; i <= currentMonth; i++) {
    month.push({
      id: i,
      name: `Tháng ${i}`,
    });
  }
  return month;
};

export const returnValue = value => {
  if (checkValueNumberInput('temp', value)) {
    if (value === '') return '0';
    if (value[0] === '0' && value.length > 1) return value.slice(1);
    return value;
  }
  return null;
};
