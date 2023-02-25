<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>供应商管理页面 >> 信息查看</span>
    </div>
    <div class="providerView">
      <p><strong>供应商编码：</strong><span>{{ provider.proCode }}</span></p>
      <p><strong>供应商名称：</strong><span>{{ provider.proName }}</span></p>
      <p><strong>联系人：</strong><span>{{provider.proContact}}</span></p>
      <p><strong>联系电话：</strong><span>{{ provider.proPhone }}</span></p>
      <p><strong>传真：</strong><span>{{ provider.proFax }}</span></p>
      <p><strong>联系地址：</strong><span>{{ provider.proAddress }}</span></p>
      <p><strong>描述：</strong><span>{{ provider.proDesc }}</span></p>
      <div class="providerAddBtn">
        <input type="button" value="返回" @click="goProviderList">
      </div>
    </div>
  </div>
</template>
<script>
import {genderEnum} from "@/assets/js/common/common";
import {getProvider, goProviderList} from "@/assets/js/providerList";
export default {
  name: 'ProviderView',
  props: ['id'],
  methods: {
    async getProvider() {
      const id = this.id
      this.uid = id ? id : this.uid
      if (this.uid) {
        getProvider(this.id).then(res => {
          this.provider = res.data
          sessionStorage.setItem('provider', JSON.stringify(res.data))
        })
      }
    }, getSession() {
      const providerSession = sessionStorage.getItem("provider");
      this.provider = JSON.parse(providerSession)
    }, goProviderList() {
      goProviderList()
    }, sexMapping(gender) {
      return this.genderMapping[gender];
    }
  },
  data() {
    return {
      uid: 0,
      provider: []
    }
  }, mounted() {
    this.getSession()
    this.getProvider()
  }, computed: {
    genderMapping() {
      return genderEnum;
    }
  }
}
</script>