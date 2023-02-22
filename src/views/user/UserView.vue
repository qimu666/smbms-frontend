<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>用户管理页面 >> 用户信息查看页面</span>
    </div>
    <div class="providerView">
      <input type="hidden" value="" id="viewId">
      <p><strong>用户编号：</strong><span class="wid"></span></p>
      <p><strong>用户名称：</strong><span class="wid"></span></p>
      <p><strong>用户性别：</strong><span class="wid"></span></p>
      <p><strong>出生日期：</strong><span class="wid"></span></p>
      <p><strong>用户电话：</strong><span class="wid"> </span></p>
      <p><strong>用户地址：</strong><span class="wid"></span></p>
      <p><strong>用户角色：</strong><span class="wid"></span></p>
      <div class="providerAddBtn">
        <input type="button" id="back" name="back" value="返回">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserView',
}
</script>