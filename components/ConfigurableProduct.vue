<template>
    <SimpleProduct :productData="productData"
        :imageSrc="imageSrc"
        :selectedColor="selectedColor"
        :selectedSize="selectedSize">
        <div class="configurableProduct__wrapper">
            <div v-for="(option, optionId) in productData.configurable_options"
                :key="optionId">
                <div class="configurableProduct__items__wrapper">
                    <div v-for="(item, id) in option.values" 
                        :key="id">
                        <div :class="`configurableProduct__item-${productData.id}`"
                            :id="selectedId"
                            :style="getOptionStyle(option, item, productData.id + '-' + option.attribute_code + '-' + item.value_index)"
                            @click="chooseOption(option, item)">
                            <p v-if="option.attribute_code === 'size'"
                                class="configurableProduct__item__label">
                                {{ item.label }}
                            </p>
                            <p class="configurableProduct__item__none"
                                :style="getUnavailableOptionStyle(productData.id + '-' + option.attribute_code + '-' + item.value_index)">
                                ×
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SimpleProduct>
</template>

<script>
    import deepClone from 'lodash.clonedeep'
    export default {
        data() {
            return {
                selectedColor: null,
                selectedSize: null,
                availableColors: [],
                availableSizes: [],
                unavailableColors: [],
                unavailableSizes: [],
                imageSrc: '',
                selectedId: null
            }
        },
        props: {
            productData: {
                type: Object,
                default: {}
            }
        },
        methods: {
            getOptionStyle(option, item, selectedId) {
                const isUnavailable = this.unavailableColors.find((colorId) => colorId === selectedId) 
                    || this.unavailableSizes.find((sizeId) => sizeId === selectedId);

                let isSelected
                if (this.selectedColor && selectedId === this.selectedColor ) isSelected = true
                if (this.selectedSize && selectedId === this.selectedSize ) isSelected = true
                return {
                    'background-color': option.attribute_code === 'color' ? item.value : '#fff',
                    'border': isSelected ? '2px solid #ffd814': '1px solid #000',
                    'pointer-events': isUnavailable ? 'none' : 'auto'
                }
            },

            getUnavailableOptionStyle(selectedId) {
                const isUnavailable = this.unavailableColors.find((colorId) => colorId === selectedId) 
                    || this.unavailableSizes.find((sizeId) => sizeId === selectedId);
                return isUnavailable ? 'display: block;' : ''                
            },

            chooseOption(option, item) {
                this.selectedId = this.productData.id + '-' + option.attribute_code + '-' + item.value_index;
                this.availableColors = [];
                this.availableSizes = [];

                if (this.selectedColor === this.selectedId || this.selectedSize === this.selectedId) {
                    // если уже выбран цвет/размер с таким айди
                    if (this.selectedColor === this.selectedId) {
                        this.imageSrc = '';
                        this.unavailableSizes = [];
                        this.selectedColor = null;
                    }
                    if (this.selectedSize === this.selectedId) {
                        this.unavailableColors = [];
                        this.selectedSize = null;
                    }
                } 
                else if (this.selectedColor !== null && this.selectedColor.split('-')[1] === option.attribute_code) {
                    // если опять выбран цвет, но с другим айди
                    this.unavailableSizes = [];
                    this.changeOptionData(option, item)
                }
                else if (this.selectedSize !== null && this.selectedSize.split('-')[1] === option.attribute_code) {
                    // если опять выбран размер, но с другим айди
                    this.unavailableColors = [];
                    this.changeOptionData(option, item)
                } 
                else {                
                    // если этот цвет/размер еще не выбран
                    this.changeOptionData(option, item)
                    
                }
            
            },
            changeOptionData(option, item) {
                // задаем новые значения выбранных цвета и размера
                if (option.attribute_code === 'color') { 
                    this.selectedColor = this.selectedId;

                    // меняем картинку товара в зависимости от цвета
                    let selectedVariant = this.productData.variants.find((variant) => {
                        return variant.attributes.some((attribute) => {
                            return attribute.code === 'color' && 
                                this.selectedColor === this.productData.id + '-' + option.attribute_code + '-' + attribute.value_index;
                        });
                    });
                    if (selectedVariant) {
                        this.imageSrc = selectedVariant.product.image;
                    }
                }
                if (option.attribute_code === 'size') this.selectedSize = this.selectedId;

                // заполняем массив доступных размеров и цветов
                this.productData.variants.forEach((variant) => {
                    let isColor = variant.attributes.find((attribute) => {
                        return attribute.code === 'color' 
                            && this.selectedColor !== null 
                            && attribute.value_index.toString() === this.selectedColor.split('-')[2];
                    }) !== undefined;

                    if (isColor) {
                        variant.attributes.forEach((attribute) => {
                            if (attribute.code === 'size') {
                                let size = this.productData.id + '-' + attribute.code + '-' + attribute.value_index;
                                this.availableSizes = this.availableSizes.concat(size);
                            }
                        });
                    }

                    let isSize = variant.attributes.find((attribute) => {
                        return attribute.code === 'size' 
                            && this.selectedSize !== null
                            && attribute.value_index.toString() === this.selectedSize.split('-')[2]
                    }) !== undefined;

                    if (isSize) {
                        variant.attributes.forEach((attribute) => {
                            if (attribute.code === 'color') { 
                                let color = this.productData.id + '-' + attribute.code + '-' + attribute.value_index;
                                this.availableColors = this.availableColors.concat(color);
                            }
                        })
                    }
                })

                //заполняем массив недоступных размеров
                if (option.attribute_code === 'color') {
                    this.productData.configurable_options.forEach((option) => {
                        if (option.attribute_code === 'size') {
                            option.values.forEach((value) => {
                                let optionSize = this.productData.id + '-' + option.attribute_code + '-' + value.value_index
                                if (!this.availableSizes.includes(optionSize)) 
                                    this.unavailableSizes = this.unavailableSizes.concat(optionSize);
                            })
                        }
                    })
                }

                //заполняем массив недоступных цветов
                if (option.attribute_code === 'size') {
                    this.productData.configurable_options.forEach((option) => {
                        if (option.attribute_code === 'color') {
                            option.values.forEach((value) => {
                                let optionColor = this.productData.id + '-' + option.attribute_code + '-' + value.value_index
                                if (!this.availableColors.includes(optionColor)) 
                                    this.unavailableColors = this.unavailableColors.concat(optionColor);
                            })
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .configurableProduct__wrapper {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 16px;
    }
    .configurableProduct__items__wrapper {
        display: flex;
        gap: 5px;
    }
    [class^="configurableProduct__item-"] {
        width: 30px;
        height: 20px;
        border: 1px solid #000;
        text-align: center;
        font-size: 14px;
        position: relative;
    }
    [class^="configurableProduct__item-"]:hover {
        cursor: pointer;
    }
    .configurableProduct__item__label {
        position: absolute;
        width: 100%;
        text-align: center;
    }
    .configurableProduct__item__none {
        color: #8B0000;
        transform: scale(3);
        display: none;
    }
</style>