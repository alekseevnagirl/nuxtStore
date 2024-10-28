<template>
    <div :id="productDataId"
        class="product__wrapper">

        <SimpleProduct v-if="productData.type === 'simple'"
            :productData="productData">
        </SimpleProduct>

        <ConfigurableProduct v-if="productData.type === 'configurable'" 
            :productData="productData">
        </ConfigurableProduct>
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
            productDataId() {
                return 'product' + this.productData?.id
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
    /*.product__subtitle {
        white-space: pre-line;
    }
    .product__button {
        width: 100%;
    }*/
</style>