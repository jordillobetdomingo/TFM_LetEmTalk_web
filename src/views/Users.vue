<template>
    <div id="users">
        <div class="row">
            <div class="col-12">
                <h1> Users </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-11"></div>
            <div class="col-1 justify-content-end">
                <div class="btn-group-sm btn-group-form" role="group">
                    <button class="btn btn-success" @click="showUserForm = !showUserForm"><i class="fa fa-plus-circle fa-lg" style="font-size:24px"></i></button>
                </div>
            </div>
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