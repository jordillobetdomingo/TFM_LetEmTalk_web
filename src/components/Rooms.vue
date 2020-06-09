<template>
    <div id="rooms">
        <h1>List rooms</h1>
        <div v-for="room in listRooms" :key="room.roomId">
            <router-link to="/room/room.roomId">{{room.firstName}}, {{room.lastName}}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'rooms',
    props: ['listRooms']    
}
</script>