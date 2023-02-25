<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>订单管理页面 >> 用户添加页面</span>
    </div>
    <div class="providerAdd">
      <div>
        <label>用户编码：</label>
        <input type="text" v-model="user.userCode">
      </div>
      <div>
        <label>用户名称：</label>
        <input type="text" v-model="user.userName">
      </div>
      <div>
        <label>用户电话：</label>
        <input type="text" v-model="user.phone">
      </div>
      <div>
        <label>用户地址：</label>
        <input type="text" v-model="user.address">
      </div>
      <div>
        <label>用户角色：</label>
        <select v-model="user.userRole" id="providerId">
          <option value="0">--请选择--</option>
          <option v-for="item of roleList" :key="item.id" :value="item.id">{{ item.roleName }}</option>
        </select>
      </div>
      <div>
        <label>用户性别：</label>
        <template>
          <el-radio-group v-model="user.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </template>
        <div class="providerAddBtn">
          <input type="button" @click.prevent="updateUser" value="保存">
          <input type="button" @click.prevent="goUserList" value="返回">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUser, goUserList} from "@/assets/js/userlList";
import request from "@/assets/serves/request/API";

export default {
  name: "UserUpdate",
  props: ['id'],
  data() {
    return {
      user: {},
      roleList: []
    }
  },
  methods: {
    async getUser() {
      if (this.id) {
        await getUser(this.id).then(e => {
          this.user = e.data
          sessionStorage.setItem('user', JSON.stringify(e.data))
        })
      }
    }, getProList() {
      const proList = sessionStorage.getItem("roleList");
      if (proList) {
        this.roleList = JSON.parse(proList)
      } else {
        request.get("/api/role/list").then(data => {
          this.roleList = data.data.roleList
        })
      }
    }, getSession() {
      const userSession = sessionStorage.getItem("user");
      this.user = JSON.parse(userSession)
    }, goUserList() {
      goUserList()
    }, async updateUser() {
      this.$confirm('请确认是否继续修改该用户信息!', '提示', {
        confirmButtonText: '确定修改',
        cancelButtonText: '取消修改',
        type: 'warning'
      }).then(() => {
        request.put("/api/user/save", this.user).then(res => {
          if (res.code === 0) {
            this.$message({
              center: true,
              type: 'success',
              duration: 1500,
              message: '修改成功!'
            });
            goUserList()
          }else {
            this.$message({
              center: true,
              type: 'error',
              duration:1500,
              message:res.description
            });
          }
        })
      }).catch(() => {
        this.$message({
          center: true,
          type: 'info',
          duration: 1500,
          message: '取消成功!'
        });
      })
    }
  },
  mounted() {
    this.getProList()
    this.getUser()
    this.getSession()
  }
}
</script>

<style scoped>

</style>