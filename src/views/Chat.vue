<template>
  <div class="chat">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb path">
                <li class="breadcrum-item"> Home </li>
            </ol>
        </nav>
        <div class="body-let">    
            <div>
                <h1>Home</h1>
            </div>
            <ListRooms v-if="listRooms.length > 0" :listRooms="listRooms"></ListRooms>
            <p v-if="listRooms.length == 0"> You don't have access at any Room</p>
        </div>
    </div>
</template>

<script>
import ListRooms from '@/components/Room/ListRooms'

export default {
    name: "chat",
    props: {user: Object},
    data() {
        return {
            listRooms: []
        }
    },
    components: {
        ListRooms
    },
    methods: {
        loadRooms() {
            this.axios.get('rooms/')
                .then(response => {
                    this.listRooms = response.data;
                    if (this.listRooms.length == 1) {
                        this.$router.push('/room/' + this.listRooms[0].roomId + "/");
                    }
                    console.log(response)
                })
                .catch(function(error) {
                    console.log(error)
                });
        }
    },
    mounted() {
        if (this.user.isAdmin) {
            this.$router.push('/users/');
        } else {
            this.loadRooms();
        }
    }
}
</script>