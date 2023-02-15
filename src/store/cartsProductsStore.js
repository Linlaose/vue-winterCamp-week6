import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('cartProductsStore', {
  state: () => ({
    products: [],
    carts: [],
    apiUrl: import.meta.env.VITE_URL,
    apiPath: import.meta.env.VITE_PATH,
  }),
  getters: {
    newProducts: ({ products }) => {
      return products;
    },
    newCarts: ({ carts }) => {
      return carts;
    },
  },
  actions: {
    getProducts() {
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/products`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getCarts() {
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart`;

      axios
        .get(url)
        .then((res) => {
          this.carts = res.data.data.carts;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
});
