<template>
  <div class="full-screen-container">
    <vue-particles
        class="particles-bg"
        color="#39AFFD"
        :particle-opacity="0.7"
        :particles-number="100"
        shape-type="star"
        :particle-size="4"
        lines-color="#FFFFFF"
        :lines-width="1"
        :line-linked="true"
        :line-opacity="0.4"
        :lines-distance="150"
        :move-speed="3"
        :hover-effect="true"
        hover-mode="grab"
        :click-effect="true"
        click-mode="repulse"
    />
    <div class="login-view">
      <div class='login' @keydown.enter="login">
    <b-row class='mt-5'>
      <b-col md='8' offset-md='2' lg='6' offset-lg='3'>
        <b-card title='登录'>
          <b-form>
            <b-form-group label='账号'>
              <b-form-input
                v-model='$v.user.account.$model'
                placeholder='输入账号'
                :state="validateState('account')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('account')">
                账号不符合要求
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label='密码'>
              <b-form-input
                v-model='$v.user.password.$model'
                type='password'
                placeholder='输入密码'
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于等于 6 位
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <b-button @click='login' variant='outline-primary' block>登录</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
    </div>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators';
// eslint-disable-next-line import/no-extraneous-dependencies
import CryptoJS from 'crypto-js';

// import customValidator from '@/helper/validator';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {
        account: '',
        password: '',
      },
      key: '16bit secret key',
    };
  },
  validations: {
    user: {
      account: {
        required,
        // account: customValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  methods: {
    ...mapActions('userModule', { adminlogin: 'login' }),
    validateState(name) {
      // 这里是es6 解构赋值
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    setPassword(data, key) {
      const cypherKey = CryptoJS.enc.Utf8.parse(key);
      CryptoJS.pad.ZeroPadding.pad(cypherKey, 4);
      const iv = CryptoJS.SHA256(key).toString();
      const cfg = { iv: CryptoJS.enc.Utf8.parse(iv) };
      return CryptoJS.AES.encrypt(data, cypherKey, cfg).toString();
    },
    login() {
      // 验证数据
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      // 请求
      this.user.password = this.setPassword(this.user.password, this.key);
      this.adminlogin(this.user)
        .then(() => {
          this.$router.replace({ name: 'home' });
        })
        .catch((err) => {
          this.$bvToast.toast(err.response.data.msg, {
            title: '数据验证错误',
            variant: 'danger',
            solid: true,
          });
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.login-view {
  background-image: url('../../assets/image/background.jpg');
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 0px !important;
  height: 100vh;
  width: 100vw;
}
.full-screen-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.login {
  height: 1000px;
  width: 1200px;
  margin-top: 200px !important;
  margin-left: 250px !important;
}
.register-button {
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  z-index: 100;
}
.changePassword-button {
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  z-index: 100;
}
</style>
