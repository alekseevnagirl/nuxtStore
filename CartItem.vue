<template>
    <div class="cartItem__wrapper">
        <div>
            <img :src="cartItemData.image"
                class="cartItem__image"/>
        </div>

        <div class="cartItem__image__wrapper">
            <p>{{ cartItemData.brandName }} / {{ cartItemData.title }}</p>
        </div>

        <div>
            <p>{{ currency }}{{ cartItemData.regular_price.value }}</p>
        </div>

        <div>
            <input type="number" 
                step="1" 
                min="1" 
                class="cartItem__quantity"
                :value="cartItemData.quantity"
                @change="changeQuantity($event.target.value, cartItemData)"/>
        </div>

        <div>
            <p>{{ currency }}{{ total }}</p>
        </div>

        <div class="cartItem__trash__wrapper">
            <img src="/images/icons/trash.png"
                class="cartItem__trash"
                @click="deleteFromCart(cartItemData.id)"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currency: '',
                total: 0
            }
        },
        props: {
            cartItemData: {
                type: Object,
                default: {}
            }
        },
        computed: {
            currency() {
                if (this.cartItemData.regular_price.currency) return '$'
                else return ''
            },
            total() {
                let totalPrice = (this.cartItemData.regular_price.value * this.cartItemData.quantity).toFixed(2)
                return totalPrice
            }
        },
        methods: {
            deleteFromCart(id) {
                this.$store.commit("deleteFromCart", id)
            },
            changeQuantity(quantity, item) {
                item.quantity = parseInt(quantity);
                this.$store.commit('updateCart', item)
            }
        }
    }
</script>

<style scoped>
    .cartItem__wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
        width: 100%;
        border-bottom: 1px solid #000;
    }
    .cartItem__wrapper div {
        padding: 5px;
        flex: 1 1 10%;
        font-size: 18px;
    }
    .cartItem__wrapper div p {
        margin: 0;
    }
    .cartItem__image__wrapper {
        display: flex;
        align-items: center;
        flex: 1 1 50% !important;
    }
    .cartItem__image {
        width: 100px;
    }
    .cartItem__quantity {
        width: 70px;
        font-size: inherit;
    }
    .cartItem__trash {
        width: 20px;
        padding: 5px;
    }
    .cartItem__trash:hover {
        cursor: pointer;
    }

    @media(max-width: 768px) {
        .cartItem__wrapper {
            flex-direction: column;
            align-items: flex-start;
        }
        .cartItem__trash__wrapper {
            width: 100%;
        }
        .cartItem__trash {
            float: right;
        }
    }
</style>