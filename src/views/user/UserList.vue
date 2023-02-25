<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>用户管理页面</span>
    </div>
    <div class="search">
      <span>用户名：</span>
      <input name="userName" @input="getUserList" @keyup.enter="getUserList" type="text" v-model="queryDate.userName">
      <span>用户角色：</span>
      <select name="userRole" v-model="queryDate.userRole">
        <option value="0">--请选择--</option>
        <option v-for="item of roleList" :key="item.id" :value="item.id">{{ item.roleName }}</option>
      </select>
      <router-link to="/u_add">添加用户</router-link>
      <input value="查 询" type="submit" @click.prevent="getUserList" id="searchbutton">
    </div>
    <el-table
        :data="user"
        stripe
        height="699"
        style="width: 100%" class="providerTable" cellpadding="0" cellspacing="0">
      <el-table-column align="center" label="编号" width="80" type="index"></el-table-column>
      <el-table-column align="center" prop="userCode" label="用户编码" width="120"></el-table-column>
      <el-table-column align="center" prop="userName" label="用户名称" width="120"></el-table-column>
      <el-table-column align="center" prop="userRoleName" label="用户角色" width="120"></el-table-column>
      <el-table-column align="center" prop="gender" label="性别" width="80">
        <template v-slot="{row}">
          {{ sexMapping(row.gender) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="birthday" label="生日" width="140"></el-table-column>
      <el-table-column align="center" prop="phone" label="电话" width="200"></el-table-column>
      <el-table-column align="center" prop="address" label="地址" width="240"></el-table-column>
      <el-table-column align="center" prop="creationDate" label="创建时间" width="260"></el-table-column>
      <el-table-column align="center" prop="id" label="操作" width="270">
        <template v-slot="scope">
          <!-- 在当前页面的模板中 -->
          <a @click.prevent="userView(scope.row)">
            <img src="@/assets/images/read.png" alt="查看" title="查看"/>
          </a>
          <a @click.prevent="updateUser(scope.row)">
            <img src="@/assets/images/xiugai.png" alt="修改" title="修改"/>
          </a>
          <a @click.prevent="userDelete(scope.row)">
            <img src="@/assets/images/schu.png" alt="删除" title="删除"/>
          </a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="sizeChange"
        @current-change="CurrentChange"
        :current-page="queryDate.pageIndex"
        :page-sizes="[10, 30, 50,100]"
        :page-size="queryDate.pageSize"
        layout="total,  prev, pager, next, sizes ,->,jumper"
        :total="total">
    </el-pagination>
  </div>
</template>
<script>
import request from "@/assets/serves/request/API";
import {genderEnum} from "@/assets/js/common/common";
import {updateUser, userView} from "@/assets/js/userlList";

export default {
  name: 'UserList',
  data() {
    return {
      queryDate: {
        userName: "",
        userRole: 0,
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      user: [],
      roleList: []
    }
  }, methods: {
    getUserList() {
      request.post('/api/user/users', this.queryDate
      ).then(res => {
        this.user = res.data.userList
        this.total = res.data.total
        this.roleList = res.data.roleList
        sessionStorage.setItem("roleList", JSON.stringify(res.data.roleList))
      }).catch(e => {
        console.log(e)
      })
    }, sizeChange(size) {
      this.queryDate.pageSize = size
      this.getUserList()
    },
    CurrentChange(pageIndex) {
      this.queryDate.pageIndex = pageIndex
      this.getUserList()
    }, userView(row) {
      userView(row.id)
    }, updateUser(row) {
      updateUser(row.id)
    }, userDelete(row) {
      this.$confirm('请确认是否删除该用户?', '警告', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消删除',
        type: 'error'
      }).then(() => {
        request.delete(`/api/user/${row.id}`).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              center: true,
              duration: 1500,
              message: '删除成功!'
            });
          }
          this.getUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          center: true,
          duration: 1500,
          message: '已取消删除'
        });
      })
    }, sexMapping(gender) {
      return this.genderMapping[gender]
    }
  },
  mounted() {
    this.getUserList()
  }, computed: {
    // 映射年龄
    genderMapping() {
      return genderEnum
    }
  }
}
</script>