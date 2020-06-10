<template>
    <div id="listPills">
        <div v-for="pill in listPills" :key="pill.pillId">
            <p>{{pill.text}}</p>
            <p> Author: {{pill.firstNameAuthor + ' ' + pill.lastNameAuthor}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'listPills',
    props: ['listPills']
}
</script>