<template>
    <div id="ListRooms">
        <div v-for="room in listRooms" :key="room.roomId">
            <router-link :to="'/room/' + room.roomId + '/'">{{room.firstName}}, {{room.lastName}}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'listRooms',
    props: ['listRooms']    
}
</script>