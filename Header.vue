<template>
    <div :class="route.path === '/' ? 'header__wrapper' : 'header__wrapper__cart'">
        <NuxtLink to="/">
            <img src="/images/icons/logo.png" />
        </NuxtLink>

        <NuxtLink to="/cart" 
            v-if="route.path === '/'"
            class="header__cart">
            <img src="/images/icons/cart.png" 
                class="header__cart__icon"/>
            <span class="header__cart__counter">
                {{ quantity }}
            </span>
        </NuxtLink>
    </div>
</template>

<script>
    //import {useRoute} from 'vue-router'
    //const route = useRoute()
    export default {
        data() {
            return {
                route: useRoute(),
                quantity: 0
            }
        },
        computed: {
            quantity() {
                var count = 0;
                this.$store.state.cart.forEach((item) => {
                    count = count + item.quantity
                })
                return count
            }
        }
    }
</script>


<style scoped>
    .header__wrapper {
        display: flex;
        justify-content: space-between;
        margin: 20px 5%;
    }
    .header__wrapper__cart {
        display: flex;
        margin: 20px 5%;
        justify-content: center;
    }
    .header__cart__icon {
        height: 34px;
    }
    .header__cart {
        position: relative;
        padding: 5px 20px 0 0;
    }
    .header__cart__counter {
        position: absolute;
        border: 1px solid #000;
        border-radius: 20px;
        padding: 1px 2px;
        min-width: 20px;
        text-align: center;
        color: #000;
        top: 0;
        right: 0;
        background-color: #fff;
    }
</style>