import axios from 'axios';
import queryString from 'query-string';
import { AccountantInterface, AccountantGetQueryInterface } from 'interfaces/accountant';
import { GetQueryInterface } from '../../interfaces';

export const getAccountants = async (query?: AccountantGetQueryInterface) => {
  const response = await axios.get(`/api/accountants${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAccountant = async (accountant: AccountantInterface) => {
  const response = await axios.post('/api/accountants', accountant);
  return response.data;
};

export const updateAccountantById = async (id: string, accountant: AccountantInterface) => {
  const response = await axios.put(`/api/accountants/${id}`, accountant);
  return response.data;
};

export const getAccountantById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/accountants/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAccountantById = async (id: string) => {
  const response = await axios.delete(`/api/accountants/${id}`);
  return response.data;
};
