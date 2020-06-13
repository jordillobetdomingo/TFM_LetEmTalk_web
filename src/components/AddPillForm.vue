<template>
    <div>
        <div class="row justify-content-end">
            <button class="col-2 btn btn-outline-secondary" @click="showPillForm = !showPillForm">
                Add comment
            </button>
        </div>
        <div v-if="showPillForm">
            <form>
                <div class="form-group">
                    <label for="text">Comment</label>
                    <textarea name="text" class="form-control" v-model="text"/>
                </div>
                <button @click="addPill($event)">Save</button>
                <button @click="reset($event)">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'

export default {
    name: 'AddPillForm',
    data() {
        return {
            showPillForm: false,
            text: ''
        }
    },
    props: {issueId: Number},
    methods: {
        addPill(event) {
            axios.post("/pill/", {"issueId": this.issueId,  "text": this.text, "authorId": 13});
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