<template>
    <SimpleProduct :productData="productData">
        <div class="configurableProduct__wrapper">
            <div v-for="(option, optionId) in productData.configurable_options"
                :key="optionId">
                <div class="configurableProduct__items__wrapper">
                    <div v-for="(item, id) in option.values" 
                        :key="id">
                        <div class="configurableProduct__item"
                            :id="`${productData.id}-${item.value_index}`"
                            :style="isColor(option, item)"
                            @click="chooseOption(option, item)">
                            <p v-if="option.attribute_code === 'size'">
                                {{ item.label }}
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
                unavailableSizes: []
            }
        },
        watch: {
            unavailableSizes() {
                this.unavailableSizes.forEach((id) => {
                    document.getElementById(id).style.display = 'none';
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
                    'background-color': option.attribute_code === 'color' ? item.value : '#fff'
                }
            },
            chooseOption(option, item) {
                // задаем айди, приводим к дефолтным значениям и стилям
                let id = this.productData.id + '-' + item.value_index;
                this.availableColors = [];
                this.availableSizes = [];
                this.unavailableColors = [];
                this.unavailableSizes = [];
                let elements = document.querySelectorAll('.configurableProduct__item');
                elements.forEach(elem => {
                    elem.style.display = 'block';
                    elem.style.border = '1px solid #000';
                });

                // если уже выбран цвет/размер с таким айди, то дефолтим
                if (this.selectedColor === id || this.selectedSize === id) {
                    this.selectedColor = null;
                    this.selectedSize = null;
                } else { // если этот цвет/размер еще не выбран
                    // задаем новые значения выбранных цвета и размера
                    if (option.attribute_code === 'color') this.selectedColor = id;
                    if (option.attribute_code === 'size') this.selectedSize = id;

                    // выделяем выбранный цвет/размер
                    document.getElementById(id).style.border = '2px solid #ffd814';

                    // заполняем массив доступных размеров
                    this.productData.variants.forEach((variant) => {
                        let hasColor = false;
                        let hasSize = false;
                        variant.attributes.forEach((attribute) => {
                            if (attribute.code === 'color' 
                                && this.selectedColor !== null
                                && attribute.value_index.toString() === this.selectedColor.split('-')[1]) {
                                hasColor = true;                                
                            }
                            if (attribute.code === 'size' 
                                && this.selectedSize !== null
                                && attribute.value_index.toString() === this.selectedSize.split('-')[1]) {
                                    hasSize = true;                                
                            }

                            if (hasColor && attribute.code === 'size') { 
                                let size = this.productData.id + '-' + attribute.value_index;
                                this.availableSizes = this.availableSizes.concat(size);
                            }
                            if (hasSize && attribute.code === 'color') { 
                                let color = this.productData.id + '-' + attribute.value_index;
                                this.availableColors = this.availableColors.concat(color);
                            }
                        })
                    })

                    //заполняем массив недоступных размеров
                    this.unavailableColors 
                    this.productData.configurable_options.forEach((option) => {
                        if (option.attribute_code === 'size') {
                            option.values.forEach((value) => {
                                let optionSize = this.productData.id + '-' + value.value_index
                                if (!this.availableSizes.includes(optionSize)) 
                                    this.unavailableSizes = this.unavailableSizes.concat(optionSize);
                            })
                        }
                    })

                    // дизэйблим недоступные варианты
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
    .configurableProduct__item {
        width: 30px;
        height: 20px;
        border: 1px solid #000;
        text-align: center;
        font-size: 14px;
    }
    .configurableProduct__item:hover {
        cursor: pointer;
    }
</style>