<template>
    <SimpleProduct :productData="productData"
        :imageSrc="imageSrc"
        @changeBeforeAdd="changeBeforeAdd">
        <div class="configurableProduct__wrapper">
            <div v-for="(option, optionId) in productData.configurable_options"
                :key="optionId">
                <div class="configurableProduct__items__wrapper">
                    <div v-for="(item, id) in option.values" 
                        :key="id">
                        <div :class="`configurableProduct__item-${productData.id}`"
                            :id="`${productData.id}-${option.attribute_code}-${item.value_index}`"
                            :style="isColor(option, item)"
                            @click="chooseOption(option, item)">
                            <p v-if="option.attribute_code === 'size'"
                                class="configurableProduct__item__label">
                                {{ item.label }}
                            </p>
                            <p class="configurableProduct__item__none">
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
                currentVariantData: {}
            }
        },
        watch: {
            unavailableSizes() {
                this.unavailableSizes.forEach((id) => {
                    let div = document.getElementById(id);
                    div.style.pointerEvents = 'none';
                    div.querySelector('.configurableProduct__item__none').style.display = 'block';
                })
            },
            unavailableColors() {
                this.unavailableColors.forEach((id) => {
                    let div = document.getElementById(id);
                    div.style.pointerEvents = 'none';
                    div.querySelector('.configurableProduct__item__none').style.display = 'block';
                })
            }
        },
        props: {
            productData: {
                type: Object,
                default: {}
            }
        },
        methods: {
            isColor(option, item) {
                return {
                    'background-color': option.attribute_code === 'color' ? item.value : '#fff',
                }
            },
            chooseOption(option, item) {
                let id = this.productData.id + '-' + option.attribute_code + '-' + item.value_index;
                this.availableColors = [];
                this.availableSizes = [];

                if (this.selectedColor === id || this.selectedSize === id) {
                    // если уже выбран цвет/размер с таким айди
                    if (this.selectedColor === id) {
                        this.imageSrc = '';
                        this.deleteUnavailableSizes();
                        this.selectedColor = null;
                    }
                    if (this.selectedSize === id) {
                        this.deleteUnavailableColors();
                        this.selectedSize = null;
                    }

                    // снимаем выделение с него
                    document.getElementById(id).style.border = '1px solid #000';
                } 
                else if (this.selectedColor !== null && this.selectedColor.split('-')[1] === option.attribute_code) {
                    // если опять выбран цвет, но с другим айди
                    document.getElementById(this.selectedColor).style.border = '1px solid #000';
                    this.deleteUnavailableSizes();
                    this.changeOptionData(id, option, item)
                }
                else if (this.selectedSize !== null && this.selectedSize.split('-')[1] === option.attribute_code) {
                    // если опять выбран размер, но с другим айди
                    document.getElementById(this.selectedSize).style.border = '1px solid #000';
                    this.deleteUnavailableColors();
                    this.changeOptionData(id, option, item)
                } 
                else {                
                    // если этот цвет/размер еще не выбран
                    this.changeOptionData(id, option, item)
                    
                }
            
            },
            changeOptionData(id, option, item) {
                // задаем новые значения выбранных цвета и размера
                if (option.attribute_code === 'color') { 
                    this.selectedColor = id;

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
                if (option.attribute_code === 'size') this.selectedSize = id;

                // выделяем выбранный цвет/размер
                document.getElementById(id).style.border = '2px solid #ffd814';

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
            },
            deleteUnavailableColors() { // убираем крестик с недоступных цветов
                this.unavailableColors.forEach((color) => {
                    document.getElementById(color).style.pointerEvents = 'auto';
                    document.getElementById(color).querySelector('.configurableProduct__item__none').style.display = 'none';
                })
                this.unavailableColors = []
            },
            deleteUnavailableSizes() { // убираем крестик с недоступных размеров
                this.unavailableSizes.forEach((size) => {
                    document.getElementById(size).style.pointerEvents = 'auto';
                    document.getElementById(size).querySelector('.configurableProduct__item__none').style.display = 'none';
                })
                this.unavailableSizes = []
            },
            changeBeforeAdd() { // перед добавлением в хранилище добавляем вариант опций
                this.productData.variants.forEach((variant) => {
                    let hasSameColor = variant.attributes.find((attribute) => {
                        return attribute.code === 'color'
                            && attribute.value_index.toString() === this.selectedColor.split('-')[2]
                    })
                    if (hasSameColor) {
                        variant.attributes.forEach((attribute) => {
                            if (attribute.code === 'size'
                                && attribute.value_index.toString() === this.selectedSize.split('-')[2]) {
                                    this.productData.variant = variant;
                            }
                        })
                    }
                })
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