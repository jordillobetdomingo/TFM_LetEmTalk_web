<template>
    <div id="issue">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"> Home </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"><router-link :to="'/room/' + issueWithPills.issue.roomId + '/'"> Room </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"> Issue </li>
            </ol>
        </nav>
        <h1 v-show="!showEditIssueForm" class="text-center">{{issueWithPills.issue.title}}</h1>
        <form v-show="showEditIssueForm">
            <div class="form-group">
                <input class="form-control" type="text" v-model='newIssueTitle'>
            </div>
            <button @click="updateIssue($event)">Save</button>
            <button @click="cancelUpdetaIssueTitle($event)">Cancel</button>
        </form>
        
        <button v-if="issueWithPills.issue.canEdit" @click="showEditForm()">Edit</button>
        <button v-if="issueWithPills.issue.canEdit">Delete</button>
        <button v-if="issueWithPills.issue.canAddPill" @click="this.showFormAddPill = true;">Add</button>
        <FormPill v-if="this.showFormAddPill" :pill="{'issueId': issueWithPills.issue.id, 'text': '', 'authorId': null}"></FormPill>
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
            showEditIssueForm: false,
            showFormAddPill: false,
            newIssueTitle: ''
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
        },
        showEditForm() {
            this.newIssueTitle = this.issueWithPills.issue.title;
            this.showEditIssueForm = true;
        },
        cancelUpdetaIssueTitle(event) {
            this.showEditIssueForm = false;
            event.preventDefault();
        },
        updateIssue(event) {
            this.showEditIssueForm = false;
            this.issueWithPills.issue.title = this.newIssueTitle; 
            event.preventDefault();
            axios.put('/issue/' + this.issueWithPills.issue.id + "/", {'title': this.issueWithPills.issue.title});
        }
    },
    mounted() {
        this.loadIssueWithPills();
    }
}
</script>