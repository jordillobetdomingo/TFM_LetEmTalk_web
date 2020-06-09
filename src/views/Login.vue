<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="username" placeholder="Username" />
        <input type="password" name="password" v-model="password" placeholder="Password" />
        <button type="button" v-on:click="login()" >Login</button>
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'

export default {
    name: 'login',
    data() {
        return {
            'username': '',
            'password': ''
        }
    },
    methods: {
        login() {
            axios.post('login', {'username': this.username, 'password': this.password})
            .then(() => {
                this.$router.push('/');
            })
            .catch (function(error) {
                console.log(error)
            });

        }
    }
}
</script>