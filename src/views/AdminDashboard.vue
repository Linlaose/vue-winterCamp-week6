<template>
  <div>
    <h1>你現在在後台頁面</h1>
    <div id="nav">
      <router-link to="/">回到前台</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <router-link to="/admin/orders">後台訂單</router-link> |
      <a href="#">登出</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
