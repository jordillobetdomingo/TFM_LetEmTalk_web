<template>
    <div id="ListRooms">
        <div v-for="room in listRooms" :key="room.roomId">
            <div class="rooms-info">
                <router-link :to="'/room/' + room.roomId + '/'">{{room.firstName}}, {{room.lastName}}</router-link>
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

<style>
.rooms-info {
    padding: 8px;
    border: rgb(210, 210, 210) solid 1px;
}

.rooms-info:hover {
    background-color: rgb(226, 226, 226);
}
</style>