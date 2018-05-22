<template>
  <div class="request-content">
    <div class="request-content-header">
      <span class="request-content-header-title">
        {{requestContent.title}}
      </span>
      <div class="request-content-header-tips">
        <el-button size="small" type="primary">
          <icon name="exchange"></icon>未合并
        </el-button>
        <span>
          <a>
            {{requestContent.user}}
          </a> 请求合并{{requestContent.commitNum}}个提交到任务中</span>
      </div>
    </div>

    <div class="request-content-body">
      <!-- <el-tabs v-model="activeIndex" type="card">
        <el-tab-pane name="conversation">
          <span slot="label" @click="handleTabClick(tab.name)">
            <icon name="comments-o"></icon> 问题讨论
            <el-badge class="mark" value="2"></el-badge>
          </span>
        </el-tab-pane>
        <el-tab-pane name="commit">
          <span slot="label" @click="handleTabClick(tab.name)">
            <icon name="superpowers"></icon> 提交记录
            <el-badge class="mark" value="0"></el-badge>
          </span>
        </el-tab-pane>
        <el-tab-pane name="checks">
          <span slot="label" @click="handleTabClick(tab.name)">
            <icon name="check-square-o"></icon> 冲突检测
            <el-badge class="mark" value="3"></el-badge>
          </span>
        </el-tab-pane>
        <el-tab-pane name="filesChanged">
          <span slot="label" @click="handleTabClick(tab.name)">
            <icon name="file-text-o"></icon> 文件变更
            <el-badge class="mark" value="5"></el-badge>
          </span>
        </el-tab-pane>
      </el-tabs> -->

      <el-menu theme="light" :default-active="activeIndex" class="content-header" mode="horizontal" :router="true" @select="handleSelect">
        <el-menu-item index="conversation">
          <template slot="title">
            <span>
              <icon name="comments-o"></icon>问题讨论
              <el-badge class="mark" value="2"></el-badge>
            </span>
          </template>
        </el-menu-item>
        <el-menu-item index="commit">
          <template slot="title">
            <span>
              <icon name="superpowers"></icon>提交记录
              <el-badge class="mark" value="4"></el-badge>
            </span>
          </template>
        </el-menu-item>
        <el-menu-item index="checks">
          <template slot="title">
            <span>
              <icon name="check-square-o"></icon>冲突检测
              <el-badge class="mark" value="1"></el-badge>
            </span>
          </template>
        </el-menu-item>
        <el-menu-item index="filesChanged">
          <template slot="title">
            <span>
              <icon name="file-text-o"></icon>文件变更
              <el-badge class="mark" value="3"></el-badge>
            </span>
          </template>
        </el-menu-item>
      </el-menu>
      <div class="content-body">
        <!-- <el-row>
          <el-col :span="24"> -->
        <p>saldhfsdlasdfhsdladdfbsda,smdbfba,sdmbfba,msd,fb,asmd,fa,sdm,fba,sdbfba,msdbfba,sdffbpasdkfnkl</p>
        <!-- </el-col>
        </el-row> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestContent: { title: '下载后不能运行', user: '测试用户', commitNum: 3 },
      activeIndex: 'conversation'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.request-content {
  margin: 0 20px;
  &-header {
    display: block;
    &-title {
      font-size: 30px;
      font-weight: 500;
    }
    &-tips {
      margin-top: 10px;
      button {
        padding: 5px;
      }
      span {
        font-size: 14px;
        a {
          background-color: #a9a9a970;
          border-radius: 4px;
        }
        a:hover {
          background-color: #fff;
          text-decoration: underline;
        }
      }
    }
  }
  &-body {
    margin-top: 10px;
    .content-header {
      height: 40px;
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        .mark {
          margin-top: 8px;
          line-height: 1;
          .el-badge__content {
            background-color: #52626d85;
          }
        }
      }
      .is-active {
        .mark {
          .el-badge__content {
            background-color: #20aaff;
          }
        }
      }
    }
    .content-body {
      width: 100%;
      background: #20aaff;
    }
  }
}
</style>
