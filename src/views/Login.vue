<template>
    <div id="login" class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
                <div class="card-body">
                    <h5 class="card-title text-center">Login</h5>
                    <form>
                        <div class="form-label-group">
                            <input type="text" id="inputUsername" class="form-control" v-model="username" placeholder="Username" required autofocus>
                        </div>
                        <div class="form-label-group">
                            <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="Password" required>
                        </div>
                        <button class="btn btn-lg btn-primary btn-block" v-on:click="login($event)">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from '@/utils/event-bus'

export default {
    name: 'login',
    data() {
        return {
            'username': '',
            'password': ''
        }
    },
    methods: {
        login(event) {
            event.preventDefault();
            this.axios.post('login', {'username': this.username, 'password': this.password})
            .then(() => {
                EventBus.$emit('login');
                this.$router.push('/');
            })
            .catch (function(error) {
                console.log(error)
            });

        }
    }
}
</script>

<style>

.form-label-group {
    margin-top:2rem;
    margin-bottom: 2rem;
}
</style>