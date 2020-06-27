<template>
    <div id="listUsers">
        <div class="row">
            <div class="col-12">
                <div class="card" v-for="user in listUsers" :key="user.id">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-10">
                                <h4>{{ user.firstName + ' ' + user.lastName }}</h4>
                                <div class="text-muted align-middle"> Email: {{ user.email }} </div>
                            </div>
                            <div class="btn-group-sm btn-group-form col-2 text-right" role="group">
                                <button class="btn btn-danger" @click="deleteUser(user)"><i class="fa fa-trash-o fa-lg" style="font-size:24px"></i></button>
                            </div>
                        </div>
                        <AssignRole :roles="roles" :rooms="rooms" :user="user"></AssignRole>
                    </div>
                </div>
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
    mounted() {
        this.loadRoles();
        this.loadRooms();
    }
}
</script>
