import request from '@/utils/request';

// 用户注册
// { name, telephone, password }为要传给后端的数据的结构体变量
// post中的路径与后端对于功能处理函数的路由后缀保持一致，前缀已在环境变量中定义
// 添加新的函数记得在下方export default中添加导出
const register = ({ name, telephone, password }) => {
  return request.post('auth/register', { name, telephone, password });
};

// 用户登录
const login = ({ telephone, password }) => {
  return request.post('auth/login', { telephone, password });
};

// 获取用户信息
const info = () => {
  return request.get('auth/info');
};

export default {
  register,
  login,
  info,
};
