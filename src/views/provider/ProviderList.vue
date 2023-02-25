<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>供应商管理页面</span>
    </div>
    <div class="search">
      <span>供应商编码：</span>
      <input type="text" @keyup.enter="getProviderList" @input="getProviderList"
             v-model="queryDate.proCode">
      <span>供应商名称：</span>
      <input type="text" @keyup.enter="getProviderList" @input="getProviderList"
             v-model="queryDate.proName">
      <span>联系人：</span>
      <input type="text" @keyup.enter="getProviderList" @input="getProviderList"
             v-model="queryDate.proContact">
      <input value="查 询" type="submit" @click.prevent="getProviderList" id="searchbutton">
      <router-link to="/p_add">添加供应商</router-link>
    </div>
    <el-table
        :data="provider"
        stripe
        height="698"
        style="width: 100%" class="providerTable" cellpadding="0" cellspacing="0" id="providerTable">
      <el-table-column align="center" label="编号" width="100" type="index"></el-table-column>
      <el-table-column align="center" prop="proCode" label="供应商编码" width="100"></el-table-column>
      <el-table-column align="center" prop="proContact" label="联系人" width="100"></el-table-column>
      <el-table-column align="center" prop="proPhone" label="联系电话" width="180"></el-table-column>
      <el-table-column align="center" prop="proName" label="供应商名称" width="260"></el-table-column>
      <el-table-column align="center" prop="proAddress" label="联系地址" width="320"></el-table-column>
      <el-table-column align="center" prop="proFax" label="传真" width="170"></el-table-column>
      <el-table-column align="center" prop="creationDate" label="创建时间" width="180"></el-table-column>
      <el-table-column align="center" prop="id" label="操作" width="220">
        <template slot-scope="scope">
          <!-- 在当前页面的模板中 -->
          <a @click.prevent="providerView(scope.row)">
            <img src="@/assets/images/read.png" alt="查看" title="查看"/>
          </a>
          <a @click.prevent="updateProvider(scope.row)">
            <img src="@/assets/images/xiugai.png" alt="修改" title="修改"/>
          </a>
          <a @click.prevent="providerDelete(scope.row)">
            <img src="@/assets/images/schu.png" alt="删除" title="删除"/>
          </a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="sizeChange"
        @current-change="CurrentChange"
        :current-page="queryDate.pageIndex"
        :page-sizes="[10, 15, 30, 50]"
        :page-size="queryDate.pageSize"
        layout="total,  prev, pager, next, sizes ,->,jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import request from "@/assets/serves/request/API";
import {providerView, updateProvider} from "@/assets/js/providerList";

export default {
  name: "ProviderList",
  data() {
    return {
      queryDate: {
        proCode: '',
        proContact: '',
        proName: "",
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      provider: [],
    }
  }, methods: {
    getProviderList() {
      request.post('/api/provider/providers', this.queryDate
      ).then(res => {
        // console.log(res)
        this.provider = res.data.providerList
        this.total = res.data.total
      }).catch(e => {
        console.log(e)
      })
    }, sizeChange(size) {
      this.queryDate.pageSize = size
      this.getProviderList()
    },
    CurrentChange(pageIndex) {
      this.queryDate.pageIndex = pageIndex
      this.getProviderList()
    }, providerView(row) {
      providerView(row.id)
    }, updateProvider(row) {
      updateProvider(row.id)
    }, providerDelete(row) {
      this.$confirm('请确认是否删除该订单?', '警告', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消删除',
        type: 'error'
      }).then(() => {
        request.delete(`/api/provider/${row.id}`).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              center: true,
              duration: 1500,
              message: '删除成功!'
            });
          }
          this.getProviderList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          center: true,
          duration: 1500,
          message: '已取消操作'
        });
      })
    }
  },
  mounted() {
    this.getProviderList()
  }
}
</script>
