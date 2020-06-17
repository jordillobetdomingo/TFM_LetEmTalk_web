<template>
    <div id="listUsers">
        <div v-for="user in listUsers" :key="user.id">
            <h6>{{ user.firstName + ' ' + user.lastName }}</h6>
            <p> Email: {{ user.email }} </p>
            <button @click="deleteUser(user)">Delete</button>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'

export default {
    name: 'listUsers',
    props: { 'listUsers': Array },
    methods: {
        deleteUser(user) {
            if (confirm("Do you want to delete " + user.firstName + " " + user.lastName + " user?")) {
                axios.delete("/user/" + user.id + "/");
                this.$delete(this.listUsers, this.listUsers.indexOf(user));
            }
        }
    }
}
</script>