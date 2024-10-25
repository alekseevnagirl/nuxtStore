<template>
    <div class="cartItem__wrapper">

        <div class="cartItem__image__wrapper">
            <img :src="cartItemData.image"
                class="cartItem__image"/>
        </div>

        <div class="cartItem__info__wrapper">
            
            <div class="cartItem__brand">
                {{ cartItemData.brandName }} / {{ cartItemData.title }}
            </div>

            <div class="cartItem__price">
                {{ currency }}{{ cartItemData?.regular_price?.value }}
            </div>

            <div>
                <input type="number" 
                    step="1" 
                    min="1" 
                    class="cartItem__quantity"
                    :value="cartItemData.quantity"
                    @change="changeQuantity($event.target.value, cartItemData)"/>
            </div>

            <div class="cartItem__total">
                {{ currency }}{{ total }}
            </div>

            <div class="cartItem__trash__wrapper">
                <img src="/images/icons/trash.png"
                    class="cartItem__trash"
                    @click="deleteFromCart(cartItemData.id)"/>
            </div>

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
                if (this.cartItemData?.regular_price?.currency) return '$'
                else return ''
            },
            total() {
                let totalPrice = (this.cartItemData?.regular_price?.value * this.cartItemData.quantity).toFixed(2)
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
        border-bottom: 1px solid #000;
    }
    .cartItem__image__wrapper {
        flex: 1 1 20%;
    }
    .cartItem__info__wrapper {
        flex: 1 1 80%;
        display: flex;
        align-items: center;
        text-align: center;
        width: 100%;
    }
    .cartItem__info__wrapper div {
        padding: 5px;
        font-size: 18px;
        flex: 1 1 10%;
    }
    .cartItem__info__wrapper div p {
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .cartItem__brand {
        display: flex;
        align-items: center;
        flex: 1 1 40% !important;
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
        .cartItem__info__wrapper {
            flex-direction: column;
            align-items: flex-start;
            max-width: 100%;
            align-content: flex-start;
        }
        .cartItem__info__wrapper div {
            max-width: 100%;
            font-size: 16px;
            flex: 1 1 20%;
        }
        .cartItem__trash {
            float: right;
            width: 17px;
        }
        .cartItem__trash__wrapper {
            width: 100%;
        }
        .cartItem__image {
            width: auto;
            height: 150px;
        }
        .cartItem__brand {
            flex: 1 1 60% !important;
        }
        .cartItem__price::before {
            content: 'Price: ';
        }
        .cartItem__total::before {
            content: 'Total: ';
        }
        .cartItem__total {
            font-weight: bold;
        }
    }
</style>