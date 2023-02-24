<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>用户管理页面 >> 用户添加页面</span>
    </div>
    <div class="providerAdd">
      <div>
        <label for="userCode">用户编码：</label>
        <input type="text" v-model="addUser.userCode">
      </div>
      <div>
        <label for="userName">用户名称：</label>
        <input type="text" v-model="addUser.userName">
      </div>
      <div>
        <label for="userPassword">用户密码：</label>
        <input type="password" v-model="addUser.userPassword">
      </div>
      <div>
        <label for="confirmPassword">确认密码：</label>
        <input type="password" v-model="addUser.confirmPassword" @blur="inputCheck">
      </div>
      <div>
        <label for="birthday">出生日期：</label>
        <el-date-picker
            v-model="addUser.birthday"
            type="date"
            placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div>
        <label for="phone">用户电话：</label>
        <input type="text" v-model="addUser.phone">
      </div>
      <div>
        <label for="address">用户地址：</label>
        <input type="text" v-model="addUser.address">
      </div>
      <div>
        <label>用户角色：</label>
        <!-- 列出所有的角色分类 -->
        <select name="userRole" v-model="addUser.userRole">
          <option value="0">--请选择--</option>
          <option v-for="role of roleList" :key="role.id" :value="role.id">{{ role.roleName }}</option>
        </select>
      </div>
      <div>
        <label>用户性别：</label>
        <el-radio-group v-model="addUser.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </div>
      <div class="providerAddBtn">
        <input type="button" @click.prevent="insertUser" value="保存">
        <input type="button" @click.prevent="goUserList" value="返回">
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/assets/serves/request/API";
import {goUserList} from "@/assets/js/userlList";
import {Message} from "element-ui";

export default {
  name: "UserAdd",
  data() {
    return {
      addUser: {
        userCode: '',
        userName: '',
        userPassword: '',
        confirmPassword: '',
        gender: 0,
        phone: '',
        address: '',
        birthday: null,
        userRole: 0
      },
      roleList: []
    }
  }, methods: {
    getRoleList() {
      const roleList = JSON.parse(sessionStorage.getItem("roleList"));
      if (roleList) {
        this.roleList = roleList
      } else {
        request.get("/api/role/list").then(data => {
          this.roleList = data.data.roleList
        })
      }
    }, goUserList() {
      goUserList()
    }, insertUser() {
      const userPassword = this.addUser.userPassword.trim().length === 0 || this.addUser.userPassword === '' || this.addUser.userPassword === null
      const confirmPassword = this.addUser.confirmPassword.trim().length === 0 || this.addUser.confirmPassword === '' || this.addUser.confirmPassword === null
      const userCode = this.addUser.userCode.trim().length === 0 || this.addUser.userCode === '' || this.addUser.userCode === null
      const userName = this.addUser.userName.trim().length === 0 || this.addUser.userName === '' || this.addUser.userName === null
      const gender = this.addUser.gender.length === 0 || this.addUser.gender === 0 || this.addUser.gender === null
      const phone = this.addUser.phone.trim().length === 0 || this.addUser.phone === '' || this.addUser.phone === null
      const address = this.addUser.address.trim().length === 0 || this.addUser.address === '' || this.addUser.address === null
      const birthday = this.addUser.birthday.length === 0 || this.addUser.birthday === '' || this.addUser.birthday === null
      const userRole = this.addUser.userRole.length === 0 || this.addUser.userRole === 0 || this.addUser.userRole === null
      const fang = userRole || userCode || userPassword || confirmPassword || userName || gender || phone || address || birthday
      if (fang) {
        Message({
          type: "error",
          duration: 1500,
          center: true,
          message: "信息不能为空"
        })
        return false
      }
      if (this.addUser.userPassword !== this.addUser.confirmPassword) {
        Message({
          type: "error",
          duration: 1500,
          center: true,
          message: "输入的密码不一致"
        })
        return false
      }
      this.$confirm('请检查输入的信息是否有误?', '提示', {
        confirmButtonText: '确定信息无误',
        cancelButtonText: '放弃添加',
        type: 'warning'
      }).then(() => {
            request.post("/api/user/save", this.addUser).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  center: true,
                  duration: 1500,
                  message: '添加成功!'
                });
                goUserList()
              } else {
                this.$message({
                  type: 'error',
                  center: true,
                  duration: 1500,
                  message: res.description
                });
              }
            })
          }
      ).catch(() => {
        this.$message({
          type: 'info',
          center: true,
          duration: 1500,
          message: '已取消操作!'
        });
      })
    }, inputCheck() {
      if (this.addUser.userPassword !== this.addUser.confirmPassword) {
        Message({
          type: "error",
          duration: 1500,
          center: true,
          message: "输入的密码不一致"
        })
      }
    }
  }, mounted() {
    this.getRoleList()
  }
}
</script>

<style scoped>

</style>