<!-- 测试api时写的文件，可以不管，要看也行 -->
<template>
  <div class='api'>
    <b-row class='mt-5'>
      <b-col md='8' offset-md='2' lg='6' offset-lg='3'>
        <b-card title='ApiTest'>
          <b-form>
            <b-form-group label='input:'>
              <b-form-input v-model='inputVal'></b-form-input>
            </b-form-group>
            <b-form-group label='output:'>
              <b-form-input :value='outputVal' readonly></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button @click='api' variant='primary' block>Test</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputVal: '',
      outputVal: '',
    };
  },
  methods: {
    api() {
      if (!this.inputVal) {
        return;
      }
      const API = 'http://localhost:8080/api/auth/apiTest';
      this.axios
        .post(API, { inputVal: this.inputVal })
        .then((res) => {
          this.outputVal = res.data.outputVal;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log('api');
    },
  },
};
</script>
<style lang='scss' scoped></style>
