<template>
    <div>
        <div v-if="isMobile">
            <select class="filter__select"
                @change="filterOut($event.target.value)">
                <option :value="0">
                    {{ filterData.defaultFilter }}
                </option>

                <option v-for="(data, dataIndex) in filterData.data" 
                    :key="dataIndex" 
                    :value="data.id">
                {{ data.title }}
                </option>
            </select>
        </div>


        <div v-else>
            <v-list lines="one">
                <v-list-item
                    :title="filterData.defaultFilter"
                    @click="filterOut(0)">
                </v-list-item>

                <v-list-item
                    v-for="(data, dataIndex) in filterData.data"
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
            isMobile: false
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
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        filterOut(id) {
            this.$emit('selectedFilter', parseInt(id));
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 768
        }
    }
}
</script>

<style scoped>
    .filter__button {
        border: none;
        background: none;
        font-size: 18px;
        padding: 0;
        margin: 0 0 10px 0;
    }
    .filter__button:hover {
        cursor: pointer;
    }
    .filter__button:focus {
        text-decoration: underline;
    }
    .filter__select {
        width: 100%;
        font-size: 18px;
        padding: 5px;
    }
</style>