<template>
    <v-card>
        <v-img
            :width="250"
            cover
            :src="imageSrc === '' ? productData.image : imageSrc"
        ></v-img>

        <v-card-title>
            {{ productData.title }}
        </v-card-title>

        <v-card-subtitle class="product__subtitle">
            {{ subtitle }}
        </v-card-subtitle>

        <slot></slot>

        <v-card-actions>
            <v-btn @click="addProduct"
                class="product__button">
                Добавить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: {
            productData: {
                type: Object,
                default: {}
            },
            imageSrc: {
                type: String,
                default: ''
            }
        },
        computed: {
            currency() {
                if (this.productData?.regular_price?.currency) return '$'
                else return ''
            },
            subtitle() {
                let info = this.productData.brandName + this.currency + this.productData.regular_price.value
                return `${this.productData.brandName}\n${this.currency}${this.productData.regular_price.value}`;
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
    .product__subtitle {
        white-space: pre-line;
    }
    .product__button {
        width: 100%;
    }
</style>