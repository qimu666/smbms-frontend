<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>用户管理页面 >> 用户信息查看页面</span>
    </div>
    <div class="providerView">
      <p><strong>用户编号：</strong><span>{{ user.userCode }}</span></p>
      <p><strong>用户名称：</strong><span>{{ user.userName }}</span></p>
      <p><strong>用户性别：</strong><span>{{ sexMapping(user.gender)}}</span></p>
      <p><strong>出生日期：</strong><span>{{ user.birthday }}</span></p>
      <p><strong>用户电话：</strong><span>{{ user.phone }}</span></p>
      <p><strong>用户地址：</strong><span>{{ user.address }}</span></p>
      <p><strong>用户角色：</strong><span>{{ user.userRoleName }}</span></p>
      <div class="providerAddBtn">
        <input type="button" value="返回" @click="goUserList">
      </div>
    </div>
  </div>
</template>
<script>
import {getUser, goUserList} from "@/assets/js/userlList";
import {genderEnum} from "@/assets/js/common/common";

export default {
  name: 'UserView',
  props: ['id'],
  methods: {
    async getUser() {
      const id = this.id
      this.uid = id ? id : this.uid
      if (this.uid) {
        getUser(this.id).then(res => {
          this.user = res.data
          sessionStorage.setItem('user', JSON.stringify(res.data))
        })
      }
    }, getSession() {
      const userSession = sessionStorage.getItem("user");
      this.user = JSON.parse(userSession)
    }, goUserList() {
      goUserList()
    }, sexMapping(gender) {
      return this.genderMapping[gender];
    }
  },
  data() {
    return {
      uid: 0,
      user: []
    }
  }, mounted() {
    this.getSession()
    this.getUser()
  }, computed: {
    genderMapping() {
      return genderEnum;
    }
  }
}
</script>