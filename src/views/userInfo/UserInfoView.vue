<template>
  <div align="left" style="padding-left:100px;">
    <h1>用户信息</h1>
    <b-form-group
      id="nameForm"
      label="姓名"
      style="float:left"
    >
      <b-form-input
        id="name"
        v-model="check.name"
        type="name"
        placeholder="enter name"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="phoneForm"
      label="电话"
      style="float:left"
    >
      <b-form-input
        id="phone"
        v-model="check.phone"
        type="phone"
        placeholder="enter phone"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="passForm"
      label="是否通过审核"
      style="float:left"
    >
      <b-form-select
        id="idPass"
        v-model="check.idPass"
        :options="options"
      ></b-form-select>
    </b-form-group>

    <b-button @click="showUser" variant="outline-primary" block>
      确认
    </b-button>
    <b-button @click="deleteUser" variant="outline-primary" block>
      注销用户
    </b-button>
    <b-button @click="passUser" variant="outline-primary" block>
      通过审核
    </b-button>
    <b-table striped hover :items="items" @row-clicked="onRowClicked"></b-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      check: {
        name: '',
        phone: '',
        idPass: -1,
      },
      options: [
        { value: -1, text: '请选择' },
        { value: 1, text: '审核通过' },
        { value: 0, text: '审核未通过' },
      ],
      items: [
      ],
      selected: {
        name: '',
      },
    };
  },
  created() {
    this.showUser();
  },
  methods: {
    ...mapActions('userModule', { showUsers: 'showUsers' }),
    ...mapActions('userModule', { deleteUsers: 'deleteUser' }),
    ...mapActions('userModule', { passUsers: 'passUser' }),

    onRowClicked(item) {
      this.selected = item;
      // console.error('Row clicked:', item);
    },

    showUser() {
      console.error(this.check);
      this.showUsers(this.check).then((response) => {
        this.items = response.data.data.data;
        for (let i = 0; i < this.items.length; i += 1) {
          this.items[i].index = (i + 1);
        }
        console.error(this.items);
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '查询时出现错误',
          variant: 'danger',
          solid: true,
        });
      });
    },

    deleteUser() {
      console.error(this.selected);
      this.deleteUsers(this.selected).then((response) => {
        console.error(response);
        this.$bvToast.toast('删除成功', {
          title: '系统提醒',
          variant: 'primary',
          solid: true,
        });
        this.showUsers(this.check).then((response1) => {
          this.items = response1.data.data.data;
          for (let i = 0; i < this.items.length; i += 1) {
            this.items[i].index = (i + 1);
          }
        }).catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: '查询时出现错误',
            variant: 'danger',
            solid: true,
          });
        });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '删除错误',
          variant: 'danger',
          solid: true,
        });
      });
    },

    passUser() {
      console.error(this.selected);
      this.passUsers(this.selected).then((response) => {
        console.error(response);
        this.$bvToast.toast('审核成功', {
          title: '系统提醒',
          variant: 'primary',
          solid: true,
        });
        this.showUsers(this.check).then((response1) => {
          this.items = response1.data.data.data;
          for (let i = 0; i < this.items.length; i += 1) {
            this.items[i].index = (i + 1);
          }
        }).catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: '查询时出现错误',
            variant: 'danger',
            solid: true,
          });
        });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '审核错误',
          variant: 'danger',
          solid: true,
        });
      });
    },
  },
};
</script>
