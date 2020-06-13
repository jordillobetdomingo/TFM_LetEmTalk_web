<template>
    <div id="ListRooms">
        <div v-for="room in listRooms" :key="room.roomId">
            <div class="card">
                <div class="card-body">
                    <router-link :to="'/room/' + room.roomId + '/'"><h3>{{room.firstName}}, {{room.lastName}}</h3></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'listRooms',
    props: ['listRooms']    
}
</script>