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

export default {
  data() {
    return {
      admin: {
        account: '',
        password1: '',
        password2: '',
      },
    };
  },

  methods: {
    ...mapActions('userModule', { change: 'changePassword' }),

    changePassword() {
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
