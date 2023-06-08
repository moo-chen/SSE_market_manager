import storageService from '@/service/storageService';
// eslint-disable-next-line import/no-cycle
import userService from '@/service/userService';

const userModule = {
  namespaced: true,
  state: {
    // 从本地缓存中获取
    token: storageService.get(storageService.ADMIN_TOKEN),
    adminInfo: storageService.get(storageService.ADMIN_INFO) ? JSON.parse(storageService.get(storageService.ADMIN_INFO)) : null, //eslint-disable-line
  },

  mutations: {
    SET_TOKEN(state, token) {
      // 更新本地缓存
      storageService.set(storageService.ADMIN_TOKEN, token);
      // 更新state
      state.token = token;
    },
    SET_ADMININFO(state, adminInfo) {
      // 更新本地缓存
      storageService.set(storageService.ADMIN_INFO, JSON.stringify(adminInfo));
      // 更新state
      state.adminInfo = adminInfo;
    },
  },
  actions: {
    login(context, { account, password }) {
      return new Promise((resolve, reject) => {
        userService.login({ account, password }).then((res) => {
          // 保存token
          context.commit('SET_TOKEN', res.data.data.token);
          return userService.info();
        }).then((res) => {
          // 保存用户信息
          context.commit('SET_ADMININFO', res.data.data.admin);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    showUsers(context, { name, phone, idPass }) {
      return new Promise((resolve, reject) => {
        userService.userInfo({ name, phone, idPass }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    deleteUser(context, name) {
      console.error(name);
      return new Promise((resolve, reject) => {
        userService.deleteUser(name).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    passUser(context, name) {
      return new Promise((resolve, reject) => {
        userService.passUser(name).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    addAdmin(context, { account, password1, password2 }) {
      console.error({ account, password1, password2 });
      return new Promise((resolve, reject) => {
        userService.addAdmin({ account, password1, password2 }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    deleteAdmin(context, { account }) {
      console.error({ account });
      return new Promise((resolve, reject) => {
        userService.deleteAdmin({ account }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    changePassword(context, { account, password1, password2 }) {
      console.error({ account, password1, password2 });
      return new Promise((resolve, reject) => {
        userService.changePassword({ account, password1, password2 }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    noViolation(context, { sueID }) {
      console.error({ sueID });
      return new Promise((resolve, reject) => {
        userService.noViolation({ sueID }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    violation(context, { sueID }) {
      console.error({ sueID });
      return new Promise((resolve, reject) => {
        userService.violation({ sueID }).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    getSues() {
      console.error();
      return new Promise((resolve, reject) => {
        userService.getSues().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};

export default userModule;
