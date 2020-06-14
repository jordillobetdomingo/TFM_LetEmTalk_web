<template>
    <div id="room">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"> Home </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"> Room </li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-12">
                <h1> Room from: {{ roomWithIssues.room.firstName + ' ' + roomWithIssues.room.lastName }}</h1>
            </div>
        </div>
        <AddIssueForm v-if="roomWithIssues.room.allowCreateIssues" :roomId="roomWithIssues.room.id"></AddIssueForm>
        <ListIssues :listIssues="roomWithIssues.issues"></ListIssues>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import ListIssues from '@/components/ListIssues'
import AddIssueForm from '@/components/AddIssueForm'
import EventBus from '@/utils/event-bus'

export default {
    name: 'room',
    data() {
        return {
            roomWithIssues: {room: {firstName: '', lastName: ''}}
        }
    },
    components: {
        ListIssues,
        AddIssueForm
    },
    methods: {
        loadRoomWithIssue() {
        axios.get('/room/' + this.$route.params.roomId + '/')
            .then(response => {
                this.roomWithIssues = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.loadRoomWithIssue();
        EventBus.$on('add-issue', (issue) => {
            this.roomWithIssues.issues.push(issue);
        });
    }
}
</script>

<style>


</style>