<template>
  <div>
    <b-navbar fixed="top" v-if="$route.name != 'login'">
      <b-navbar-brand>
        <b-icon-shop class="mr-3"></b-icon-shop>SSE_market_Manager
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav style="margin-left:100px;">
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon-person-fill></b-icon-person-fill>管理员
            </template>
            <b-dropdown-item @click="logout">
              <b-icon-box-arrow-left class="mr-1"></b-icon-box-arrow-left> 退出登录
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row no-gutters style="margin-top: 60px;">
      <b-col sm="2" class="nav-col" style="position: fixed;height: 100vh;">
        <b-list-group flush style="margin-top: 60px;">
          <b-list-group-item to="/userInfo" :class="{ active: $route.path === 'userInfo' }"
          style="font-size: 18px; display: flex; align-items: center;">
            <b-icon-people-fill class="mr-3"></b-icon-people-fill>用户信息
          </b-list-group-item>
          <b-list-group-item to="/userFeedback"
            :class="{ active: $route.path === '/userFeedback' }"
            style="font-size: 18px;">
            <b-icon-envelope-open-fill class="mr-3"></b-icon-envelope-open-fill>用户反馈
          </b-list-group-item>
<!--            <b-list-group-item to="/checkUser"
:class="{ active: $route.path === '/checkUser' }"-->
<!--            style="font-size: 18px;">-->
<!--            <b-icon-calendar2-check-fill class="mr-3"></b-icon-calendar2-check-fill>审核用户-->
<!--          </b-list-group-item>-->
          <b-list-group-item to="/checkPost" :class="{ active: $route.path === '/checkPost' }"
            style="font-size: 18px; display: flex; align-items: center;">
            <b-icon-calendar2-x-fill class="mr-3"></b-icon-calendar2-x-fill>审核帖子
          </b-list-group-item>
          <b-list-group-item @click="showPostForm()" style="font-size: 18px;"  class="click">
            <b-icon-pencil-fill class="mr-3"></b-icon-pencil-fill>发布通知
          </b-list-group-item>
          <b-modal v-model='PostFormVisible' title='通知发布' ok-only ok-title="取消发布"
          modal-class="custom-modal">
            <PostForm/>
          </b-modal>
          <b-list-group-item to="/set" :class="{ active: $route.path === '/set' }"
            style="font-size: 18px; display: flex; align-items: center;" @click="toggleSettings">
            <b-icon-gear-fill class="mr-3"></b-icon-gear-fill>设置
            <b-icon-caret-right-fill v-if="!showSettings" style="margin-left: auto;">
            </b-icon-caret-right-fill>
            <b-icon-caret-down-fill v-if="showSettings" style="margin-left: auto;">
            </b-icon-caret-down-fill>
          </b-list-group-item>
          <b-list-group-item v-if="showSettings" to="/changePassword"
          :class="{ active: $route.path === '/changePassword' }" style="font-size: 18px;">
            <b-icon-lock-fill class="mr-3"></b-icon-lock-fill>修改密码
          </b-list-group-item>
          <b-list-group-item v-if="showSettings" to="/deleteAdmin"
          :class="{ active: $route.path === '/deleteAdmin' }" style="font-size: 18px;">
            <b-icon-x-circle-fill class="mr-3"></b-icon-x-circle-fill>注销管理员
          </b-list-group-item>

          <b-list-group-item v-if="showSettings" to="/addAdmin"
          :class="{ active: $route.path === '/addAdmin' }" style="font-size: 18px;">
            <b-icon-check-circle-fill class="mr-3"></b-icon-check-circle-fill>
            添加管理员
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col style="margin-left: 160px;">
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import PostForm from '@/components/PostForm.vue';

export default {
  components: {
    PostForm,
  },
  data() {
    return {
      showPartitions: false,
      showSettings: false,
      showProfiles: false,
      PostFormVisible: false,
    };
  },
  methods: {
    ...mapActions('userModule', ['logout']),
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    showPostForm() {
      this.PostFormVisible = true;
    },
  },
};
</script>

<style>
@import '../../style/css/NavbarView.css';
</style>
