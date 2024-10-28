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
  let brands = useState('setBrands', () => []);
  let products = useState('setProducts', () => []);

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

  const fetchProducts = async () => {
    try {
      products.value = await $fetch('/level3/products.json');
      products.value.forEach((product) => {
        product.quantity = 1;
        let brand = brands.value.find((brand) => product.brand === brand.id);
        if (brand) product.brandName = brand.title;
        else product.brandName = '';
    })
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => {
    fetchBrands();
    fetchProducts();
  });
</script>