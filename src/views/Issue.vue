<template>
    <div id="issue">
        <router-link :to="'/room/' + issueWithPills.issue.roomId + '/'"> Back to the room </router-link>
        <h1>{{issueWithPills.issue.title}}</h1>
        <p v-if="issueWithPills.issue.canEdit"> Button of edit and delete issue</p>
        <p v-if="issueWithPills.issue.canAddPill"> Button of add pill </p>
        <ListPills :listPills="issueWithPills.pills"> </ListPills>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import ListPills from '@/components/ListPills'

export default {
    name: 'Issue',
    data() {
        return {
            issueWithPills: {issue: {title: '', roomId: '0'}, pills: []}
        }
    },
    components: {
        ListPills
    },
    methods: {
        loadIssueWithPills() {
            axios.get('issue/' + this.$route.params.issueId + '/')
                .then(response => {
                    this.issueWithPills = response.data
                });            
        }
    },
    mounted() {
        this.loadIssueWithPills();
    }
}
</script>