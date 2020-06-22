<template>
    <div id="AssignRoleForm">
        <form class="row">
            <div class="form-group col-2">
                <select v-model="roleSelected">
                    <option v-for="role in roles" :key="role.id" :value="role"> {{ role.name }} </option>
                </select>
            </div>
            <div class="form-group col-2">
                <select v-model="roomSelected" v-if="!this.roleSelected.createRoom">
                    <option v-for="room in rooms" :key="room.roomId" :value="room"> {{ room.firstName + ' ' + room.lastName }} </option>
                </select>
            </div>
            <div class="form-group col-2">
                <button class="btn-border btn-sm" @click="assignRole($event)"> Assign </button>
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
            roomSelected: this.rooms[0]
        }
    },
    methods: {
        assignRole(event) {
            if (this.roleSelected.createRoom) {
                this.axios.post("/role/user/", {"userId": this.user.id, "roleId": this.roleSelected.id })
                .then(() => {
                    alert("the role has been assigned correctly");
                });
            } else {
                this.axios.post("/role/user/", {"userId": this.user.id, "roleId": this.roleSelected.id, "roomId": this.roomSelected.roomId })
                .then(() => {
                    alert("the role has been assigned correctly");
                });
            }
            event.preventDefault();
        }
    }
}
</script>