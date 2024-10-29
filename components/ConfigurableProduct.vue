<template>
    <SimpleProduct :productData="productData">
        <div class="configurableProduct__wrapper">
            <div v-for="(option, optionId) in productData.configurable_options"
                :key="optionId">
                <div class="configurableProduct__items__wrapper">
                    <div v-for="(item, id) in option.values" 
                        :key="id">
                        <div class="configurableProduct__item"
                            :id="item.value_index"
                            :style="{'background-color': option.attribute_code === 'color' ? item.value : '#fff'}"
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
                selectedSize: null
            }
        },
        props: {
            productData: {
                type: Object,
                default: {}
            }
        },
        methods: {
            chooseOption(option, item) {
                document.getElementById(item.value_index).style.border = '2px solid #ffd814';
                if (option.attribute_code === 'color') this.selectedColor = item.value_index;
                if (option.attribute_code === 'size') this.selectedSize = item.value_index;
            },
            /*chooseColor(id) {
                let colors = document.querySelectorAll('.configurableProduct__item');
                colors.forEach(color => {
                    color.style.border = '1px solid #000';
                });
                document.getElementById(id).style.border = '2px solid #ffd814';
                this.selectedColor = id;
            },*/
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