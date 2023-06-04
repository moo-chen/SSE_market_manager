import request from '@/utils/request';

const userInfo = ({ name, phone, idPass }) => {
  console.error({ name, phone, idPass });
  return request.post('auth/showUsers', { name, phone, idPass });
};

const deleteUser = ({ name }) => {
  console.error({ name });
  return request.post('auth/deleteUser', { name });
};

const passUser = ({ name }) => {
  return request.post('auth/passUsers', { name });
};

export default {
  userInfo,
  deleteUser,
  passUser,
};
