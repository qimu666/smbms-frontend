<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>供应商管理页面 >> 供应商添加页面</span>
    </div>
    <div class="providerAdd">
      <div>
        <label>供应商编码：</label>
        <input type="text" v-model="provider.proCode">
      </div>
      <div>
        <label>供应商名称：</label>
        <input type="text" v-model="provider.proName">
      </div>
      <div>
        <label>联系人：</label>
        <input type="text" v-model="provider.proContact">
      </div>
      <div>
        <label>联系电话：</label>
        <input type="text" v-model="provider.proPhone">
      </div>
      <div>
        <label>联系地址：</label>
        <input type="text" v-model="provider.proAddress">
      </div>
      <div>
        <label>传真：</label>
        <input type="text" v-model="provider.proFax">
      </div>
      <div>
        <label>描述：</label>
        <input type="text" v-model="provider.proDesc">
      </div>
      <div class="providerAddBtn">
        <input type="button" @click.prevent="insertProvider" value="保存">
        <input type="button" @click.prevent="goProviderList" value="返回">
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/assets/serves/request/API";
import {Message} from "element-ui";
import {goProviderList} from "@/assets/js/providerList";

export default {
  name: "ProviderAdd",
  data() {
    return {
      provider: {
        proCode: "",
        proName: "",
        proContact: "",
        proPhone: "",
        proAddress: "",
        proFax: "",
        proDesc: "",
      }
    }
  }, methods: {
    goProviderList() {
      goProviderList()
    }, insertProvider() {
      const proCode = this.provider.proCode.trim().length === 0 || this.provider.proCode === '' || this.provider.proCode === null
      const proName = this.provider.proName.trim().length === 0 || this.provider.proName === '' || this.provider.proName === null
      const proContact = this.provider.proContact.trim().length === 0 || this.provider.proContact === '' || this.provider.proContact === null
      const proPhone = this.provider.proPhone.trim().length === 0 || this.provider.proPhone === '' || this.provider.proPhone === null
      const proAddress = this.provider.proAddress.trim().length === 0 || this.provider.proAddress === '' || this.provider.proAddress === null
      const proFax = this.provider.proFax.trim().length === 0 || this.provider.proFax === '' || this.provider.proFax === null
      const proDesc = this.provider.proDesc.length === 0 || this.provider.proDesc === '' || this.provider.proDesc === null
      const fang = proCode || proName || proContact || proPhone || proAddress || proFax || proDesc
      if (fang) {
        Message({
          type: "error",
          duration: 1500,
          center: true,
          message: "信息不能为空"
        })
        return false
      }
      this.$confirm('请检查输入的信息是否有误?', '提示', {
        confirmButtonText: '确定信息无误',
        cancelButtonText: '放弃添加',
        type: 'warning'
      }).then(() => {
            request.post("/api/provider/save", this.provider).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  center: true,
                  duration: 1500,
                  message: '添加成功!'
                });
                goProviderList()
              } else {
                this.$message({
                  type: 'error',
                  center: true,
                  duration: 1500,
                  message: res.description
                });
              }
            })
          }
      ).catch(() => {
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

<style scoped>

</style>