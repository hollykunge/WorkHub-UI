<template>
  <div class="create-file">
    <div class="create-file-header">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="text">当前项目</el-button>
          <icon name="chevron-right"></icon>
          <el-button type="text">当前文件位置</el-button>
          <icon name="chevron-right"></icon>
        </el-form-item>
        <el-form-item>
          <el-input v-model="fileName" autofocus size="small" placeholder="命名新文件"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="create-file-content">
      <el-row :gutter="20">
        <el-col :sm="24" :md="18">
          <tinymce class="tinymce" :height="300" v-model="content"></tinymce>
        </el-col>
        <el-col :sm="24" :md="6">
          <el-card class="commit-card">
            <div slot="header">
              <span>
                <strong>提交新文件</strong>
              </span>
            </div>
            <div>
              <el-form>
                <el-form-item label="标注">
                  <el-input :placeholder="fileName?'新建 '+fileName:'创建新文件'"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="textarea" :rows="5" placeholder="对文件添加详细的描述（可选）"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" size="small" :disabled="!fileName" @click="handleCreate">立即创建</el-button>
                  <el-button size="small" type="danger" @click="cancle" plain>取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
    <div class="create-file-footer"></div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`,
      fileName: undefined
    }
  },
  methods: {
    handleCreate() {
      // this.$emit('toggleStatus', '')
      alert('文件创建成功')
      this.content = ''
      this.fileName = undefined
      this.$router.push({ name: '数据' })
    },
    cancle() {
      // this.$emit('toggleStatus', '')
      this.$router.go(-1)
    }

  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
.create-file {
  margin: 0 20px;
  &-header {
    height: 40px;
    .fa-icon {
      font-size: 12px;
      color: #11181d9a;
    }
    .el-button {
      font-size: 17px;
      line-height: 0;
      color: #20a19b;
      &:hover {
        color: #20a0ff;
      }
    }
  }
  &-content {
    .tinymce {
      margin: 10px 0;
    }
    .commit-card {
      margin: 10px 0;
      background: #f0f8ff;
      .el-card__header {
        padding: 5px 15px;
        height: 35px;
      }
    }
  }
}
</style>
