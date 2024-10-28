<template>
    <div>
        <div v-if="isMobile">
            <v-select
                v-model="selectedFilterData"
                :items="filterData"
                item-text="title"
                item-value="id"
                return-object
                @update:model-value="filterOut(selectedFilterData.id)">
            </v-select>
        </div>

        <div v-else>
            <v-list lines="one">
                <v-list-item
                    v-for="(data, dataIndex) in filterData"
                    v-model="selectedId"
                    :key="dataIndex"
                    :title="data.title"
                    :class="selectedId === data.id ? 'filter__list__selected' : ''"
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
            selectedId: 0,
            selectedFilterData: null
        }
    },
    props: {
        filterData: {
            type: Object,
            default: {}
        }
    },
    watch: {
        filterData(newValue) {
            if (newValue.length > 0) {
                this.selectedFilterData = newValue[this.selectedId];
            }
        }
    },
    mounted() {
        this.checkMobile()
        window.addEventListener('resize', this.checkMobile);
        this.selectedFilterData = this.filterData[this.selectedId]
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        filterOut(id) {
            this.$emit('selectedFilter', parseInt(id));
            this.selectedId = id;
            this.selectedFilterData = this.filterData[id]
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
    .filter__list__selected {
        text-decoration: underline;
    }
</style>