<template>
  單一產品頁面
  <h2>{{ product.title }}</h2>
  <img :src="product.imageUrl" class="img-fluid" />
</template>

<script>
export default {
  name: 'productView',
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      const { VITE_URL, VITE_PATH } = import.meta.env;
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`;

      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
