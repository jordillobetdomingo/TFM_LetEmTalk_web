<template>
  <div class="chat">
      <nav aria-label="breadcrumb">
            <ol class="breadcrumb path">
                <li class="breadcrum-item"> Home </li>
            </ol>
        </nav>
      <h1>Home</h1>
      <ListRooms v-if="listRooms.length > 0" :listRooms="listRooms"></ListRooms>
      <p> You don't have access at any Room</p>
  </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import ListRooms from '@/components/ListRooms'

export default {
    name: "chat",
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
            axios.get('rooms/')
                .then(response => {
                    this.listRooms = response.data;
                    if (this.listRooms.length == 1) {
                        this.$toute.push('/room/' + this.listRooms[0].room.roomId + "/");
                    }
                    console.log(response)
                })
                .catch(function(error) {
                    console.log(error)
                });
        }
    },
    mounted() {
        this.loadRooms();
    }
}
</script>