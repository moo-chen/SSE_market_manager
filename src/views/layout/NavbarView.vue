<template>
  <div>
    <b-navbar type="light" variant="info" fixed="top">
      <b-navbar-brand>
        SSE_market
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-form-group class="px-3" horizontal>
          <b-input-group>
            <b-form-input placeholder="搜索"></b-form-input>
            <b-input-group-append>
              <b-button variant="dark">搜索</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-icon-person-fill></b-icon-person-fill>
            {{ userInfo.name }}
          </template>
          <b-dropdown-item @click="logout">退出登录</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <b-row no-gutters style="margin-top: 60px;">
      <b-col sm="2" class="nav-col" style="position: fixed;height: 100vh;">
        <b-list-group flush style="margin-top: 60px;">
          <b-list-group-item to="/" :class="{ active: $route.path === '/' }">
            主页</b-list-group-item>
          <b-list-group-item to="/post" :class="{ active: $route.path === '/post' }">
            发帖</b-list-group-item>
          <b-list-group-item to="/notifications"
          :class="{ active: $route.path === '/notifications' }">
            通知</b-list-group-item>
          <b-list-group-item to="/feedback" :class="{ active: $route.path === '/feedback' }">
            反馈</b-list-group-item>
          <b-list-group-item to="/my-profile" :class="{ active: $route.path === '/my-profile' }">
            我的</b-list-group-item>
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
  // 使用map将映射'store/module'里的logout函数
  methods: mapActions('userModule', ['logout']),
};
</script>

<style>
.navbar {
  height: 80px;
}

.b-list-group-item {
  background-color: #FFFFFF ;
  border-top: none;
  border-left: none;
  border-right: none;
}

.active {
  background-color:rgb(17, 167, 226) !important;
}

.nav-col {
  border-right: 1px solid rgb(237, 235, 235); /* 设置右侧边框 */
}
</style>
