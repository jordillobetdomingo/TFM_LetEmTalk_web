<template>
    <div id="issue">
        <router-link :to="'/room/' + issueWithPills.issue.roomId + '/'"> Back to the room </router-link>
        <h1>{{issueWithPills.issue.title}}</h1>
        <input type="button" v-if="issueWithPills.issue.canEdit" value="EditIssue">
        <input type="button" v-if="issueWithPills.issue.canEdit" value="DeleteIssue">
        <input v-if="issueWithPills.issue.canAddPill" type="button" value="AddPill" @click="showFormAddPill = true;">
        <FormPill v-if="this.showFormAddPill" :pill="{'issueId': issueWithPills.issue.issueId, 'text': '', 'authorId': null}"></FormPill>
        <ListPills :listPills="issueWithPills.pills"> </ListPills>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import ListPills from '@/components/ListPills'
import FormPill from '@/components/FormPill'

export default {
    name: 'Issue',
    data() {
        return {
            issueWithPills: {issue: {title: '', roomId: '0'}, pills: []},
            showFormAddPill: false
        }
    },
    components: {
        ListPills,
        FormPill
    },
    methods: {
        loadIssueWithPills() {
            axios.get('issue/' + this.$route.params.issueId + '/')
                .then(response => {
                    this.issueWithPills = response.data
                });            
        },
        showForm() {
            this.showFormAddPill = true;
        }
    },
    mounted() {
        this.loadIssueWithPills();
    }
}
</script>