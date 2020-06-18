<template>
    <div id="users">
        <div class="row">
            <div class="col-12">
                <h1> Users </h1>
            </div>
        </div>
        <div class="row justify-content-end no-margin">
            <button class="col-2 btn btn-outline-secondary" @click="showUserForm = !showUserForm">
                Add User
            </button>
        </div>
        <AddUserForm v-if="showUserForm" :user="this.user"></AddUserForm>
        <ListUsers v-if="!showUserForm" :listUsers="this.listUsers"></ListUsers>
    </div>
</template>

<script>
import EventBus from '@/utils/event-bus'
import AddUserForm from '@/components/User/AddUserForm'
import ListUsers from '@/components/User/ListUsers'

export default {
    name: "Users",
    props: { 'user': Object },
    data () {
        return {
            showUserForm: false,
            listUsers: []
        }
    },
    components: {
        AddUserForm,
        ListUsers
    },
    methods: {
        loadUsers() {
            this.axios.get('/users/')
            .then(response => {
                this.listUsers = response.data
            });
        }
    },
    mounted() {
        this.loadUsers();
        EventBus.$on('add-user', user => {
            this.listUsers.push(user);
        });
        EventBus.$on('hidde-form-user', () => {
            this.showUserForm = false;
        });
    }
}
</script>