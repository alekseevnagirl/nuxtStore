<template>
    <div class="catalog__wrapper">
        <Filter :filters="filters" 
            :filterData="filterData" 
            class="catalog__filters">
        </Filter>

        <div class="catalog__items__wrapper">
            <p class="catalog__title">Catalog</p>
            <div class="catalog__items">
                <div v-for="(product, productId) in productData" 
                    class="catalog__item" 
                    :key="itemId">
                    <Product :productData="product"></Product>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import products from '~/static/products.json'
    import brands from '~/static/brands.json'

    export default {
        data() {
            return {
                filters: ['Brand 1', 'Brand 2'],
                filterData: [],
                productData: []
            }
        },
        mounted() {
            console.log(products)

            this.filterData =
                { defaultFilter: 'All Brands', data: brands};

            this.productData = products;
        }
    }
</script>

<style scoped>
    .catalog__wrapper {
        display: flex;
        flex-direction: row;
        gap: 100px;
        padding: 20px 5%;
    }
    .catalog__filters {
        flex: 1 1 20%;
    }
    .catalog__items__wrapper {
        flex: 1 1 80%;
        display: block;
    }
    .catalog__items {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 50px;
    }
    .catalog__title {
        font-size: 24px;
        margin: 0;
        padding: 5px;
    }
</style>