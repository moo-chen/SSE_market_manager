import userService from '@/service/userService';

const userModule = {
  namespaced: true,
  actions: {
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
  },
};

export default userModule;
