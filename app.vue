<template>
  <div>
    <NuxtLayout>
      <v-app>
        <NuxtPage />
      </v-app>
    </NuxtLayout>
  </div>
</template>

<script setup>
  let products = useState('setProducts', () => []);
  let brands = useState('setBrands', () => []);

  const fetchProducts = async () => {
    try {
      products.value = await $fetch('/products.json');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrands = async () => {
    try {
      brands.value = await $fetch('/brands.json');
      if (brands.value[0].id !== 0) {
        brands.value = [].concat({ 
            "id": 0,
            "title": "All Brands"
        })
        .concat(brands.value)
      }
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => {
    fetchProducts();
    fetchBrands();
  });
</script>