<template>
    <div id="listPills">
        <div v-for="pill in listPills" :key="pill.pillId">
            <p> {{pill.text}}</p>
            <p> Author: {{ pill.firstNameAuthor + ' ' + pill.lastNameAuthor }}</p>
            <input type="button" v-if="pill.canEdit" value="EditPill" @click="showForm(pill)">
        </div>
        <FormPill v-if="showFormPill" :pill="pillSelected"></FormPill>
    </div>
</template>

<script>
import FormPill from '@/components/FormPill'

export default {
    name: 'listPills',
    props: ['listPills'],
    components: {
        FormPill
    },
    data() {
        return {
            showFormPill: false,
            pillSelected: null
        }
    },
    methods: {
        showForm(pill) {
            this.pillSelected = pill;
            this.showFormPill = true;
        } 
    }
}
</script>