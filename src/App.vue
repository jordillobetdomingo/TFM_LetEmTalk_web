<template>
  <div id="app" class="container-lg">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/logout">Logout</router-link>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style>

h1 {
  text-align: center;
}

</style>
