<template>
  <div>
    <span>
      <b>组织名称</b>
    </span>
    <el-select class="filter-item" v-model="orgId" placeholder="请选择" size="65px" @change="handleChange">
      <el-option v-for="item in orgList" :key="item.id" :label="item.orgname" :value="item.id"> </el-option>
    </el-select>
    <el-transfer v-model="currentUsers" :data="allUsers" :titles="['所有用户', '当前组织成员']" :button-texts="['移除', '添加']" style="padding: 10px 0 0 80px" @change="isChanged" filterable>
      <el-button class="transfer-footer" type="primary" v-if="orgManager_btn_user&&transferDataChanged" @click="onSubmit" slot="right-footer">保存更改</el-button>
    </el-transfer>
  </div>
</template>

<script>
import { page, all } from 'api/admin/user/index'
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
      if (this.members.length > 0) vals.members = this.members.join()
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
      all().then(res => {
        const users = []
        for (let i = 0; i < res.length; i++) {
          users.push({
            key: res[i].id,
            label: res[i].name,
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

