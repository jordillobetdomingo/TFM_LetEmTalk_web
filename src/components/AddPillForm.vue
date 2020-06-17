<template>
    <div class="form-add">
        <div class="row justify-content-end no-margin">
            <button class="col-2 btn btn-outline-secondary" @click="showPillForm = !showPillForm">
                Add comment
            </button>
        </div>
        <transition name="form-add-elem">
            <div v-if="showPillForm">
                <form>
                    <div class="form-group">
                        <label for="text">Comment</label>
                        <textarea name="text" class="form-control" v-model="text"/>
                    </div>
                    <button class="btn-border btn-sm" @click="addPill($event)">Save</button>
                    <button class="btn-border btn-sm" @click="reset($event)">Cancel</button>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import EventBus from '@/utils/event-bus';

export default {
    name: 'AddPillForm',
    props: { user: Object, issueId: Number },
    data() {
        return {
            showPillForm: false,
            text: ''
        }
    },
    methods: {
        addPill(event) {
            axios.post("/pill/", {"issueId": this.issueId,  "text": this.text, "authorId": this.user.id})
            .then(response => {
                EventBus.$emit("add-pill", response.data);
            });
            this.reset(event);
        },
        reset(event) {
            this.text = '';
            this.showPillForm = false;
            event.preventDefault();
        }
    }
}
</script>