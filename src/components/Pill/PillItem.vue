<template>
    <div>
        <div v-if="!showPillForm">
            <div class="row">
                <div class="card-subtitle mb-1 text-muted col-8"> Author: {{ pill.firstNameAuthor + ' ' + pill.lastNameAuthor }}</div>
                <div class="card-subtitle mb-1 text-muted col-4 text-right">
                    <timeago :datetime="pill.createAt"></timeago>
                </div>
            </div>
        
            <div class="row">
                <div class="col-12 text-justify">
                    {{pill.text}}
                </div>
            </div>
        
            <div class="btn-group-sm btn-group-form" role="group">
                <button class="btn btn-edit" v-if="pill.allowUpdate" @click="showPillForm = true"><i class="fa fa-pencil fa-lg" style="font-size:24px"></i></button>
                <button class="btn btn-delete" v-if="pill.allowDelete" @click="deletePill()"><i class="fa fa-trash-o fa-lg" style="font-size:24px"></i></button>
            </div>
        </div>
        <div v-if="showPillForm">
            <form>
            <div class="form-group">
                <label for="text">Comment</label>
                <textarea name="text" class="form-control" v-model="textEdit" maxlength="2000" rows="5"/>
            </div>
            <div class="btn-group-sm btn-group-form">
                <button @click="editPill($event)" class="btn btn-secondary">Save</button>
                <button @click="reset($event)" class="btn btn-secondary">Cancel</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import EventBus from '@/utils/event-bus'

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
            this.axios.put("/pill/" + this.pill.id + '/', {"text": this.textEdit });
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
                this.axios.delete("/pill/" + this.pill.id + "/");
                EventBus.$emit('delete-pill', this.pill);
            }
        }
    }
}
</script>