<template>
    <div :class="route.path === '/' ? 'header__wrapper' : 'header__wrapper__cart'">
        <NuxtLink to="/">
            <img src="/images/icons/logo.png" />
        </NuxtLink>
        <NuxtLink to="/cart" v-if="route.path === '/'">
            <img src="/images/icons/cart.png" class="header__icon"/>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
    const route = useRoute()
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