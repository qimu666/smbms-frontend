<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>供应商管理页面 >> 供应商修改页面</span>
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
        <el-input
            style="width: 270px;height: 50px"
            type="textarea"
            size="mini"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="描述"
            show-word-limit
            v-model="provider.proDesc">
        </el-input>
      </div>

      <div class="providerAddBtn">
        <input type="button" @click.prevent="updateProvider" value="保存">
        <input type="button" @click.prevent="goProviderList" value="返回">
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/assets/serves/request/API";
import {getProvider, goProviderList} from "@/assets/js/providerList";

export default {
  name: "ProviderUpdate",
  props: ['id'],
  data() {
    return {
      provider: {},
    }
  },
  methods: {
    async getProvider() {
      if (this.id) {
        await getProvider(this.id).then(e => {
          this.provider = e.data
          sessionStorage.setItem('provider', JSON.stringify(e.data))
        })
      }
    }, getSession() {
      const providerSession = sessionStorage.getItem("provider");
      this.provider = JSON.parse(providerSession)
    }, goProviderList() {
      goProviderList()
    }, async updateProvider() {
      this.$confirm('请确认是否继续修改该用户信息!', '提示', {
        confirmButtonText: '确定修改',
        cancelButtonText: '取消修改',
        type: 'warning'
      }).then(() => {
        request.put("/api/provider/save", this.provider).then(res => {
          if (res.code === 0) {
            this.$message({
              center: true,
              type: 'success',
              duration: 1500,
              message: '修改成功!'
            });
            goProviderList()
          } else {
            this.$message({
              center: true,
              type: 'error',
              duration: 1500,
              message: res.description
            });
          }
        })
      }).catch(() => {
        this.$message({
          center: true,
          type: 'info',
          duration: 1500,
          message: '取消成功!'
        });
      })
    }
  },
  mounted() {
    this.getProvider()
    this.getSession()
  }
}
</script>
