<template>
    <div id="issue">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"> Home </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"><router-link :to="'/room/' + issueWithPills.issue.roomId + '/'"> Room </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"> Issue </li>
            </ol>
        </nav>
        <div class="row title_box" v-show="!showEditIssueForm">
            <h1 class="col-10">{{issueWithPills.issue.title}}</h1>
            <button class='button_issue col-1' v-if="issueWithPills.issue.allowUpdate" @click="showEditForm()">
                <EditIcon></EditIcon>
            </button>
            <button class='button_issue col-1' v-if="issueWithPills.issue.allowDelete" @click="deleteIssue()">
                <DeleteIcon></DeleteIcon>
            </button>
        </div>
        <form v-show="showEditIssueForm">
            <div class="form-group">
                <input class="form-control" type="text" v-model='newIssueTitle'>
            </div>
            <button @click="updateIssue($event)">Save</button>
            <button @click="cancelUpdetaIssueTitle($event)">Cancel</button>
        </form>
        <FormPill v-if="this.showFormAddPill" :pill="{'issueId': issueWithPills.issue.id, 'text': '', 'authorId': null}"></FormPill>

        <AddPillForm v-if="issueWithPills.issue.allowCreatePills" :issueId="issueWithPills.issue.id"></AddPillForm>
        <ListPills :listPills="issueWithPills.pills"> </ListPills>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import ListPills from '@/components/ListPills'
import FormPill from '@/components/FormPill'
import AddPillForm from '@/components/AddPillForm'
import EditIcon from '@/components/icons/EditIcon'
import DeleteIcon from '@/components/icons/DeleteIcon'


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
        FormPill,
        AddPillForm,
        EditIcon,
        DeleteIcon
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
        deleteIssue() {
            if (confirm("Are you sure do you want to delete " + this.issueWithPills.issue.title + "?")) {
                axios.delete("/issue/" + this.issueWithPills.issue.id + "/")
                .then(() => {
                    this.$router.push('/room/' + this.issueWithPills.issue.roomId + '/');
                });
            }
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

<style scoped>

h1 {
    display:inline;
}

.button_issue {
    width:48px;
    height:48px;
    background-color:white;
}

.title_box {
    margin-right: 0;
    margin-left: 0;
}
</style>