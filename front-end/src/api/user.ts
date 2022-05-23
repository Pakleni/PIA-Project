import { User } from '../types/User';

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  //TODO
  return {
    username,
    type: 'Admin'
  };
};
