<template>
  <div>
    <el-menu class="navbar" mode="horizontal">

      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <!-- <levelbar></levelbar> -->
      <!-- 暂时取消 -->
      <!-- <tabs-view></tabs-view> -->

      <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>

      <!-- 导航栏功能按钮 -->
      <!-- <el-input class="test" size="small" icon="search" placeholder="输入内容进行搜索">
      </el-input> -->
      <div class="headerSearch">
        <div class="headerSearch-icon" @click="changeSearchState">
          <el-tooltip class="helper-tooltip" effect="dark" content="搜索" placement="bottom">
            <icon name="search"></icon>
          </el-tooltip>
        </div>
        <el-input :class="inputClass" ref="input" @keyup.enter.native="handleSearch" @blur="changeSearchState" size="small" placeholder="输入内容进行搜索">
        </el-input>
      </div>

      <div class="helper">
        <el-tooltip class="helper-tooltip" effect="dark" content="使用手册" placement="bottom">
          <router-link to="/helper">
            <icon class="helper-icon" name="question-circle-o"></icon>
          </router-link>
        </el-tooltip>
      </div>

      <div class="notices">
        <el-tooltip class="notices-tooltip" effect="dark" content="消息中心" placement="bottom">
          <icon class="notices-icon" name="bell-o"></icon>
        </el-tooltip>
      </div>

      <div class="screenfull-con">
        <el-tooltip class="screenful-con-tooltip" effect="dark" :content="screenfulContent" placement="bottom">
          <screenfull class='screenfull-con-icon' @isFullscreen="handleFullscreen"></screenfull>
        </el-tooltip>
      </div>

      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="'../../../../'+avatar">
          <a>{{ name }}</a>
          <icon name="angle-down"></icon>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              <icon name="gears"></icon> 设 置 </el-dropdown-item>
          </router-link>
          <router-link to="/userHome">
            <el-dropdown-item>
              <icon name="user-o"></icon> 个人中心 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">
              <icon name="sign-out"></icon> 退出登录 </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import TabsView from './TabsView'
import Hamburger from 'components/Hamburger'
import Screenfull from 'components/Screenfull'
import ErrorLog from 'components/ErrLog'
import errLogStore from 'store/errLog'

export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    ErrorLog,
    Screenfull
  },
  data() {
    return {
      log: errLogStore.state.errLog,
      screenfulContent: '全屏',
      inputClass: 'hide'
    }
  },
  computed: { ...mapGetters([
    'sidebar',
    'name',
    'avatar'
  ])
  },
  mounted() {
    this.$refs.input.$refs.input.style.border = '0px solid #bfcbd9'
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut')
        .then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
    },
    handleFullscreen(val) {
      this.screenfulContent = val ? '全屏' : '退出全屏'
    },
    changeSearchState() {
      this.inputClass = this.inputClass === 'hide' ? 'show' : 'hide'
      if (this.inputClass === 'show') {
        this.$refs.input.$refs.input.focus() // 点开搜索后自动聚焦
        this.$refs.input.$refs.input.style.borderBottom = '1px solid #bfcbd9'
        this.$refs.input.$refs.input.style.borderRadius = '0px'
      }
      if (this.inputClass === 'hide') {
        this.$refs.input.$refs.input.style.borderBottom = '0px solid #bfcbd9'
      }
    },
    handleSearch(val) {
      console.log(val.target.value)
      window.open('https://www.baidu.com/baidu?wd=' + val.target.value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background-color: #fff;
  height: 64px;
  line-height: 64px;
  border-radius: 0 !important;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 58px;
    height: 64px;
    float: left;
    padding: 6px 20px;
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .headerSearch {
    display: inline-flex;
    position: absolute;
    right: 345px;
    &-icon {
      .fa-icon {
        vertical-align: middle;
        font-size: 21px;
        color: #00000086;
        cursor: pointer;
      }
      &:hover {
        background-color: #4ba5ff28;
      }
    }
    .el-input {
      transition: width 0.3s, margin-left 0.3s;
      width: 0px;
      background: transparent;

      &.show {
        width: 210px;
        margin-left: 8px;
      }
    }
  }
  .helper {
    position: absolute;
    right: 300px;
    &-icon {
      vertical-align: middle;
      font-size: 22px;
      color: #000000a6;
      cursor: pointer;
    }
    &:hover {
      background-color: #4ba5ff28;
    }
  }
  .notices {
    position: absolute;
    right: 260px;
    &-icon {
      vertical-align: middle;
      font-size: 22px;
      color: #000000a6;
      cursor: pointer;
    }
    &:hover {
      background-color: #4ba5ff28;
    }
  }
  .screenfull-con {
    position: absolute;
    right: 220px;
    &:hover {
      background-color: #4ba5ff28;
    }
  }
  .avatar-container {
    height: 50px;
    position: absolute;
    right: 10px;
    font-size: 18px;
    color: #000000;
    .avatar-wrapper {
      cursor: pointer;
      .user-avatar {
        width: 40px;
        height: auto;
        vertical-align: middle;
      }
      &:hover {
        background-color: #4ba5ff28;
      }
    }
  }
}
</style>
