<template>
  <div>
    <h1>This is 產品列表頁面</h1>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in newProducts" :key="product.id">
          <td style="width: 200px">
            <div
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
            ></div>
          </td>
          <td>{{ product.title }}</td>
          <td>
            <div v-if="product.price === product.origin_price" class="h5">
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click.prevent="openModal(product.id)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <user-product-modal
      :product="product"
      :api-url="apiUrl"
      :api-path="apiPath"
    />
  </div>
</template>

<script>
import UserProductModal from '@/components/UserProductModal.vue';
import { mapState, mapActions } from 'pinia';
import productsStore from '../store/cartsProductsStore';

export default {
  name: 'HomeProducts',
  data() {
    return {
      products: [],
      product: {},
    };
  },
  components: {
    UserProductModal,
  },
  methods: {
    openModal(productId, qty = 1) {
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/product/${productId}`;
      this.$http
        .get(url)
        .then((res) => {
          this.product = {
            ...res.data.product,
            qty,
          };
        })
        .catch((err) => {
          alert(err);
        });
    },
    addToCart(productId, qty = 1) {
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart`;
      const data = {
        product_id: productId,
        qty,
      };

      this.$http
        .post(url, { data })
        .then((res) => {
          alert(res.data.message);
          // this.getCarts();
        })
        .catch((err) => {
          alert(err);
        });
    },
    ...mapActions(productsStore, ['getProducts']),
  },
  computed: {
    ...mapState(productsStore, ['newProducts', 'apiUrl', 'apiPath']),
  },
  watch: {
    parentProducts(newVal) {
      this.products = newVal;
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
