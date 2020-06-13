<template>
  <div class="chat">
      <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrum-item"> Home </li>
            </ol>
        </nav>
      <h1 class="text-center">LetEmTalk</h1>
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