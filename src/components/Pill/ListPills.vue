<template>
    <div id="listPills">
        <div class="card margin-item" v-for="pill in listPills" :key="pill.id">
            <div class="card-body">
                <PillItem :pill="pill"></PillItem>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from '@/utils/event-bus'
import PillItem from '@/components/Pill/PillItem'

export default {
    name: 'listPills',
    props: ['listPills'],
    components: {
        PillItem
    },
    data() {
        return {
            showEditPillForm: false,
            pillSelected: null
        }
    },
    methods: {
        showForm(pill) {
            this.pillSelected = pill;
            this.showFormPill = true;
        } 
    },
    mounted() {
        EventBus.$on('delete-pill', (pill) => {
            this.$delete(this.listPills, this.listPills.indexOf(pill));
        });
    }
}
</script>