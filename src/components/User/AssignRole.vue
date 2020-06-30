<template>
    <div id="AssignRoleForm">
        <div v-if="!showPermissionForm">
            <div class="form-group">
                <button class="btn btn-secondary" @click="showPermissionForm = !showPermissionForm"> Add Permissions </button>
            </div>
        </div>
        <form v-if="showPermissionForm">
            <div class="row justify-content-center">
                <div class="form-group col-3">
                    <select class="form-control" v-model="roleSelected">
                        <option v-for="role in roles" :key="role.id" :value="role"> {{ role.name }} </option>
                    </select>
                </div>
                <div class="form-group col-3">
                    <select class="form-control" v-model="roomSelected" v-if="!this.roleSelected.createRoom">
                        <option v-for="room in rooms" :key="room.roomId" :value="room"> {{ room.firstName + ' ' + room.lastName }} </option>
                    </select>
                </div>
                <div class="btn-group-sm btn-group-form col-3">
                    <button class="btn btn-secondary" @click="assignRole($event)"> Assign </button>
                    <button class="btn btn-secondary" @click="reset($event)"> Cancel </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'assignRoleForm',
    props: { roles: Array, rooms: Array, user: Object },
    data() {
        return {
            roleSelected: this.roles[0],
            roomSelected: this.rooms[0],
            showPermissionForm: false
        }
    },
    methods: {
        assignRole(event) {
            if (this.roleSelected.createRoom) {
                this.axios.post("/role/user/", {"userId": this.user.id, "roleId": this.roleSelected.id })
                .then(() => {
                    alert("The role has been assigned correctly");
                });
            } else {
                this.axios.post("/role/user/", {"userId": this.user.id, "roleId": this.roleSelected.id, "roomId": this.roomSelected.roomId })
                .then(() => {
                    alert("The role has been assigned correctly");
                });
            }
            this.showPermissionForm = false;
            event.preventDefault();
        },
        reset(event) {
            this.roleSelected = this.roles[0];
            this.roomSelected = this.rooms[0];
            this.showPermissionForm = false;
            event.preventDefault();
        }
    }
}
</script>

<style>
#AssignRoleForm {
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.btn-group-form {
    padding-top: 0;
    margin-bottom: 1rem;
}

</style>