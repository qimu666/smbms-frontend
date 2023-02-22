<template>
  <div class="login_bg">
    <section class="loginBox">
      <header class="loginHeader">
        <h1>超市订单管理系统</h1>
      </header>
      <section class="loginCont">
        <form class="loginForm">
          <span class="info" id="info"></span>
          <div class="inputbox">
            <label for="userCode">用户名：</label>
            <input type="text" class="input-text" id="userCode" v-model="querData.userCode" name="userCode"
                   placeholder="请输入用户名"
                   required/>
          </div>
          <div class="inputbox">
            <label for="userPassword">密码：</label>
            <input type="password" id="userPassword" v-model="querData.userPassword" name="userPassword"
                   placeholder="请输入密码" required/>
          </div>
          <div class="subBtn">
            <input id="loginbtn" type="submit" @click.prevent="login" value="登录"/>
            <input type="reset" value="重置"/>
          </div>
        </form>
      </section>
    </section>
  </div>
</template>
<script>
import router from "@/router";
import request from "@/assets/serves/request/API";

export default {
  name: "userLogin",
  data() {
    return {
      querData: {
        userCode: "",
        userPassword: ''
      }
    }
  },
  methods: {
    login() {
      request.post("/user/login", this.querData).then(response => {
        const {description, code} = response
        if (code === 0) {
          router.push("/frame")
        } else {
          alert(description)
        }
      })
    }
  }
}
</script>

