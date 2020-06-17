<template>
    <div class="form-add">
        <div class="row justify-content-end no-margin">
            <button class="col-2 btn btn-outline-secondary" @click="showIssueForm = !showIssueForm">
                Add issue
            </button>
        </div>
        <transition name="form-add-elem">
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
                    <button class="btn-border btn-sm" @click="addIssue($event)">Save</button>
                    <button class="btn-border btn-sm" @click="reset($event)">Cancel</button>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import EventBus from '@/utils/event-bus'

export default {
    name: 'AddIssueForm',
    data() {
        return {
            showIssueForm: false,
            title: '',
            textPill: '',
            modalShow: false
        }
    },
    props: {user: Object, roomId: Number},
    methods: {
        addIssue(event) {
            axios.post("/issue/", {"roomId": this.roomId,  "title": this.title, "text": this.textPill, "authorId": this.user.id })
            .then(response => {
                EventBus.$emit('add-issue', response.data);
            });
            this.reset(event);
        },
        reset(event) {
            this.title = '';
            this.textPill = '';
            this.showIssueForm = false;
            event.preventDefault();
        }
    }
}
</script>