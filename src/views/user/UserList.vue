<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>用户管理页面</span>
    </div>
    <div class="search">
      <form class="search">
        <span>用户名：</span>
        <input name="userName" id="userName" class="input-text" type="text" value="">
        <span>用户角色：</span>
        <select name="userRole" id="userRole"></select>
        <input value="查 询" type="submit" id="searchbutton">
        <a href="${pageContext.request.contextPath}/useradd">添加用户</a>
      </form>
    </div>
    <!--用户-->
    <table class="providerTable" cellpadding="0" cellspacing="0">
      <tr class="firstTr">
        <th width="10%">用户id</th>
        <th width="10%">用户编码</th>
        <th width="20%">用户名称</th>
        <th width="10%">性别</th>
        <th width="10%">生日</th>
        <th width="10%">电话</th>
        <th width="10%">用户角色</th>
        <th width="20%">操作</th>
      </tr>
      <tr v-for="item of user" :key="item.id">
        <td>
          <span>{{item.userCode}}</span>
        </td>
        <td>
          <span></span>
        </td>
        <td>
          <span></span>
        </td>
        <td>
          <span></span>
        </td>
        <td>
          <span></span>
        </td>
        <td>
          <span></span>
        </td>
        <td>
          <span></span>
        </td>
        <td>
            <span><span class="viewUser" href="javascript:;" userid="${user.id}"
                        username="${user.userName}"><img
                src="@/assets/images/read.png" alt="查看"
                title="查看"/></span>         </span>
          <span>
                        <span class="modifyUser" userid="${user.id }"
                              username="${user.userName}"><img
                            src="@/assets/images/xiugai.png" alt="修改"
                            title="修改"/></span></span>
          <span><span class="deleteUser" userid="${user.id }"
                      username="${user.userName }"><img
              src="@/assets/images/schu.png" alt="删除"
              title="删除"/></span></span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'UserList',
  data() {
    return {
      user: [{
        userCode: "111"
      },{
        userCode: "222"
      }]
    }
  }
}
</script>