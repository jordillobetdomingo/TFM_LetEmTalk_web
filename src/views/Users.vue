<template>
    <div id="users">
        <div class="row">
            <div class="col-12">
                <h1> Users </h1>
            </div>
        </div>
        <AddUserForm v-if="user.isAdmin" :user="this.user"></AddUserForm>
        <ListUsers :listUsers="this.listUsers"></ListUsers>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import AddUserForm from '@/components/Users/AddUserForm'
import ListUsers from '@/components/Users/ListUsers'

export default {
    name: "Users",
    props: { 'user': Object },
    data () {
        return {
            listUsers: []
        }
    },
    components: {
        AddUserForm,
        ListUsers
    },
    methods: {
        loadUsers() {
            axios.get('/users/')
            .then(response => {
                this.listUsers = response.data
            });
        }
    },
    mounted() {
        this.loadUsers();
    }
}
</script>