<template>
    <div class="cart__wrapper">
        <p class="cart__title">Shopping Cart</p>

        <div class="cart__data__header">
            <p class="cart__data__header__item">Item</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p></p>
        </div>

        <div v-for="(item, id) in cartItems" 
            :key="id">
            <CartItem :cart-item-data="item"></CartItem>
        </div>

        <div class="cart__subtotal">
            <p>Subtotal: {{ currency }}{{ getSubTotal(cartItems) }}</p>
            <button>Checkout</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cartItems: [],
                currency: ''
            }
        },
        computed: {
            cartItems() {
                return this.$store.state.cart;
            },
            currency() {
                if (this.$store.state.cart[0].regular_price.currency === 'USD') return '$'
                else return ''
            }
        },
        methods: {
            getSubTotal(cartItems) {
                let subtotal = 0;
                cartItems.forEach((product) => {
                    subtotal = subtotal + (product.quantity * product.regular_price.value); // валидацию инпута, замечания, асинхронные запросы
                })
                subtotal = subtotal.toFixed(2);
                return subtotal;
            }
        }
    }
</script>

<style>
    .cart__wrapper {
        padding: 20px 5%;
    }
    .cart__title {
        font-size: 24px;
        margin: 20px 5px;
    }
    .cart__data__header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
    .cart__data__header p {
        padding: 5px;
        flex: 1 1 10%;
        margin: 0;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
    .cart__data__header__item {
        flex: 1 1 60% !important;
        text-align: center;
    }
    .cart__subtotal {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        font-size: 24px;
        font-weight: bold;
    }
    .cart__subtotal button {
        font-size: 18px;
        padding: 5px 20px;
        background-color: #fff;
        box-shadow: 10px 5px 5px #808080;
    }
</style>
