<template>
  <div class="about">
    <h1>This is 購物車頁面</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-end">
            <button
              class="btn btn-outline-danger"
              type="button"
              @click.prevent="deleteAllCart"
            >
              清空購物車
            </button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cart in carts" :key="cart.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click.prevent="deleteCart(cart.id)"
                  >
                    <i class="fas fa-spinner fa-pulse"></i>
                    x
                  </button>
                </td>
                <td>
                  {{ cart.product.title }}
                  <div
                    v-if="cart.product.origin_price !== cart.product.price"
                    class="text-success"
                  >
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <input
                        min="1"
                        type="number"
                        class="form-control"
                        v-model="cart.qty"
                        @input="updateCart(cart.id, cart.qty)"
                      />
                      <span class="input-group-text" id="basic-addon2">{{
                        cart.product.unit
                      }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <small
                    :class="{
                      'text-decoration-line-through':
                        cart.product.origin_price !== cart.product.price,
                    }"
                  >
                    {{ cart.product.origin_price * cart.qty }}
                  </small>
                  <br />
                  <small
                    v-if="cart.product.origin_price !== cart.product.price"
                    class="text-success"
                  >
                    折扣價：{{ cart.product.price * cart.qty }}
                  </small>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ total }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ diffTotal }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <v-form
          class="col-md-6"
          @submit="onSubmit"
          ref="form"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <div class="mb-3">
            <label for="email" class="form-label">信箱</label>
            <v-field
              id="email"
              name="email"
              label="信箱"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              placeholder="請輸入 Email"
            />
            <error-message name="email"></error-message>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">姓名</label>
            <v-field
              id="name"
              name="name"
              label="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
              placeholder="請輸入姓名"
            />
            <error-message name="name"></error-message>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">電話</label>
            <v-field
              id="tel"
              name="tel"
              label="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.tel }"
              placeholder="請輸入電話"
              :rules="isPhone"
            />
            <error-message name="tel"></error-message>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">地址</label>
            <v-field
              id="address"
              name="address"
              label="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.address }"
              placeholder="請輸入地址"
            />
            <error-message name="address"></error-message>
          </div>

          <div class="mb-3">
            <label for="comment" class="form-label">留言</label>
            <textarea
              name="comment"
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="text"
            ></textarea>
          </div>
          <button class="btn btn-success">submit</button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Form as VForm,
  Field as VField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

import _ from 'lodash';

import { mapState, mapActions } from 'pinia';
import tw from '@vee-validate/i18n/dist/locale/zh_TW.json';
import productsStore from '../store/cartsProductsStore';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

localize({ tw });

configure({
  generateMessage: localize('zh_TW', tw),
});

export default {
  name: 'HomeCart',
  components: {
    VForm,
    VField,
    ErrorMessage,
  },
  data() {
    const schema = {
      email: 'required|email',
      name: 'required',
      tel: this.isPhone,
      address: 'required',
    };

    return {
      cart: {},
      diffTotal: null,
      total: null,
      schema,
      text: null,
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {
      const { address, email, name, tel } = values;
      const data = {
        user: {
          address,
          email,
          name,
          tel,
        },
        message: this.text,
      };
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/order`;

      this.$http
        .post(url, { data })
        .then((res) => {
          alert(res.data.message);
          this.text = null;
          resetForm();
          this.getCarts();
        })
        .catch((err) => {
          alert(err);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      if (phoneNumber.test(value)) {
        return true;
      }
      if (typeof value !== 'number' && value) {
        return '請輸入正確格式，例如：09xx-xxx-xxx';
      }
      return '電話號碼為必填';
    },
    // eslint-disable-next-line func-names
    updateCart: _.debounce(function (productId, qty) {
      this.updateData(productId, qty);
    }, 500),
    updateData(productId, qty) {
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart/${productId}`;
      const data = {
        product_id: productId,
        qty,
      };

      this.$http
        .put(url, { data })
        .then(() => {
          this.getCarts();
        })
        .catch((err) => {
          alert(err);
        });
    },
    deleteCart(productId) {
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/cart/${productId}`;

      this.$http
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          this.getCarts();
        })
        .catch((err) => {
          alert(err);
        });
    },
    deleteAllCart() {
      const url = `${this.apiUrl}/v2/api/${this.apiPath}/carts`;

      this.$http
        .delete(url)
        .then(() => {
          alert('已清空購物車');
          this.getCarts();
        })
        .catch((err) => alert(err));
    },
    ...mapActions(productsStore, ['getCarts']),
  },
  computed: {
    ...mapState(productsStore, ['carts', 'apiUrl', 'apiPath']),
  },
  watch: {
    carts: {
      handler(newVal) {
        this.diffTotal = newVal
          .map((item) => item.product.price * item.qty)
          .reduce((a, b) => {
            return a + b;
          }, 0);
        this.total = newVal
          .map((item) => item.product.origin_price * item.qty)
          .reduce((a, b) => {
            return a + b;
          }, 0);
      },
      deep: true,
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
