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
            <button class="filter__button"
                @click="filterOut(0)">
                {{ filterData.defaultFilter }}
            </button>

            <div v-for="(data, dataIndex) in filterData.data"
                key="dataIndex">
                <button class="filter__button"
                    @click="filterOut(data.id)">
                    {{ data.title }}
                </button>
            </div>
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