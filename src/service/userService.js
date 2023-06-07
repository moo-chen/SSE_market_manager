import request from '@/utils/request';

const login = ({ account, password }) => {
  return request.post('auth/adminLogin', { account, password });
};

// 获取用户信息(检验token）
const info = () => {
  return request.get('auth/admininfo');
};

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
  login,
  info,
  userInfo,
  deleteUser,
  passUser,
  addAdmin,
  deleteAdmin,
  changePassword,
};
