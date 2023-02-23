<template>
  <div>
    <header class="publicHeader">
      <h1 @click="toFrame">超市订单管理系统</h1>
      <div class="publicHeaderR">
        <p><span>下午好！</span><span style="color: #fff21b">{{ userName }}</span> 欢迎你！</p>
        <a :plain="true" @click="logout">退出</a>
      </div>
    </header>
    <section class="publicTime">
      <span id="time">{{ formattedTine }}</span>
      <a href="#">温馨提示：为了能正常浏览，请使用高版本浏览器！（IE10+）</a>
    </section>
    <section class="publicMian ">
      <div class="left">
        <h2 class="leftH2"><span class="span1"></span>功能列表 <span></span></h2>
        <nav>
          <ul class="list">
            <li>
              <router-link to="/b_list">订单管理</router-link>
            </li>
            <li>
              <router-link to="/p_list">供应商管理</router-link>
            </li>
            <li>
              <router-link to="/u_list">用户管理</router-link>
            </li>
            <li>
              <router-link to="/p_update">密码修改</router-link>
            </li>
            <li>
              <a @click.prevent="logout">退出系统</a>
            </li>
          </ul>
        </nav>
      </div>
      <input type="hidden" id="path" name="path" value=""/>
      <input type="hidden" id="referer" name="referer" value=""/>
      <router-view/>
    </section>
    <footer class="footer">
      版权归北大青鸟
    </footer>
  </div>
</template>
<script>
import router from "@/router";
import request from "@/assets/serves/request/API";
export default {
  name: "HomeView",
  computed: {
    formattedTine() {
      return this.currentTime.toLocaleString()
    }
  }, methods: {
    logout() {
      this.$confirm('确认退出账号,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        request.get("/api/user/logout")
        if (!router.currentRoute.path.includes(router.currentRoute.path)) {
          this.$message({
            type: 'error',
            center: true,
            message: '退出成功!',
            duration: 2000
          });
        }
        sessionStorage.clear()
        router.replace("/")
      }).catch(() => {
        this.$message({
          center: true,
          duration: 1500,
          type: 'info',
          message: '已取消'
        });
      });
    }, current() {
      request.post('/api/user/current').then(res => {
        const {data} = res
        sessionStorage.setItem("loginUser", JSON.stringify(data))
      })
    },
    toFrame() {
      router.push("/frame")
    }, getLoginUser() {
      let loginUser = sessionStorage.getItem("loginUser");
      loginUser = JSON.parse(loginUser)
      if (loginUser){
        this.userName = loginUser.userName
      }
    }
  },
  mounted() {
    this.getLoginUser()
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  },
  created() {
    this.current()
  },
  data() {
    return {
      userName: '',
      currentTime: ""
    }
  }
}
</script>

<style scoped>

</style>