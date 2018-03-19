<template>
  <div>
    <span>
      <b>组织名称</b>
    </span>
    <el-select class="filter-item" v-model="orgId" placeholder="请选择" size="65px" @change="handleChange">
      <el-option v-for="item in orgList" :key="item.id" :label="item.orgname" :value="item.id"> </el-option>
    </el-select>
    <!-- <span>
      <b>选择成员</b>
    </span> -->
    <el-transfer v-model="currentUsers" :data="allUsers" :titles="['所有用户', '当前组织成员']" :button-texts="['移除', '添加']" style="padding: 10px 0 0 80px" @change="isChanged" filterable>
      <el-button class="transfer-footer" type="primary" v-if="orgManager_btn_user&&transferDataChanged" @click="onSubmit" slot="right-footer">保存更改</el-button>
    </el-transfer>

    <!-- <el-form label-width="100px">
      <el-form-item label="选择组织名称">
        <el-select class="filter-item" v-model="orgId" placeholder="请选择" size="50px" @change="handleChange">
          <el-option v-for="item in orgList" :key="item.id" :label="item.orgname" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="群主|领导">
        <el-select v-model="leaders" multiple filterable remote placeholder="请输入关键词" :remote-method="remoteLeaderMethod" :loading="loading">
          <el-option v-for="item in lItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组员|下属">
        <el-select v-model="members" multiple filterable remote placeholder="请输入关键词" :remote-method="remoteMemberMethod" :loading="loading">
          <el-option v-for="item in mItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="groupManager_btn_userManager" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
import { page } from 'api/admin/user/index'
import { getUsers, modifyUsers } from 'api/admin/organize/index'
import { mapGetters } from 'vuex'
export default {
  props: {
    orgList: {
      type: Array
    }
  },
  data() {
    return {
      orgId: 1,
      lItems: [],
      mItems: [],
      leaders: [],
      members: [],
      allUsers: [],
      currentUsers: [],
      loading: false,
      orgManager_btn_user: false,
      transferDataChanged: false
    }
  },
  created() {
    console.log('123')
    this.initUsers()
    this.orgManager_btn_user = this.elements['orgManager:btn_userManager']
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    isChanged() {
      this.transferDataChanged = true
    },
    handleChange(orgId) {
      console.log(orgId)
      // getUser()
      this.getCurrentUsers(orgId)
    },
    remoteMemberMethod(query) {
      if (query !== '') {
        this.loading = true
        this.loading = false
        page({
          name: query
        }).then(response => {
          this.mItems = response.data.rows
          this.total = response.data.total
          this.loading = false
        })
      } else {
        this.mItems = []
      }
    },
    remoteLeaderMethod(query) {
      if (query !== '') {
        this.loading = true
        this.loading = false
        page({
          name: query
        }).then(response => {
          this.lItems = response.data.rows
          this.total = response.data.total
          this.loading = false
        })
      } else {
        this.lItems = []
      }
    },
    onSubmit() {
      const vals = {}
      // if (this.members.length > 0) vals.members = this.members.join()
      if (this.currentUsers.length > 0) vals.leaders = this.currentUsers.join()
      modifyUsers(this.orgId, vals).then(() => {
        this.transferDataChanged = false
        this.$emit('closeUserDialog')
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    initUsers() {
      this.getCurrentUsers(this.orgId)
      this.getAllUsers()
    },
    getCurrentUsers(orgId) {
      getUsers(orgId).then(response => {
        this.lItems = response.data.leaders
        this.mItems = response.data.members
        const mems = []
        const leas = []
        for (let i = 0; i < response.data.members.length; i++) {
          mems.push(response.data.members[i].id)
        }
        for (let i = 0; i < response.data.leaders.length; i++) {
          leas.push(response.data.leaders[i].id)
        }
        this.members = mems
        this.leaders = leas
        this.currentUsers = [...this.leaders, ...this.members]
      })
    },
    getAllUsers() {
      page().then(res => {
        const users = []
        const data = res.data.rows
        for (let i = 0; i < data.length; i++) {
          users.push({
            key: data[i].id,
            label: data[i].name,
            disabled: false
          })
        }
        this.allUsers = users
      })
    }
  }
}
</script>

<style>
.transfer-footer {
  margin-left: 10px;
  padding: 4px 1px;
}
</style>

