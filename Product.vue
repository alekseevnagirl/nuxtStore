<template>
    <div :id="getId(productData)"
        class="product__wrapper">
        <div class="product__image__wrapper">
            <img :src="productData.image" 
                class="product__image"/>
        </div>
        <p class="product__name">
            {{ productData.title }}
        </p>
        <p class="product__info">
            {{ productData.brandName }}
        </p>
        <p class="product__info">
            {{ getPrice(productData.regular_price) }} <!-- set -> get (define) -->
        </p>

        <button class="product__button"
            @click="addProduct(productData)">
            Добавить
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            productData: {
                type: Object,
                default: {}
            }
        },
        methods: {
            addProduct(productData) {
                this.$store.commit("addToCart", productData)
            },
            getId (productData) {
                const id = 'product' + productData.id
                return id
            },
            getPrice(price) {
                let currency = ''
                if (price.currency === 'USD') currency = '$' 
                const priceCurrency = currency + parseFloat(price.value.toFixed(2))
                return priceCurrency
            }
        }
    }
</script>

<style scoped>
    .product__wrapper {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 5px;
        border: 1px solid #fff;
    }
    .product__button {
        font-size: 16px;
        padding: 5px;
        width: 100%;
        background-color: #fff;
        border: 1px solid #808080;
    }
    .product__button:hover {
        cursor: pointer;
        border: 1px solid #ffdd00;
    }
    .product__name {
        font-size: 20px;
        margin: 0;
    }
    .product__info {
        font-size: 16px;
        margin: 0;
    }
    .product__image__wrapper {
        height: 300px;
        width: 250px;
        align-content: center;
    }
    .product__image {
        width: inherit;
    }
</style>