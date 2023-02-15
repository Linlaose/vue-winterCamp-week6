<template>
  <div>
    這裡是 後台 產品列表
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{}}</td>
          <td>{{}}</td>
          <td class="text-end">{{}}</td>
          <td class="text-end">{{}}</td>
          <td>
            <span class="text-success">啟用</span>
            <span>未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AdminProducts',
};
</script>
