import { createStore } from "vuex";

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

      state.cart = state.cart.filter((item, itemId) => itemId !== index);
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