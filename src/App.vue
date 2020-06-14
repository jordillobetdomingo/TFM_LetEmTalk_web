<template>
  <div id="app" class="container-lg">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav mr-auto">
        <li v-if="this.userIdentified" class="nav-item active">
          <router-link to="/logout">Logout</router-link>
        </li>
        <li v-if="!this.userIdentified" class="nav-item active">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="this.userIdentified">{{ this.user.firstName + ' ' + this.user.lastName }}</li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from '@/utils/axios-instance'
import EventBus from '@/utils/event-bus'

export default {
  name: 'LetEmTalk',
  data() {
    return {
      user: { 'id': 0, 'firstName': '', 'lastName': ''},
      userIdentified: false
    }
  },
  methods: {
    loadUser() {
      axios.get('/user/')
      .then(response => {
        this.user = response.data;
        this.userIdentified = true;
      })
      .catch(error => {
          console.log(error);
      });
    }
  },
  mounted() {
    this.loadUser();
    EventBus.$on('login', () => {
      this.loadUser();
    });
    EventBus.$on('logout', () => {
      this.user = {},
      this.userIdentified = false;
    });
  }
}
</script>

<style>

h1 {
  text-align: center;
}

</style>
