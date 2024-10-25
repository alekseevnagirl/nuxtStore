<template>
    <div :id="productDataId"
        class="product__wrapper">

        <v-card :title="productData.title" 
            :text="subtitle">
            <v-img
                :width="250"
                cover
                :src="productData.image"
            ></v-img>
            
            <v-card-actions>
                <v-btn @click="addProduct">Добавить</v-btn>
            </v-card-actions>
        </v-card>

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
        computed: {
            currency() {
                if (this.productData?.regular_price?.currency) return '$'
                else return ''
            },
            productDataId() {
                return 'product' + this.productData?.id
            },
            subtitle() {
                let info = this.productData.brandName + this.currency + this.productData.regular_price.value
                return `${this.productData.brandName}<br>${this.currency}${this.productData.regular_price.value}`;
            }
        },
        methods: {
            addProduct() {
                this.$store.commit("addToCart", this.productData)
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