<template>
    <div id="listUsers">
        <div class="card" v-for="user in listUsers" :key="user.id">
            <div class="card-body">
                <div class="row">
                    <h5>{{ user.firstName + ' ' + user.lastName }}</h5>
                </div>
                <div class="row">
                    <div class="card-subtitle mb-1 text-muted col-10"> Email: {{ user.email }} </div>
                    <button @click="deleteUser(user)" class="btn-border btn-sm">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'listUsers',
    props: { 'listUsers': Array },
    methods: {
        deleteUser(user) {
            if (confirm("Do you want to delete " + user.firstName + " " + user.lastName + " user?")) {
                this.axios.delete("/user/" + user.id + "/");
                this.$delete(this.listUsers, this.listUsers.indexOf(user));
            }
        }
    }
}
</script>