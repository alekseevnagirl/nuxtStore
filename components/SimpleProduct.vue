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
    import deepClone from 'lodash.clonedeep'
    export default {
        props: {
            productData: {
                type: Object,
                default: {}
            },
            imageSrc: {
                type: String,
                default: ''
            },
            selectedColor: {
                type: String,
                default: null
            },
            selectedSize: {
                type: String,
                default: null
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
                // перед добавлением в хранилище добавляем вариант опций
                let currentVariant = deepClone(this.productData);
                if (this.productData.variants) {
                    this.productData.variants.forEach((variant) => {
                        let hasSameColor = variant.attributes.find((attribute) => {
                            return attribute.code === 'color'
                                && attribute.value_index.toString() === this.selectedColor.split('-')[2]
                        })
                        if (hasSameColor) {
                            variant.attributes.forEach((attribute) => {
                                if (attribute.code === 'size'
                                    && attribute.value_index.toString() === this.selectedSize.split('-')[2]) {
                                        currentVariant.variant = variant;
                                }
                            })
                        }
                    })
                    delete currentVariant.configurable_options;
                    delete currentVariant.variants;
                }
                
                this.$store.commit("addToCart", currentVariant)
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