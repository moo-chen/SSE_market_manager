<template>
  <div id='app'>
    <navbar />
    <b-container>
      <router-view style="margin-top:60px;"></router-view>
    </b-container>
  </div>
</template>

<script>
import Navbar from './views/layout/NavbarView.vue';

export default {
  components: { Navbar },
  data() {
    return {};
  },
};
</script>
<style lang='scss'></style>
