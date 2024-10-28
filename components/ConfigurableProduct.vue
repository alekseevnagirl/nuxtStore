<template>
    <SimpleProduct :productData="productData">
        <div class="configurableProduct__wrapper">
            <div class="configurableProduct__items__wrapper">
                <div v-for="(item, id) in productData.configurable_options[0].values" 
                    :key="id">
                    <div class="configurableProduct__color"
                        :id="`color-${item.value_index}`"
                        :style="`background-color: ${item.value}`"
                        @click="chooseColor(`color-${item.value_index}`)">
                    </div>
                </div>
            </div>

            <div class="configurableProduct__items__wrapper">
                <div v-for="(item, id) in productData.configurable_options[1].values" 
                    :key="id">
                    <div class="configurableProduct__size"
                        :id="`size-${item.value_index}`"
                        @click="chooseSize(`size-${item.value_index}`)">
                        {{ item.label }}
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
            chooseColor(id) {
                let colors = document.querySelectorAll('.configurableProduct__color');
                colors.forEach(color => {
                    color.style.border = '1px solid #000';
                });
                document.getElementById(id).style.border = '2px solid #ffd814';
                this.selectedColor = id;
            },
            chooseSize(id) {
                let sizes = document.querySelectorAll('.configurableProduct__size');
                sizes.forEach(size => {
                    size.style.border = '1px solid #000';
                });
                document.getElementById(id).style.border = '2px solid #ffd814';
                this.selectedSize = id;
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
    .configurableProduct__color, .configurableProduct__size {
        width: 30px;
        height: 20px;
        border: 1px solid #000;
        text-align: center;
        font-size: 14px;
    }
    .configurableProduct__color:hover, .configurableProduct__size:hover {
        cursor: pointer;
    }
</style>