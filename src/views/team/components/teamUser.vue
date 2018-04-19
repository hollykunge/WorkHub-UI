<template>
  <div>
    <el-form>
      <el-form-item label="组织名称">
        <el-select class="filter-item" v-model="orgId" placeholder="请选择" size="65px" @change="handleChange">
          <el-option v-for="item in orgList" :key="item.id" :label="item.orgname" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织领导">
        <el-select v-model="leaders" multiple filterable remote placeholder="输入姓名进行搜索" :remote-method="remoteLeaderMethod" :loading="loading" size="65px" @change="isChanged">
          <el-option v-for="item in lItems" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="成员选择">
      </el-form-item>
    </el-form>
    <el-transfer v-model="members" :data="allUsers" :titles="['所有用户', '当前组织成员']" :button-texts="['移除用户', '添加用户']" style="margin: -50px 0 0 0" @change="isChanged" filter-placeholder="输入姓名进行搜索" filterable>
    </el-transfer>
    <el-button class="transfer-footer" type="primary" v-if="orgManager_btn_user&&transferDataChanged" @click="onSubmit">保存更改</el-button>

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
      this.allUsers.forEach(element => {
        element.disabled = false
      })
      this.userFliter(this.allUsers, this.leaders)
    },
    handleChange(orgId) {
      this.getCurrentUsers(orgId)
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
      if (this.leaders.length > 0) vals.leaders = this.leaders.join()
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
      }).then(() => {
        all().then(res => {
          const users = []
          for (let i = 0; i < res.length; i++) {
            users.push({
              key: res[i].id,
              label: res[i].name,
              disabled: false
            })
          }
          this.userFliter(users, this.leaders)
          this.allUsers = users
        })
      })
    },
    /* 对所有用户中包含的领导进行特殊处理
      a：所有用户 Array
      b: 领导 Array
     */
    userFliter(a, b) {
      for (let i = 0; i < b.length; i++) {
        for (let j = 0; j < a.length; j++) {
          if (a[j].key === b[i]) {
            a[j].disabled = true
          }
        }
      }
      return a
    }
  }
}
</script>

<style>
.transfer-footer {
  margin: 30px 115px 0px 485px;
  padding: 8px 15px;
}
</style>

