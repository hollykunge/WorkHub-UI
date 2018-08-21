<template>
  <div class="login-container" id="login">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <icon name="user" class="username-icon"></icon>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon name="lock" class="username-icon"></icon>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import socialSign from './socialsignin'

export default {
  components: {
    socialSign
  },
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true,
          message: '账户不能为空',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({
              path: '/'
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    generateBackground() {
      const loginContainer = document.getElementById('login')
      loginContainer.style.backgroundImage = 'url(../../../static/images/login_bg.jpg)'
    }
  },
  created() {
  },
  mounted() {
    this.generateBackground()
  },
  destroyed() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/index.scss";
@import "src/styles/mixin.scss";
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-container {
  @include relative;
  height: 100vh;
  background-size: 100% 100%;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 40px 12px 0px;
    color: #000000;
    height: 43px;
    text-align: center;
  }
  .el-input {
    display: inline-block;
    height: 43px;
    width: 83%;
    font-size: 18px;
    text-align: center;
    &__inner {
      &::placeholder {
        color: #000;
      }
      &::-webkit-input-placeholder { /*Webkit browsers*/
        color: #000;
      }
      &:-moz-placeholder { /*Mozilla Firefox 4 to 8*/
        color: #000;
      }
      &::moz-placeholder { /*Mozilla Firefox 19+*/
        color: #000;
      }
      &:-ms-input-placeholder { /*Internet Explorer 10+*/
        color: #000;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 26px;
    color: #000c;
    .username-icon {
      margin: 0px 11px -5px -5px;
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #000000;
    margin: 0 auto 40px;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px;
    margin: 270px auto;
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    border-radius: 3px;
  }
  .el-form-item {
    background: rgba(255, 255, 255, 0.85);
    border-radius: 5px;
    color: #454545;
    &__error {
      font-size: inherit;
      left: 40%;
    }
  }
  .forget-pwd {
    color: #fff;
  }
}
</style>
