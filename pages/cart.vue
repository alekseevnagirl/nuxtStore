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
            Subtotal: {{ currency }}{{ subtotal }}
            <v-btn>
                Checkout
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            cartItems() {
                return this.$store.state.cart;
            },
            currency() {
                if (this.$store.state?.cart[0]?.regular_price?.currency === 'USD') return '$'
                else return ''
            },
            subtotal() {
                let subtotal = 0;
                this.$store.state.cart.forEach((product) => {
                    subtotal = subtotal + (product.quantity * product?.regular_price?.value); // асинхронные запросы
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
        flex: 1 1 55% !important;
        text-align: center;
    }
    .cart__subtotal {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        font-size: 24px;
        font-weight: bold;
        gap: 20px;
        padding: 10px;
    }

    @media(max-width: 768px) {
        .cart__data__header {
            display: none;
        }
    }
</style>
