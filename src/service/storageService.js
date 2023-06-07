// 本地缓存服务

const PREFIX = 'sse_market';

// ADMIN 模块
const ADMIN_PREFIX = `${PREFIX}ADMIN_`;
const ADMIN_TOKEN = `${ADMIN_PREFIX}token`;
const ADMIN_INFO = `${ADMIN_PREFIX}info`;

// 储存
const set = (key, data) => {
  localStorage.setItem(key, data);
};

// 读取
const get = (key) => localStorage.getItem(key);

export default {
  set,
  get,
  ADMIN_TOKEN,
  ADMIN_INFO,
};
