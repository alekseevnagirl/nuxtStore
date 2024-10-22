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
    export default {
        data() {
            return {
                filters: ['Brand 1', 'Brand 2'],
                filterData: [],
                productData: []
            }
        },
        mounted() {
            this.filterData =
                { defaultFilter: 'All Brands', data: [
                    {
                        "id": 1,
                        "title": "Brand 1",
                    },
                    {
                        "id": 2,
                        "title": "Brand 2"
                    },
                    {
                        "id": 3,
                        "title": "Brand 3"
                    }
                ]};

            this.productData = [{
                "type": "simple",
                "id": 1,
                "sku": "s1",
                "title": "Product 1",
                "regular_price": {
                "currency": "USD",
                "value": 27.12
                },
                "image": "/images/1.png",
                "brand": 9
            },
            {
                "type": "simple",
                "id": 2,
                "sku": "s2",
                "title": "Product 2",
                "regular_price": {
                "currency": "USD",
                "value": 36.87
                },
                "image": "/images/2.png",
                "brand": 8
            }];
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
        gap: 20px;
    }
    .catalog__item {
    }
    .catalog__title {
        font-size: 24px;
        margin: 0;
        padding: 5px;
    }
</style>