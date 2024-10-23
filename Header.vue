<template>
    <div :class="route.path === '/' ? 'header__wrapper' : 'header__wrapper__cart'">
        <NuxtLink to="/">
            <img src="/images/icons/logo.png" />
        </NuxtLink>
        <NuxtLink to="/cart" v-if="route.path === '/'">
            <img src="/images/icons/cart.png" class="header__icon"/>
            <span>{{ quantity }}</span>
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
    .header__icon {
        height: 34px;
    }
</style>