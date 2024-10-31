import { createStore } from "vuex";
import deepClone from 'lodash.clonedeep'

const store = createStore({
  state() {
    return {
        cart: []
    };
  },
  mutations: {
    addToCart(state, product) { 
      let isProductInCart = state.cart.some((item) => { 
        if (item.variant !== undefined && item.id === product.id && item.variant.product.id === product.variant.product.id) {
          item.quantity += 1;
          return true;
        }
        else if (item.variant === undefined && item.id === product.id) {
          item.quantity += 1;
          return true;
        } else {
          return false;
        }
      });
      
      if (!isProductInCart) {
        let cartProduct = deepClone(product); 
        delete cartProduct.configurable_options;
        delete cartProduct.variants;
        state.cart.push(cartProduct);
      }
    },
    deleteFromCart(state, productId) {
        let index = state.cart.findIndex((item) => item.id === productId);
        state.cart[index].quantity = 1;
        state.cart = state.cart.filter((product) => product.id !== productId)
    },
    updateCart(state, product) {
      let index = state.cart.findIndex((item) => item.id === product.id);
      state.cart[index] = product;
    }
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});