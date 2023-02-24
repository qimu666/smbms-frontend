<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>订单管理页面 >> 订单添加页面</span>
    </div>
    <div class="providerAdd">
      <div>
        <label for="billCode">订单编码：</label>
        <input type="text" v-model="bill.billCode">
      </div>
      <div>
        <label for="productName">商品名称：</label>
        <input type="text" v-model="bill.productName">

      </div>
      <div>
        <label for="productUnit">商品单位：</label>
        <input type="text" v-model="bill.productUnit">

      </div>
      <div>
        <label for="productCount">商品数量：</label>
        <input type="text" v-model="bill.productCount">

      </div>
      <div>
        <label for="totalPrice">总金额：</label>
        <input type="text" v-model="bill.totalPrice">

      </div>
      <div>
        <label for="providerId">供应商：</label>
        <select v-model="bill.providerId" id="providerId">
          <option value="0">--请选择--</option>
          <option v-for="item of providerList" :key="item.id" :value="item.id">{{ item.proName }}</option>
        </select>

      </div>
      <div>
        <label>是否付款：</label>
        <template>
          <el-radio-group v-model="bill.isPayment">
            <el-radio :label=1>未付款</el-radio>
            <el-radio :label=2>已付款</el-radio>
          </el-radio-group>
        </template>
        <div class="providerAddBtn">
          <input type="button" @click.prevent="updateBill" value="保存">
          <input type="button" @click.prevent="goBillList" value="返回">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getBill, goBillList} from "@/assets/js/billList";
import request from "@/assets/serves/request/API";

export default {
  name: "BillUpdate",
  props: ['id'],
  data() {
    return {
      bill: {},
      providerList: []
    }
  },
  methods: {
    async getBill() {
      if (this.id) {
        await getBill(this.id).then(e => {
          this.bill = e.data
          sessionStorage.setItem('bill', JSON.stringify(e.data))
        })
      }
    }, getProList() {
      const proList = sessionStorage.getItem("providerList");
      if (proList) {
        this.providerList = JSON.parse(proList)
      } else {
        request.get("/api/provider/list").then(data => {
          this.providerList = data.data.providerList
        })
      }
    }, getSession() {
      const billSession = sessionStorage.getItem("bill");
      this.bill = JSON.parse(billSession)
    }, goBillList() {
      goBillList()
    }, async updateBill() {
      this.$confirm('请确认是否继续修改订单信息!', '提示', {
        confirmButtonText: '确定修改',
        cancelButtonText: '取消修改',
        type: 'warning'
      }).then(() => {
        request.put("/api/bill/save", this.bill).then(res => {
          if (res.code === 0) {
            this.$message({
              center: true,
              type: 'success',
              duration:1500,
              message: '修改成功!'
            });
            goBillList()
          }else {
            this.$message({
              center: true,
              type: 'error',
              duration:1500,
              message:res.description
            });
          }
        })
      }).catch(() => {
        this.$message({
          center: true,
          type: 'info',
          duration:1500,
          message: '取消成功!'
        });
      })
    }
  },
  mounted() {
    this.getProList()
    this.getBill()
    this.getSession()
  }
}
</script>

<style scoped>

</style>