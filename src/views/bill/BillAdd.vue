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
        <label>供应商：</label>
        <select name="providerId" v-model="bill.providerId">
          <option value="0">--请选择--</option>
          <option :value="item.id" v-for="item of providerList" :key="item.id">{{ item.proName }}</option>
        </select>
      </div>
      <div>
        <label>是否付款：</label>
        <el-radio-group v-model="bill.isPayment">
          <el-radio :label="1">未支付</el-radio>
          <el-radio :label="2">已支付</el-radio>
        </el-radio-group>
      </div>
      <div class="providerAddBtn">
        <input type="button" @click.prevent="addBill" value="保存">
        <input type="button" @click.prevent="goBillList" value="返回">
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/assets/serves/request/API";
import {goBillList} from "@/assets/js/billList";

export default {
  name: "BillAdd",
  mounted() {
    this.getProList()
  }, data() {
    return {
      bill: {
        billCode: "",
        productName: "",
        providerId: 0,
        totalPrice: null,
        productCount: null,
        productUnit: "",
        isPayment: null,
      },
      providerList: []
    }
  }, methods: {
    getProList() {
      const proList = JSON.parse(sessionStorage.getItem("providerList"));
      if (proList) {
        this.providerList = proList
      } else {
        request.get("/api/provider/list").then(data => {
          this.providerList = data.data.providerList
        })
      }
    }, goBillList() {
      goBillList()
    }, addBill() {
      this.$confirm('请检查输入的信息是否有误?', '提示', {
        confirmButtonText: '确定信息无误',
        cancelButtonText: '放弃添加',
        type: 'warning'
      }).then(() => {
        request.post("/api/bill/save", this.bill).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              center: true,
              duration: 1500,
              message: '添加成功!'
            });
            goBillList()
          } else {
            this.$message({
              type: 'error',
              center: true,
              duration: 1500,
              message: res.description
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          center: true,
          duration: 1500,
          message: '已取消操作!'
        });
      })
    }
  }
}
</script>
