<template>
    <div id="logout">
    </div>
</template>

<script>
import axios from '@/utils/axios-instance'

export default {
    name: 'logout',
    methods: {
        logout() {
            axios.post('logout')
            .then(() => {
                this.$router.push('/login');
            })
            .catch (function(error) {
                console.log(error)
            });
        }
    },
    mounted() {
        this.logout();
    }
}
</script>