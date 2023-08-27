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
    <b-table striped hover :items="items" @row-clicked="onRowClicked"
    class="aquaStyle"></b-table>
    <!-- <table class="table" id="userInfo" @row-clicked="onRowClicked">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Telephone</th>
        <th scope="col">IdPass</th>
        <th scope="col">Operation</th>
      </tr>
    </table> -->
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
      fields: ['index', 'name', 'phone', 'idPass'],
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
      // 暂时没有想到更好的方法，由于不查询不会有__ob__,这样测试后发现无法正常更改底色，所以比较投机取巧，选择重新去后端取了一次数据
      this.showUsers(this.check).then((response1) => {
        console.error(response1.data.data.data);
        this.items = response1.data.data.data;
        for (let i = 0; i < this.items.length; i += 1) {
          if (this.items[i].name === item.name) {
            this.items[i] = {
              index: i + 1,
              name: this.items[i].name,
              num: this.items[i].num,
              email: this.items[i].email,
              phone: this.items[i].phone,
              idPass: this.items[i].IDpass,
              _rowVariant: 'info',
            };
          } else {
            this.items[i] = {
              index: i + 1,
              name: this.items[i].name,
              num: this.items[i].num,
              email: this.items[i].email,
              phone: this.items[i].phone,
              idPass: this.items[i].IDpass,
              _rowVariant: 'primary',
            };
          }
        }
        console.error('pass', this.items);
      });
    },

    showUser() {
      console.error(this.check);
      this.showUsers(this.check).then((response) => {
        this.items = response.data.data.data;
        for (let i = 0; i < this.items.length; i += 1) {
          this.items[i] = {
            index: i + 1,
            name: this.items[i].name,
            num: this.items[i].num,
            email: this.items[i].email,
            phone: this.items[i].phone,
            idPass: this.items[i].IDpass,
            _rowVariant: 'primary',
          };
        }
        console.error(this.items);
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '查询时出现错误',
          variant: 'info',
          solid: true,
        });
      });
    },

    deleteUser() {
      console.error('this:', this.selected);
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
            this.items[i] = {
              index: i + 1,
              name: this.items[i].name,
              phone: this.items[i].phone,
              idPass: this.items[i].IDpass,
              _rowVariant: 'primary',
            };
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
      if (this.selected.name === '') {
        this.$bvToast.toast('您未选择用户，无法审核', {
          title: '审核错误',
          variant: 'danger',
          solid: true,
        });
      } else {
        console.error(this.selected);
        this.passUsers(this.selected).then((response) => {
          console.error(response);
          this.$bvToast.toast('审核成功', {
            title: '系统提醒',
            variant: 'primary',
            solid: true,
          });
          this.showUsers(this.check).then((response1) => {
            console.error(response1.data.data.data);
            this.items = response1.data.data.data;
            for (let i = 0; i < this.items.length; i += 1) {
              this.items[i] = {
                index: i + 1,
                name: this.items[i].name,
                num: this.items[i].num,
                email: this.items[i].email,
                phone: this.items[i].phone,
                idPass: this.items[i].IDpass,
                _rowVariant: 'primary',
              };
            }
            console.error('pass', this.items);
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
      }
    },
  },
};
</script>

<style>
  .aquaStyle {
    background-color: deepskyblue;
  }
  .greenStyle {
    background-color: green;
  }
</style>
