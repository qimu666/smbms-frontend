<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>订单管理页面</span>
    </div>
    <div class="search">
      <form id="billSearch">
        <span>商品名称：</span>
        <input name="productName" type="text" v-model="queryDate.productName" id="productName">
        <span>供应商：</span>
        <select name="providerId" v-model="queryDate.providerId" id="providerId">
          <option value="0">--请选择--</option>
          <option v-for="item of providerList" :key="item.id" :value="item.id">{{ item.proName }}</option>
        </select>
        <span>是否付款：</span>
        <select name="isPayment" v-model="queryDate.isPayment" id="isPayment">
          <option value="0">--请选择--</option>
          <option value="1">--未支付--</option>
          <option value="2">--已支付--</option>
        </select>
        <input value="查 询" type="submit" @click.prevent="getBillList" id="searchbutton">
        <router-link to="/b_add">添加订单</router-link>
      </form>
    </div>
    <el-table
        :data="bill"
        stripe
        height="687"
        style="width: 100%" class="providerTable" cellpadding="0" cellspacing="0" id="billTable">
      <el-table-column align="center" label="编号" width="140" type="index"></el-table-column>
      <el-table-column align="center" prop="billCode" label="订单编码" width="180"></el-table-column>
      <el-table-column align="center" prop="productName" label="商品名称" width="240"></el-table-column>
      <el-table-column align="center" prop="providerName" label="供应商" width="300"></el-table-column>
      <el-table-column align="center" prop="totalPrice" label="订单金额" width="140"></el-table-column>
      <el-table-column align="center" prop="isPaymentStatus" label="是否付款" width="140"></el-table-column>
      <el-table-column align="center" prop="creationDate" label="创建时间" width="220"></el-table-column>
      <el-table-column align="center" prop="id" label="操作" width="270">
        <template slot-scope="scope">
          <!-- 在当前页面的模板中 -->
          <a @click.prevent="billView(scope.row)">
            <img src="@/assets/images/read.png" alt="查看" title="查看"/>
          </a>
          <a @click.prevent="updateBill(scope.row)">
            <img src="@/assets/images/xiugai.png" alt="修改" title="修改"/>
          </a>
          <a @click.prevent="billDelete(scope.row)">
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
import {billView, updateBill} from "@/assets/js/billList";

export default {
  name: "BillList",
  data() {
    return {
      queryDate: {
        productName: "",
        isPayment: 0,
        providerId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      bill: [],
      providerList: []
    }
  }, methods: {
    getBillList() {
      request.post('/bill/bills', this.queryDate
      ).then(res => {
        this.bill = res.data.billList
        this.total = res.data.total
        this.providerList = res.data.providerList
        sessionStorage.setItem("providerList", JSON.stringify(res.data.providerList))
      }).catch(e => {
        console.log(e)
      })
    }, sizeChange(size) {
      this.queryDate.pageSize = size
      this.getBillList()
    },
    CurrentChange(pageIndex) {
      this.queryDate.pageIndex = pageIndex
      this.getBillList()
    }, billView(row) {
      billView(row)
    }, updateBill(row) {
      updateBill(row)
    }, billDelete(row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        request.delete(`/bill/${row.id}`).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          this.getBillList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }
  },
  mounted() {
    this.getBillList()
  }
}
</script>

<style scoped>

</style>