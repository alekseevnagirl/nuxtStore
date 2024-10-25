<template>
    <div class="catalog__wrapper">
        <Filter :filterData="filterData" 
            class="catalog__filters"
            @selectedFilter="selectedFilter">
        </Filter>

        <div class="catalog__items__wrapper">
            <p class="catalog__title">Catalog</p>
            <div class="catalog__items">
                <div v-for="(product, productId) in products" 
                    class="catalog__item" 
                    :key="productId">
                    <Product :productData="product"></Product>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import products from '~/static/products.json' //асинхронно в режиме ssr - новый сабтаск
    import brands from '~/static/brands.json'

    export default {
        data() {
            return {
                filterData: [],
                productData: [],
                filterId: 0
            }
        },
        computed: {
            products() {
                let productDataFiltered = this.productData;
                if (this.filterId !== 0) {
                    productDataFiltered = this.productData.filter(product => {
                        return product.brand === this.filterId;
                    });
                }
                return productDataFiltered
            }
        },
        mounted() {
            this.filterData = [].concat({ 
                "id": 0,
                "title": "All Brands"
            })
            .concat(brands)

            this.productData = products;
            this.productData.forEach((product) => {
                product.quantity = 1;
                const brand = brands.find((brand) => product.brand === brand.id);
                if (brand) product.brandName = brand.title;
                else product.brandName = '';
            })
        },
        methods: {
            selectedFilter(id) {
                this.filterId = id;
            }
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
        flex: 1 1 15%;
    }
    .catalog__items__wrapper {
        flex: 1 1 85%;
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
    @media(max-width: 768px) {
        .catalog__wrapper {
            flex-direction: column;
            gap: 20px;
        }
        .catalog__items {
            justify-content: center;
        }
    }
</style>