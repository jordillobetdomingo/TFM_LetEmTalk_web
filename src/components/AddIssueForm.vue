<template>
    <div>
        <div class="row justify-content-end">
            <button class="col-2 btn btn-outline-secondary" @click="showIssueForm = !showIssueForm">
                Add issue
            </button>
        </div>
        <div v-if="showIssueForm">
            <form>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" name="title" v-model="title" class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="text">Comment</label>
                    <textarea name="text" class="form-control" v-model="textPill"/>
                </div>
                <button @click="addIssue()">Save</button>
                <button @click="reset()">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'

export default {
    name: 'AddIssueForm',
    data() {
        return {
            showIssueForm: false,
            title: '',
            textPill: ''
        }
    },
    props: {roomId: Number},
    methods: {
        addIssue() {
            alert("roomId: " + this.roomId);
            axios.post("/issue/", {"roomId": this.roomId,  "title": this.title, "text": this.textPill, "authorId": 13});
            this.reset();
        },
        reset() {
            this.title = '';
            this.textPill = '';
            this.showIssueForm = false;
        }
    }
}
</script>