<template>
    <div class="cartItem__wrapper">
        <div class="cartItem__image__wrapper">
            <img :src="cartItemData.image"
                class="cartItem__image"/>
            <p>{{ cartItemData.brandName }} / {{ cartItemData.title }}</p>
        </div>

        <div>
            <p>{{ cartItemData.regular_price }}</p> <!-- computed, not method -->
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
            <p>{{ getTotal(cartItemData) }}</p>
        </div>

        <div>
            <img src="/images/icons/trash.png"
                class="cartItem__trash"
                @click="deleteFromCart(cartItemData.id)"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            cartItemData: {
                type: Object,
                default: {}
            }
        },
        methods: {
            deleteFromCart(id) {
                this.$store.commit("deleteFromCart", id)
            },
            getPrice(price) {
                let currency = ''
                if (price.currency === 'USD') currency = '$' 
                const priceCurrency = currency + parseFloat(price.value.toFixed(2))
                return priceCurrency
            },
            getTotal(item) {
                let currency = ''
                if (item.regular_price.currency === 'USD') currency = '$' 
                const priceCurrency = currency + (item.regular_price.value * item.quantity).toFixed(2)
                return priceCurrency
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
    .cartItem__image__wrapper {
        display: flex;
        align-items: center;
        flex: 1 1 60% !important;
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
    }
    .cartItem__trash:hover {
        cursor: pointer;
    }
</style>