<!-- <template>中放的是页面的html框架，可用html语言编写，也可调用bootstrap-vue等第三方提供的组件，但需要在main.js中引入  -->
<template>
  <div class="register-view">
    <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="注册">
          <b-form>
            <b-form-group label="姓名">
              <!-- v-model里的内容是下面script中data()函数中return的属性，可实现数据连接 -->
              <b-form-input
                v-model="$v.user.name.$model"
                type="text"
                placeholder="输入您的名称（选填）"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="手机号">
              <b-form-input
                v-model="$v.user.telephone.$model"
                type="number"
                placeholder="输入手机号"
                :state="validateState('telephone')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号不符合要求
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input
                v-model="$v.user.password.$model"
                type="password"
                placeholder="输入密码"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于等于 6 位
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <!-- 使用click添加事件，这里是定向到下面的register函数。click的另一个用户参见'views/layout/NavbarView.vue'文件 -->
              <b-button @click="register" variant="outline-primary" block>注册</b-button>
              <b-button @click="$router.replace({ name : 'login' })"
              variant="outline-primary" block>返回登录</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
  </div>
</template>

<script>
// 引入一些需要的组件及库
import { required, minLength } from 'vuelidate/lib/validators';

import customValidator from '@/helper/validator';

import { mapActions } from 'vuex';

// export default用于导出模块中的一个默认值，函数一般放在其中
export default {
// data 函数用于定义组件的数据。它返回一个对象，其中包含组件的各种数据属性和初始值。
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        password: '',
      },
    };
  },
  // 用于定义数据的格式规则
  validations: {
    user: {
      name: {

      },
      telephone: {
        required,
        telephone: customValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  // methods 属性用于定义组件的方法。它是一个对象，其中包含了一组可以在组件实例中使用的方法
  methods: {
    // 使用map将userRegister映射到'store/module'里的user函数，在下面使用时就写成userRegister
    ...mapActions('userModule', { userRegister: 'register' }),
    // validators库里规定的，用于规则验证什么的，我也不是很了解
    validateState(name) {
      // 这里是es6 解构赋值
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    register() {
      // 验证数据
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      // 请求
      this.userRegister(this.user).then(() => {
        // 这里写从后端成功返回数据后的操作
        this.$bvToast.toast('注册成功,请登录', {
          title: '系统提醒',
          variant: 'primary',
          solid: true,
        });
        // 延迟跳转主页
        setTimeout(() => {
          this.$router.replace({ name: 'login' });
        }, 1000);
      }).catch((err) => {
        // 这里写从后端返回数据失败后的操作
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

<style lang="scss" scoped>
// 可以在这里直接写css语句，如果css语句较多也可写成一个css文件放在'style/css'里并用下列语句引入：
// @import '../../style/css/XXX.css';
.register-view {
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

.register {
  height: 1000px;
  width: 1200px;
  margin-top: 180px !important;
  margin-left: 250px !important;
}
</style>
