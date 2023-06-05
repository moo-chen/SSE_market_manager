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

const addAdmin = ({ account, password1, password2 }) => {
  return request.post('auth/addAdmin', { account, password1, password2 });
};

const deleteAdmin = ({ account }) => {
  return request.post('auth/deleteAdmin', { account });
};

const changePassword = ({ account, password1, password2 }) => {
  return request.post('auth/changePassword', { account, password1, password2 });
};

export default {
  userInfo,
  deleteUser,
  passUser,
  addAdmin,
  deleteAdmin,
  changePassword,
};
