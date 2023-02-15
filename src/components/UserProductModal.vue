<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ tempProduct.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{
                tempProduct.category
              }}</span>
              <p>商品描述：{{ tempProduct.description }}</p>
              <p>商品內容：{{ tempProduct.content }}</p>
              <div
                v-if="tempProduct.price === tempProduct.origin_price"
                class="h5"
              >
                {{ tempProduct.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                <div class="h5">現在只要 {{ tempProduct.price }} 元</div>
              </div>
              <div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model.number="tempProduct.qty"
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click.prevent="addToCart(tempProduct.id, tempProduct.qty)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Bootstrap from 'bootstrap';

export default {
  props: {
    product: Object,
    apiUrl: String,
    apiPath: String,
  },
  data() {
    return {
      productModal: null,
      tempProduct: {},
    };
  },
  mounted() {
    this.productModal = new Bootstrap.Modal(this.$refs.modal, {
      backdrop: 'static',
    });
  },
  methods: {
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
          this.productModal.hide();
          // this.getCarts();
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  watch: {
    product(newVal) {
      this.tempProduct = newVal;
      this.productModal.show();
    },
  },
};
</script>
