<template>
    <div :id="setId(productData)"
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
            {{ setCurrencySign(productData?.regular_price?.currency) }}{{ productData?.regular_price?.value }}
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
            setCurrencySign(currency) {
                if (currency === 'USD') return '$'
                else return ''
            },
            addProduct(productData) {
                /*var btn = document.getElementById('product' + productData.id);
                btn.addEventListener("click", function() {
                    this.classList.add("product__added");
                });*/
            },
            setId (productData) {
                const id = 'product' + productData.id
                return id
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