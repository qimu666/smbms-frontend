<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>密码修改页面</span>
    </div>
    <div class="providerAdd">
      <div class="">
        <label for="oldPassword">旧密码：</label>
        <input type="password" v-model="password.oldPassword">
      </div>
      <div>
        <label for="newPassword">新密码：</label>
        <input type="password" v-model="password.newPassword">
      </div>
      <div>
        <label for="reNewPassword">确认新密码：</label>
        <input type="password" v-model="password.reNewPassword" @blur="inputCheck">
      </div>
      <div class="providerAddBtn">
        <input type="button" @click="updatePassword" value="保存" class="input-button">
      </div>
    </div>
  </div>
</template>

<script>
import {Message} from "element-ui";
import request from "@/assets/serves/request/API";

export default {
  name: "PasswordUpdate",
  data() {
    return {
      password: {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      }
    }
  }, methods: {
    inputCheck() {
      if (this.password.newPassword !== this.password.reNewPassword) {
        Message({
          type: "error",
          duration: 1500,
          center: true,
          message: "要修改的密码不一致"
        })
        return false
      }
    }, updatePassword() {
      const reNewPassword = this.password.reNewPassword.trim().length === 0 || this.password.reNewPassword === ''
      const newPassword = this.password.newPassword.trim().length === 0 || this.password.newPassword === ''
      const oldPassword = this.password.oldPassword.trim().length === 0 || this.password.oldPassword === ''
      if (reNewPassword || newPassword || oldPassword) {
        Message({
          type: "error",
          duration: 1500,
          center: true,
          message: "信息不能为空"
        })
        return false
      }
      if (this.password.newPassword !== this.password.reNewPassword) {
        Message({
          type: "error",
          duration: 1500,
          center: true,
          message: "要修改的密码不一致"
        })
        return false
      }
      this.$confirm('请确认修改密码?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.put("/api/user/updatePassword", this.password).then(res => {
          if (res.code === 0) {
            Message({
              type: "success",
              duration: 1500,
              center: true,
              message: "修改成功"
            })
          } else {
            Message({
              type: "error",
              duration: 1500,
              center: true,
              message: res.description
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          center: true,
          duration: 1500,
          message: '已取消删除'
        });
      })
    }
  },
}
</script>

<style scoped>

</style>