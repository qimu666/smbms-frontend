<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>订单管理页面 >> 信息查看</span>
    </div>
    <div class="providerView">
      <p><strong>订单编号：</strong><span>{{ bill.billCode }}</span></p>
      <p><strong>商品名称：</strong><span>{{ bill.productName }}</span></p>
      <p><strong>商品单位：</strong><span>{{ bill.productUnit }}</span></p>
      <p><strong>商品数量：</strong><span>{{ bill.productCount }}</span></p>
      <p><strong>总金额：</strong><span>{{ bill.totalPrice }}</span></p>
      <p><strong>供应商：</strong><span>{{ bill.providerName }}</span></p>
      <p><strong>是否付款：</strong>
        <span>
         {{ bill.isPaymentStatus }}
			</span>
      </p>
      <div class="providerAddBtn">
        <input type="button" value="返回" @click="goBillList">
      </div>
    </div>
  </div>
</template>

<script>

import {getBill, goBillList} from "@/assets/js/billList";

export default {
  name: "BillView",
  props: ['id'],
  methods: {
    async getBill() {
      const id = this.id
      this.bid = id ? id : this.bid
      if (this.bid) {
        getBill(this.id).then(res => {
          this.bill = res.data
          sessionStorage.setItem('bill', JSON.stringify(res.data))
        })
      }
    }, getSession() {
      const billSession = sessionStorage.getItem("bill");
      this.bill = JSON.parse(billSession)
    }, goBillList() {
      goBillList()
    },
  },
  data() {
    return {
      bid: 0,
      bill: []
    }
  }, mounted() {
    this.getSession()
    this.getBill()
  },
}
</script>

<style scoped>

</style>