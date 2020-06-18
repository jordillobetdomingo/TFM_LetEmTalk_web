<template>
    <div id="issue">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb path">
                <li class="breadcrumb-item"><router-link to="/"> Home </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"><router-link :to="'/room/' + issueWithPills.issue.roomId + '/'"> Room </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"> Issue </li>
            </ol>
        </nav>
        <div class="row title_box" v-show="!showEditIssueForm">
            <h1 class="col-10">{{issueWithPills.issue.title}}</h1>
            <div class="col-2">
                <button class='btn-border btn-sm btn-block' v-if="issueWithPills.issue.allowUpdate" @click="showEditForm()">Edit</button>
                <button class='btn-border btn-sm btn-block' v-if="issueWithPills.issue.allowDelete" @click="deleteIssue()">Delete</button>
            </div>
        </div>
        <form v-show="showEditIssueForm">
            <div class="form-group">
                <input class="form-control" type="text" v-model='newIssueTitle'>
            </div>
            <button class="btn-border btn-sm" @click="updateIssue($event)">Save</button>
            <button class="btn-border btn-sm" @click="cancelUpdetaIssueTitle($event)">Cancel</button>
        </form>
        
        <AddPillForm v-if="issueWithPills.issue.allowCreatePills" :issueId="issueWithPills.issue.id" :user="this.user"></AddPillForm>
        <ListPills :listPills="issueWithPills.pills"> </ListPills>
    </div>
</template>

<script>
import EventBus from '@/utils/event-bus'
import ListPills from '@/components/Pill/ListPills'
import AddPillForm from '@/components/Pill/AddPillForm'

export default {
    name: 'Issue',
    props: {'user': Object},
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
        AddPillForm,
    },
    methods: {
        loadIssueWithPills() {
            this.axios.get('issue/' + this.$route.params.issueId + '/')
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
                this.axios.delete("/issue/" + this.issueWithPills.issue.id + "/")
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
            this.axios.put('/issue/' + this.issueWithPills.issue.id + "/", {'title': this.issueWithPills.issue.title});
        }
    },
    mounted() {
        this.loadIssueWithPills();
        EventBus.$on('add-pill', (pill) => {
            this.issueWithPills.pills.push(pill);
        });
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