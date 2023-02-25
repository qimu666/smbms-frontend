<template>
  <div class="right">
    <div class="location">
      <strong>你现在所在的位置是:</strong>
      <span>供应商管理页面</span>
    </div>
    <div class="search">
      <form method="get" action="/provider.do">
        <input name="method" value="query" type="hidden">
        <span>供应商编码：</span>
        <input name="queryProCode" type="text" value="">

        <span>供应商名称：</span>
        <input name="queryProName" type="text" value="">
        <input value="查 询" type="submit" id="searchbutton">
        <router-link to="/u_add">添加用户</router-link>
      </form>
    </div>
    <!--供应商操作表格-->
    <table class="providerTable" cellpadding="0" cellspacing="0">
      <tr class="firstTr">
        <th width="10%">供应商编码</th>
        <th width="20%">供应商名称</th>
        <th width="10%">联系人</th>
        <th width="10%">联系电话</th>
        <th width="10%">传真</th>
        <th width="10%">创建时间</th>
        <th width="30%">操作</th>
      </tr>
        <tr>
          <td>
            <span></span>
          </td>
          <td>
            <span></span>
          </td>
          <td>
            <span></span>
          </td>
          <td>
            <span></span>
          </td>
          <td>
            <span></span>
          </td>
          <td>
					<span>
				222
					</span>
          </td>
          <td>
                    <span><a class="viewProvider" href="javascript:;"><img
                        src="@/assets/images/read.png" alt="查看"
                        title="查看"/></a></span>
            <span><a class="modifyProvider" href="javascript:;"><img
                src="@/assets/images/xiugai.png" alt="修改" title="修改"/></a></span>
            <span><a class="deleteProvider" href="javascript:;"><img
                src="@/assets/images/schu.png" alt="删除" title="删除"/></a></span>
          </td>
        </tr>
    </table>

  </div>
</template>

<script>
export default {
  name: "ProviderList"
}
</script>

<style scoped>

</style>