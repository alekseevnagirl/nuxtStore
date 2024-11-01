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
        state.cart.push(product);
      }
    },
    deleteFromCart(state, product) {
      let index = state.cart.findIndex((item) => 
        (item.variant !== undefined && item.id === product.id && item.variant.product.id === product.variant.product.id) 
        || (item.variant === undefined && item.id === product.id));
      //state.cart[index].quantity = 1

      state.cart = state.cart.filter((item, itemId) => itemId !== index
        /*(item.variant !== undefined && item.id === product.id && item.variant.product.id !== product.variant.product.id) 
        || (item.variant === undefined && item.id !== product.id)*/
      );
    },
    updateCart(state, product) {
      let index = state.cart.findIndex((item) => 
        (item.variant !== undefined && item.id === product.id && item.variant.product.id === product.variant.product.id) 
        || (item.variant === undefined && item.id === product.id));
      state.cart[index] = product;
    }
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});