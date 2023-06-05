<template>
  <div align="left" style="padding-left:100px;">
    <h1>
      删除管理员
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

    <b-button @click="deleteAdmin" variant="outline-primary" block>
        删除管理员
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
      },
    };
  },

  methods: {
    ...mapActions('userModule', { delete: 'deleteAdmin' }),

    deleteAdmin() {
      console.error(this.admin);
      this.delete(this.admin).then((response) => {
        console.error(response);
        this.$bvToast.toast('删除管理员成功', {
          title: '系统提醒',
          variant: 'primary',
          solid: true,
        });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '删除时出现错误',
          variant: 'danger',
          solid: true,
        });
      });
    },
  },
};

</script>
