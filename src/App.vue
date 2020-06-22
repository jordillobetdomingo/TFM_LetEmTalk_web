<template>
  <div id="app" class="container-lg">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="nav navbar-nav ">
        <li class="nav-item active">
          <router-link class="nav-link item-header" to="/">LetEmTalk</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
        <li v-if="this.userIdentified && this.user.isAdmin" class="nav-item active">
          <router-link class="nav-link" to="/users/">Users</router-link>
        </li>
        <li v-if="!this.userIdentified" class="nav-item active">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li v-if="this.userIdentified" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ this.user.firstName + ' ' + this.user.lastName }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link class="dropdown-item" to="/logout">Logout</router-link>
          </div>
        </li>
      </ul>
    </nav>
    <router-view :user="this.user" />
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
  padding-bottom: 1.5rem;
}

.item-header {
  font-size: 1.5em;
  font-weight:bold;
}

ol.path {
  margin-top: 1rem;
  background-color:white;
}

.row.no-margin {
  margin-left: 0;
  margin-right: 0;
}

.form-add.btn-margin {
    margin-right: 10px;
}

.form-add-elem-enter, .form-add-elem-leave-to  {
  transform: translateY(100%);
  opacity: 0;
}

.form-add-elem-enter-active {
  transition: all .3s ease;
}

.form-add-elem-leave-active {
  transition: all .5s ease;
}

.btn-border {
  border: rgb(180,180,180) solid 1px;
  margin-left: 8px;
  margin-right: 8px;
}

.margin-item {
  margin-top:10px;
  margin-bottom:10px;
}

.btn-group-form button {
  margin: 5px;
}

.btn.btn-form {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

</style>
