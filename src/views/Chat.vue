<template>
  <div class="chat">
      <h1>LetEmTalk</h1>
      <Rooms :listRooms="listRooms"></Rooms>
  </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import Rooms from '../components/Rooms'

export default {
    name: "chat",
    data() {
        return {
            listRooms: []
        }
    },
    components: {
        Rooms
    },
    methods: {
        loadRooms() {
            axios.get('rooms/')
                .then(response => {
                    this.listRooms = response.data;
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