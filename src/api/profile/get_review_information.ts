
import {cCFetch } from '../basiApi';
import { Iprofile } from './types';

export const getprofilereviewinformation = async (): Promise<Iprofile> => {
  const response = await cCFetch<Iprofile>({
    url: '/talent/profile/review',
    method: 'GET',
  });
  if (response.error) {
    throw new Error(response.data.message);
  }
  return response.data;
};
