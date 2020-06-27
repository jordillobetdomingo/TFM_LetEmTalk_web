<template>
    <div>
        <div class="row">
            <div class="col-11"></div>
            <div class="col-1 justify-content-end">
                <div class="btn-group-sm btn-group-form" role="group">
                    <button class="btn btn-add" @click="showIssueForm = !showIssueForm"><i class="fa fa-plus" style="font-size:24px"></i></button>
                </div>
            </div>
        </div>
        <div class="row">
            <transition name="form-add-elem">
                <div v-if="showIssueForm" class="col-12">
                    <form>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" name="title" v-model="title" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="text">Comment</label>
                            <textarea name="text" class="form-control" v-model="textPill"/>
                        </div>
                        <div class="btn-group-sm btn-group-form">
                            <button class="btn btn-secondary" @click="addIssue($event)">Save</button>
                            <button class="btn btn-secondary" @click="reset($event)">Cancel</button>
                        </div>
                    </form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
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
            this.axios.post("/issue/", {"roomId": this.roomId,  "title": this.title, "text": this.textPill, "authorId": this.user.id })
            .then(response => {
                console.log(response.data);
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