<template>
    <div id="listUsers">
        <div class="card margin-item" v-for="user in listUsers" :key="user.id">
            <div class="card-body">
                <div class="row">
                    <h5>{{ user.firstName + ' ' + user.lastName }}</h5>
                </div>
                <div class="row">
                    <div class="card-subtitle mb-1 text-muted col-10"> Email: {{ user.email }} </div>
                    <button @click="deleteUser(user)" class="btn-border btn-sm">Delete</button>
                </div>
                <AssignRole :roles="roles" :rooms="rooms" :user="user"></AssignRole>
            </div>
        </div>
    </div>
</template>

<script>
import AssignRole from "@/components/User/AssignRole"

export default {
    name: 'listUsers',
    props: { 'listUsers': Array },
    components: {
        AssignRole
    },
    data() {
        return {
            roles: [],
            rooms: []
        }
    },
    methods: {
        deleteUser(user) {
            if (confirm("Do you want to delete " + user.firstName + " " + user.lastName + " user?")) {
                this.axios.delete("/user/" + user.id + "/");
                this.$delete(this.listUsers, this.listUsers.indexOf(user));
            }
        },
        loadRoles() {
            this.axios.get('/roles/')
            .then(response => {
                this.roles = response.data;
            });
        },
        loadRooms() {
            this.axios.get("/rooms/")
            .then(response => {
                this.rooms = response.data;
            });
        }
    },
    beforeMount() {
        this.loadRoles();
        this.loadRooms();
    }
}
</script>