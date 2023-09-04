<template>
  <div align="left" style="padding-left:100px;">
    <h1>
      修改密码
    </h1>

    <b-form-group
      id="accountForm"
      label="管理员姓名"
    >
      <b-form-input
        id="account"
        v-model="admin.account"
        type="account"
        placeholder="enter name"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="passwordForm"
      label="密码"
    >
      <b-form-input
        id="password1"
        v-model="admin.password1"
        type="password"
        placeholder="enter password"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="passwordForm"
      label="再次输入密码"
    >
      <b-form-input
        id="password2"
        v-model="admin.password2"
        type="password"
        placeholder="enter password again"
      ></b-form-input>
    </b-form-group>

    <b-button @click="changePassword" variant="outline-primary" block>
        修改管理员密码
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

// eslint-disable-next-line import/no-extraneous-dependencies
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      admin: {
        account: '',
        password1: '',
        password2: '',
      },
      key: '16bit secret key',
    };
  },

  methods: {
    ...mapActions('userModule', { change: 'changePassword' }),

    setPassword(data, key) {
      const cypherKey = CryptoJS.enc.Utf8.parse(key);
      CryptoJS.pad.ZeroPadding.pad(cypherKey, 4);
      const iv = CryptoJS.SHA256(key).toString();
      const cfg = { iv: CryptoJS.enc.Utf8.parse(iv) };
      return CryptoJS.AES.encrypt(data, cypherKey, cfg).toString();
    },

    changePassword() {
      this.admin.password1 = this.setPassword(this.admin.password1, this.key);
      this.admin.password2 = this.setPassword(this.admin.password2, this.key);
      console.error(this.admin);
      this.change(this.admin).then((response) => {
        console.error(response);
        this.$bvToast.toast('修改密码成功', {
          title: '系统提醒',
          variant: 'primary',
          solid: true,
        });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '修改密码时出现错误',
          variant: 'danger',
          solid: true,
        });
      });
    },
  },
};

</script>
