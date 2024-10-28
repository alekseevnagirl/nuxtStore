import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
        cart: []
    };
  },
  mutations: {
    addToCart(state, product) {
        let checkSame = 0;
        state.cart.forEach((item) => { //some
            if (item.id === product.id) { 
                item.quantity = item.quantity + 1
                checkSame = 1;
            }
        })
        if (checkSame === 0) state.cart.push(product)
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