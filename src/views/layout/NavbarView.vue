<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-container>
        <b-navbar-brand @click="$router.push({name: 'profile'})">SSE_market</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse
          id="nav-collapse"
          is-nav
        >
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->

            <b-nav-item-dropdown
              right
              v-if="userInfo && $route.name != 'login'">
              <template v-slot:button-content>
                <em>{{userInfo.name }}</em>
              </template>
              <!-- click也可以用这样的形式实现页面跳转，name是我们在router中定义的name，跳转到对应vue文件的页面 -->
              <b-dropdown-item @click="$router.push({name: 'profile'})">
                Personal homepage</b-dropdown-item>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
            <div v-if="!userInfo">
              <b-nav-item
                v-if="$route.name != 'login'"
                @click="$router.replace({name: 'login'})">Login</b-nav-item>
              <b-nav-item
                v-if="$route.name != 'register'"
                @click="$router.replace({name: 'register'})">Register</b-nav-item>
            </div>
          </b-navbar-nav>

        </b-collapse>
      </b-container>
    </b-navbar>
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
<style lang="scss" scoped>
</style>
