<template>
    <div id="listPills">
        <div class="card" v-for="pill in listPills" :key="pill.id">
            <div class="card-body">
                <PillItem :pill="pill"></PillItem>
            </div>
        </div>
    </div>
</template>

<script>
import PillItem from '@/components/PillItem'
import EventBus from '@/utils/event-bus';

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