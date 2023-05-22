<template>
  <div>
    <b-navbar fixed="top">
      <b-navbar-brand>
        <b-icon-shop class="mr-3"></b-icon-shop>SSE_market_Manager
      </b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav style="margin-left:100px;">
          <b-navbar-form>
            <b-input-group>
              <b-form-input style="width: 600px; border-radius: 5px;"
              placeholder="搜索"></b-form-input>
              <b-input-group-append>
                <b-button style="margin-left:20px; border-radius: 5px;"
                variant="dark">
                <b-icon-search class="mr-2"></b-icon-search>搜索
              </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-navbar-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon-person-fill></b-icon-person-fill>
              {{ userInfo.name }}
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
          <b-list-group-item to="/postInfo" :class="{ active: $route.name === 'postInfo' }"
            style="font-size: 18px;">
            <b-icon-file-text-fill class="mr-3"></b-icon-file-text-fill>帖子信息
          </b-list-group-item>
          <b-list-group-item to="/userFeedback"
            :class="{ active: $route.path === '/userFeedback' }"
            style="font-size: 18px;">
            <b-icon-envelope-open-fill class="mr-3"></b-icon-envelope-open-fill>用户反馈
          </b-list-group-item>
            <b-list-group-item to="/checkUser" :class="{ active: $route.path === '/checkUser' }"
            style="font-size: 18px;">
            <b-icon-calendar2-check-fill class="mr-3"></b-icon-calendar2-check-fill>审核用户
          </b-list-group-item>
          <b-list-group-item to="/checkPost" :class="{ active: $route.path === '/checkPost' }"
            style="font-size: 18px; display: flex; align-items: center;">
            <b-icon-calendar2-x-fill class="mr-3"></b-icon-calendar2-x-fill>审核帖子
          </b-list-group-item>
          <b-list-group-item to="/settings" :class="{ active: $route.path === '/settings' }"
            style="font-size: 18px; display: flex; align-items: center;">
            <b-icon-gear-fill class="mr-3"></b-icon-gear-fill>设置
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col style="margin-left: 160px;">
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  // 获取在浏览器缓存中的包含用户信息的token，userInfo中包含用户的name和telephone
  // 所以要从前端返回用户信息时，一般采用telephone(因为name不唯一，id又无法从前端直接获取)
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  data() {
    return {
      showPartitions: false,
      showSettings: false,
      showProfiles: false,
    };
  },
  methods: {
    // 使用map将映射'store/module'里的logout函数
    ...mapActions('userModule', ['logout']),
  },
};
</script>

<style>
@import '../../style/css/NavbarView.css';
</style>
