<template>
  <div class="right">
    <img class="wColck" src="@/assets/images/clock.jpg" alt=""/>
    <div class="wFont">
      <h2>{{ userName }}</h2>
      <p>欢迎来到超市订单管理系统!</p>
    </div>
  </div>
</template>
<script>

export default {
  name: "UserFrame",
  mounted() {
    this.getLoginUser()
  },
  methods: {
    getLoginUser() {
      let loginUser = sessionStorage.getItem("loginUser");
      loginUser = JSON.parse(loginUser)
      this.userName = loginUser.userName
    }
  },
  data() {
    return {
      userName: ''
    }
  }
}
</script>
