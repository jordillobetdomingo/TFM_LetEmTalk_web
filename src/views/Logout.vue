<template>
    <div id="logout">
    </div>
</template>

<script>
import EventBus from '@/utils/event-bus'

export default {
    name: 'logout',
    methods: {
        logout() {
            this.axios.post('/logout')
            .then(() => {
                this.$router.push('/login');
                EventBus.$emit('logout');
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