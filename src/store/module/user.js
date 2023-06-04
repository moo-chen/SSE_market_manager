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
  },
};

export default userModule;
