<template>
    <div id="room">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"> Home </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"> Room </li>
            </ol>
        </nav>
        <h1 class="text-center"> Room from: {{ roomWithIssues.room.firstName + ' ' + roomWithIssues.room.lastName }}</h1>
        <ListIssues :listIssues="roomWithIssues.issues"></ListIssues>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import ListIssues from '@/components/ListIssues'

export default {
    name: 'room',
    data() {
        return {
            roomWithIssues: {room: {firstName: '', lastName: ''}}
        }
    },
    components: {
        ListIssues
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
    }
}
</script>
