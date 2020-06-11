<template>
    <form>
        <textarea name="text" id="" cols="30" rows="10" v-model="pill.text">
        </textarea>
        <button @click="this.addPill()">Save</button>
    </form>
</template>

<script>
import axios from '@/utils/axios-instance'

export default {
    name: 'formPill',
    props: ['pill'],
    methods: {
        addPill() {
            axios.post('/pill/', {'issueId': this.pill.issueId, 'text': this.pill.text, 'authorId': this.pill.authorId});
        }
    }
}
</script>