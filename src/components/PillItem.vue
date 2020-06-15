<template>
    <div>
        <div v-if="!showPillForm">
            <p > {{pill.text}} </p>
            <div class="row">
                <div class="card-subtitle mb-1 text-muted col-8"> Author: {{ pill.firstNameAuthor + ' ' + pill.lastNameAuthor }}</div>
                <div class="card-subtitle mb-1 text-muted col-4 text-right">
                    <timeago :datetime="pill.createAt.date"></timeago>
                </div>
            
            
                <input type="button" class="btn btn-outline-secondary col-2" v-if="pill.allowUpdate" value="EditPill" @click="showPillForm = true">
                <input type="button" class="btn btn-outline-secondary col-2" v-if="pill.allowDelete" value="DeletePill" @click="deletePill()">
            </div>
        </div>
        <div v-if="showPillForm">
            <form>
            <div class="form-group">
                <label for="text">Comment</label>
                <textarea name="text" class="form-control" v-model="textEdit"/>
            </div>
            <button @click="editPill($event)">Save</button>
            <button @click="reset($event)">Cancel</button>
        </form>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import EventBus from '@/utils/event-bus';

export default {
    name: 'PillItem',
    props: { pill: Object },
    data() {
        return {
            showPillForm: false,
            textEdit: this.pill.text
        }
    },
    methods: {
        editPill(event) {
            axios.put("/pill/" + this.pill.id + '/', {"text": this.textEdit });
            this.pill.text = this.textEdit;
            this.reset(event);
        },
        reset(event) {
            this.textEdit = this.pill.text;
            this.showPillForm = false;
            event.preventDefault();
        },
        deletePill() {
            if (confirm("Do you want to remove this comment?")) {
                axios.delete("/pill/" + this.pill.id + "/");
                EventBus.$emit('delete-pill', this.pill);
            }
        }
    }
}
</script>