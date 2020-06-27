<template>
    <div id="issue">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb path">
                <li class="breadcrumb-item"><router-link to="/"> Home </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"><router-link :to="'/room/' + issueWithPills.issue.roomId + '/'"> Room </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"> Issue </li>
            </ol>
        </nav>
        <div class="body-let">
            <div class="row title-box" v-show="!showEditIssueForm">
                <div class="col-11">
                    <h1>{{issueWithPills.issue.title}}</h1>
                </div>
                <div class="col-1">
                    <div class="btn-group-sm btn-group-form" role="group">
                        <button class="btn btn-edit" v-if="issueWithPills.issue.allowUpdate" @click="showEditForm()"><i class="fa fa-pencil" style="font-size:24px"></i></button>
                        <button class="btn btn-delete" v-if="issueWithPills.issue.allowDelete" @click="deleteIssue()"><i class="fa fa-trash-o" style="font-size:24px"></i></button>
                    </div>
                </div>
            </div>
            <div class="row">
                <form v-show="showEditIssueForm" class="col-12">
                    <div class="form-group">
                        <input class="form-control" type="text" v-model='newIssueTitle'>
                    </div>
                    <div class="btn-group-sm btn-group-form">
                        <button @click="updateIssue($event)" class="btn btn-secondary">Save</button>
                        <button @click="cancelUpdetaIssueTitle($event)" class="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
            
            <AddPillForm v-if="issueWithPills.issue.allowCreatePills" :issueId="issueWithPills.issue.id" :user="this.user"></AddPillForm>
            <ListPills :listPills="issueWithPills.pills"> </ListPills>
        </div>
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
            this.issueWithPills.pills.unshift(pill);
        });
    }
}
</script>

<style scoped>


.button_issue {
    width:48px;
    height:48px;
    background-color:white;
}


</style>