<template>
    <div>
        <div v-if="isMobile">
            <v-select
                v-model="selectedFilter"
                :items="filterData"
                @change="filterOut(selectedFilter.id)">
            </v-select>
        </div>

        <div v-else>
            <v-list lines="one">
                <v-list-item
                    v-for="(data, dataIndex) in filterData"
                    :key="dataIndex"
                    :title="data.title"
                    @click="filterOut(data.id)">
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMobile: false,
            selectedFilter: null
        }
    },
    props: {
        filterData: {
            type: Object,
            default: {}
        }
    },
    mounted() {
        this.checkMobile()
        window.addEventListener('resize', this.checkMobile);
        this.selectedFilter = this.filterData[0];
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        filterOut(id) {
            console.log(id)
            this.$emit('selectedFilter', parseInt(id));
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 768
        }
    }
}
</script>

<style scoped>
    .filter__select {
        width: 100%;
        font-size: 18px;
        padding: 5px;
    }
</style>