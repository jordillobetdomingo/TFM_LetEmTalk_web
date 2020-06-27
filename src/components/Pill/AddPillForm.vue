<template>
    <div>
        <div class="row">
            <div class="col-11"></div>
            <div class="col-1 justify-content-end">
                <div class="btn-group-sm btn-group-form" role="group">
                    <button class="btn btn-add" @click="showPillForm = !showPillForm"><i class="fa fa-plus" style="font-size:24px"></i></button>
                </div>
            </div>
        </div>
        <div class="row">
            <transition name="form-add-elem">
                <div v-if="showPillForm" class="col-12">
                    <form>
                        <div class="form-group">
                            <label for="text">Comment</label>
                            <textarea name="text" class="form-control" v-model="text"/>
                        </div>
                        <div class="btn-group-sm btn-group-form">
                            <button @click="addPill($event)" class="btn btn-secondary">Save</button>
                            <button @click="reset($event)" class="btn btn-secondary">Cancel</button>
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
            this.axios.post("/pill/", {"issueId": this.issueId,  "text": this.text, "authorId": this.user.id})
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

<style>

</style>