<template>
  <div class="chat">
      <h1>LetEmTalk</h1>
      <ListRooms :listRooms="listRooms"></ListRooms>
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